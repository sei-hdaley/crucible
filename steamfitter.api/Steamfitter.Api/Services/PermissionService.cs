/*
Crucible
Copyright 2020 Carnegie Mellon University.
NO WARRANTY. THIS CARNEGIE MELLON UNIVERSITY AND SOFTWARE ENGINEERING INSTITUTE MATERIAL IS FURNISHED ON AN "AS-IS" BASIS. CARNEGIE MELLON UNIVERSITY MAKES NO WARRANTIES OF ANY KIND, EITHER EXPRESSED OR IMPLIED, AS TO ANY MATTER INCLUDING, BUT NOT LIMITED TO, WARRANTY OF FITNESS FOR PURPOSE OR MERCHANTABILITY, EXCLUSIVITY, OR RESULTS OBTAINED FROM USE OF THE MATERIAL. CARNEGIE MELLON UNIVERSITY DOES NOT MAKE ANY WARRANTY OF ANY KIND WITH RESPECT TO FREEDOM FROM PATENT, TRADEMARK, OR COPYRIGHT INFRINGEMENT.
Released under a MIT (SEI)-style license, please see license.txt or contact permission@sei.cmu.edu for full terms.
[DISTRIBUTION STATEMENT A] This material has been approved for public release and unlimited distribution.  Please see Copyright notice for non-US Government use and distribution.
Carnegie Mellon� and CERT� are registered in the U.S. Patent and Trademark Office by Carnegie Mellon University.
DM20-0181
*/

using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Steamfitter.Api.Data;
using Steamfitter.Api.Data.Models;
using Steamfitter.Api.Infrastructure.Extensions;
using Steamfitter.Api.Infrastructure.Authorization;
using Steamfitter.Api.Infrastructure.Exceptions;
using Steamfitter.Api.ViewModels;

namespace Steamfitter.Api.Services
{
    public interface IPermissionService
    {
        Task<IEnumerable<ViewModels.Permission>> GetAsync(CancellationToken ct);
        Task<IEnumerable<ViewModels.Permission>> GetMineAsync(CancellationToken ct);
        Task<IEnumerable<ViewModels.Permission>> GetByUserAsync(Guid id, CancellationToken ct);
        Task<ViewModels.Permission> GetAsync(Guid id, CancellationToken ct);
        // Task<IEnumerable<ViewModels.Permission>> GetByUserIdAsync(Guid userId, CancellationToken ct);
        Task<ViewModels.Permission> CreateAsync(ViewModels.Permission permission, CancellationToken ct);
        Task<ViewModels.Permission> UpdateAsync(Guid id, ViewModels.Permission permission, CancellationToken ct);
        Task<bool> DeleteAsync(Guid id, CancellationToken ct);
    }

    public class PermissionService : IPermissionService
    {
        private readonly SteamfitterContext _context;
        private readonly IAuthorizationService _authorizationService;
        private readonly ClaimsPrincipal _user;
        private readonly IMapper _mapper;

        public PermissionService(SteamfitterContext context, IAuthorizationService authorizationService, IPrincipal user, IMapper mapper)
        {
            _context = context;
            _authorizationService = authorizationService;
            _user = user as ClaimsPrincipal;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ViewModels.Permission>> GetAsync(CancellationToken ct)
        {
            if (!(await _authorizationService.AuthorizeAsync(_user, null, new FullRightsRequirement())).Succeeded)
                throw new ForbiddenException();

            var items = await _context.Permissions
                .ToListAsync(ct);         
            
            return _mapper.Map<IEnumerable<Permission>>(items);
        }

        public async Task<IEnumerable<ViewModels.Permission>> GetMineAsync(CancellationToken ct)
        {
            var items = await _context.UserPermissions
                .Where(w => w.UserId == _user.GetId())
                .Select(x => x.Permission)
                .ToListAsync(ct);         
            
            return _mapper.Map<IEnumerable<Permission>>(items);
        }

        public async Task<IEnumerable<ViewModels.Permission>> GetByUserAsync(Guid userId, CancellationToken ct)
        {
            if (!(await _authorizationService.AuthorizeAsync(_user, null, new FullRightsRequirement())).Succeeded)
                throw new ForbiddenException();

            var items = await _context.UserPermissions
                .Where(w => w.UserId == userId)
                .Select(x => x.Permission)
                .ToListAsync(ct);         
            
            return _mapper.Map<IEnumerable<Permission>>(items);
        }

        public async Task<ViewModels.Permission> GetAsync(Guid id, CancellationToken ct)
        {
            if (!(await _authorizationService.AuthorizeAsync(_user, null, new FullRightsRequirement())).Succeeded)
                throw new ForbiddenException();

            var item = await _context.Permissions
                .SingleOrDefaultAsync(o => o.Id == id, ct);

            return _mapper.Map<Permission>(item);
        }

        public async Task<ViewModels.Permission> CreateAsync(ViewModels.Permission permission, CancellationToken ct)
        {
            if (!(await _authorizationService.AuthorizeAsync(_user, null, new FullRightsRequirement())).Succeeded)
                throw new ForbiddenException();

            permission.DateCreated = DateTime.UtcNow;
            var permissionEntity = Mapper.Map<PermissionEntity>(permission);

            _context.Permissions.Add(permissionEntity);
            await _context.SaveChangesAsync(ct);

            return await GetAsync(permissionEntity.Id, ct);
        }

        public async Task<ViewModels.Permission> UpdateAsync(Guid id, ViewModels.Permission permission, CancellationToken ct)
        {
            if (!(await _authorizationService.AuthorizeAsync(_user, null, new FullRightsRequirement())).Succeeded)
                throw new ForbiddenException();

            var permissionToUpdate = await _context.Permissions.SingleOrDefaultAsync(v => v.Id == id, ct);

            if (permissionToUpdate == null)
                throw new EntityNotFoundException<Permission>();

            permission.CreatedBy = permissionToUpdate.CreatedBy;
            permission.DateCreated = permissionToUpdate.DateCreated;
            permission.DateModified = DateTime.UtcNow;
            Mapper.Map(permission, permissionToUpdate);

            _context.Permissions.Update(permissionToUpdate);
            await _context.SaveChangesAsync(ct);

            return _mapper.Map(permissionToUpdate, permission);
        }

        public async Task<bool> DeleteAsync(Guid id, CancellationToken ct)
        {
            if (!(await _authorizationService.AuthorizeAsync(_user, null, new FullRightsRequirement())).Succeeded)
                throw new ForbiddenException();

            var permissionToDelete = await _context.Permissions.SingleOrDefaultAsync(v => v.Id == id, ct);

            if (permissionToDelete == null)
                throw new EntityNotFoundException<Permission>();

            _context.Permissions.Remove(permissionToDelete);
            await _context.SaveChangesAsync(ct);

            return true;
        }

    }
}

