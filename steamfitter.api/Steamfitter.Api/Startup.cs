/*
Crucible
Copyright 2020 Carnegie Mellon University.
NO WARRANTY. THIS CARNEGIE MELLON UNIVERSITY AND SOFTWARE ENGINEERING INSTITUTE MATERIAL IS FURNISHED ON AN "AS-IS" BASIS. CARNEGIE MELLON UNIVERSITY MAKES NO WARRANTIES OF ANY KIND, EITHER EXPRESSED OR IMPLIED, AS TO ANY MATTER INCLUDING, BUT NOT LIMITED TO, WARRANTY OF FITNESS FOR PURPOSE OR MERCHANTABILITY, EXCLUSIVITY, OR RESULTS OBTAINED FROM USE OF THE MATERIAL. CARNEGIE MELLON UNIVERSITY DOES NOT MAKE ANY WARRANTY OF ANY KIND WITH RESPECT TO FREEDOM FROM PATENT, TRADEMARK, OR COPYRIGHT INFRINGEMENT.
Released under a MIT (SEI)-style license, please see license.txt or contact permission@sei.cmu.edu for full terms.
[DISTRIBUTION STATEMENT A] This material has been approved for public release and unlimited distribution.  Please see Copyright notice for non-US Government use and distribution.
Carnegie Mellon� and CERT� are registered in the U.S. Patent and Trademark Office by Carnegie Mellon University.
DM20-0181
*/

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Steamfitter.Api.Infrastructure.Extensions;
using Steamfitter.Api.Data;
using Steamfitter.Api.Infrastructure.Options;
using Steamfitter.Api.Services;
using System;
using Newtonsoft.Json.Converters;
using AutoMapper;
using Steamfitter.Api.Infrastructure;
using Steamfitter.Api.Infrastructure.Authorization;
using Steamfitter.Api.Infrastructure.Filters;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Principal;
using System.Linq;
using Microsoft.Extensions.Hosting;

namespace Steamfitter.Api
{
    public class Startup
    {
        public Infrastructure.Options.AuthorizationOptions _authOptions = new Infrastructure.Options.AuthorizationOptions();
        public Infrastructure.Options.VmTaskProcessingOptions _vmTaskProcessingOptions = new Infrastructure.Options.VmTaskProcessingOptions();
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            Configuration.GetSection("Authorization").Bind(_authOptions);
            Configuration.GetSection("VmTaskProcessing").Bind(_vmTaskProcessingOptions);
        }        

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var provider = Configuration["Database:Provider"];
            switch (provider)
            {
                case "InMemory":
                    services.AddDbContextPool<SteamfitterContext>(opt => opt.UseInMemoryDatabase("api"));
                    break;
                case "Sqlite":
                case "SqlServer":
                case "PostgreSQL":
                    services.AddDbProvider(Configuration);
                    services.AddDbContextPool<SteamfitterContext>(builder => builder.UseConfiguredDatabase(Configuration));
                    break;
            }

            services.AddOptions()
                .Configure<DatabaseOptions>(Configuration.GetSection("Database"))
                    .AddScoped(config => config.GetService<IOptionsMonitor<DatabaseOptions>>().CurrentValue)

                .Configure<ClaimsTransformationOptions>(Configuration.GetSection("ClaimsTransformation"))
                    .AddScoped(config => config.GetService<IOptionsMonitor<ClaimsTransformationOptions>>().CurrentValue)

                .Configure<SeedDataOptions>(Configuration.GetSection("SeedData"))
                    .AddScoped(config => config.GetService<IOptionsMonitor<SeedDataOptions>>().CurrentValue);

            services
                .Configure<ClientOptions>(Configuration.GetSection("ClientSettings"))
                .AddScoped(config => config.GetService<IOptionsMonitor<ClientOptions>>().CurrentValue);
            
            services
                .Configure<FilesOptions>(Configuration.GetSection("Files"))
                .AddScoped(config => config.GetService<IOptionsMonitor<FilesOptions>>().CurrentValue);
            
            services.AddScoped<IPlayerVmService, PlayerVmService>();
            services.AddScoped<IPlayerService, PlayerService>();            
            services.AddScoped<IClaimsTransformation, AuthorizationClaimsTransformer>();
            services.AddScoped<IUserClaimsService, UserClaimsService>();

            services.AddCors(options => options.UseConfiguredCors(Configuration.GetSection("CorsPolicy")));

            services.AddSignalR()
            .AddJsonProtocol(options =>
            {
                options.PayloadSerializerSettings.Converters.Add(new StringEnumConverter());
            });

            services.AddMvc(options =>
            {
                options.Filters.Add(typeof(ValidateModelStateFilter));
                options.Filters.Add(typeof(JsonExceptionFilter));

                // Require all scopes in authOptions
                var policyBuilder = new AuthorizationPolicyBuilder().RequireAuthenticatedUser();
                Array.ForEach(_authOptions.AuthorizationScope.Split(' '), x => policyBuilder.RequireScope(x));

                var policy = policyBuilder.Build();
                options.Filters.Add(new AuthorizeFilter(policy));
            })
            .AddJsonOptions(options =>
            {
                options.SerializerSettings.Converters.Add(new StringEnumConverter());
            })
            .SetCompatibilityVersion(CompatibilityVersion.Latest); 

            services.AddSwagger(_authOptions);

            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.Authority = _authOptions.Authority;
                options.RequireHttpsMetadata = _authOptions.RequireHttpsMetadata;
                options.SaveToken = true;
                options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidAudiences = _authOptions.AuthorizationScope.Split(' ')
                };
            });

            services.AddRouting(options =>
            {
                options.LowercaseUrls = true;
            });

            services.AddMemoryCache();            

            services.AddScoped<ISessionService, SessionService>();
            services.AddScoped<IDispatchTaskService, DispatchTaskService>();
            services.AddScoped<IDispatchTaskResultService, DispatchTaskResultService>();
            services.AddScoped<IScenarioService, ScenarioService>();
            services.AddScoped<IPermissionService, PermissionService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IUserPermissionService, UserPermissionService>();
            services.AddScoped<IFilesService, FilesService>();
            services.AddScoped<IExerciseAgentService, ExerciseAgentService>();

            services.AddSingleton<StackStormService>();
            services.AddSingleton<IHostedService>(x => x.GetService<StackStormService>());
            services.AddSingleton<IStackStormService>(x => x.GetService<StackStormService>());

            services.AddSingleton<ExerciseAgentStore>();

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddScoped<IPrincipal>(p => p.GetService<IHttpContextAccessor>().HttpContext.User);

            services.AddHttpClient();

            ApplyPolicies(services);

            services.AddAutoMapper();
            services.Configure<VmTaskProcessingOptions>(Configuration.GetSection("VmTaskProcessing"));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, Microsoft.AspNetCore.Hosting.IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            
            app.UseCors("default");
            
            //move any querystring jwt to Auth bearer header
            app.Use(async (context, next) =>
            {
                if (string.IsNullOrWhiteSpace(context.Request.Headers["Authorization"])
                    && context.Request.QueryString.HasValue)
                {
                    string token = context.Request.QueryString.Value
                        .Substring(1)
                        .Split('&')
                        .SingleOrDefault(x => x.StartsWith("bearer="))?.Split('=')[1];

                    if (!String.IsNullOrWhiteSpace(token))
                        context.Request.Headers.Add("Authorization", new[] {$"Bearer {token}"});
                }

                await next.Invoke();

            });

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Steamfitter v1");
                c.OAuthClientId(_authOptions.ClientId);
                c.OAuthClientSecret(_authOptions.ClientSecret);
                c.OAuthAppName(_authOptions.ClientName);
            });

            app.UseAuthentication();

            app.UseSignalR(routes =>
                {
                    routes.MapHub<Hubs.EngineHub>("/hubs/engine");
                }
            );

            app.UseMvc();

            app.UseHttpContext();
        }


        private void ApplyPolicies(IServiceCollection services)
        {
            services.AddAuthorizationPolicy();
        }
    }
}

