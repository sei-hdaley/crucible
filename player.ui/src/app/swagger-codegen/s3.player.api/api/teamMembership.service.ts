/*
Crucible
Copyright 2020 Carnegie Mellon University.
NO WARRANTY. THIS CARNEGIE MELLON UNIVERSITY AND SOFTWARE ENGINEERING INSTITUTE MATERIAL IS FURNISHED ON AN "AS-IS" BASIS. CARNEGIE MELLON UNIVERSITY MAKES NO WARRANTIES OF ANY KIND, EITHER EXPRESSED OR IMPLIED, AS TO ANY MATTER INCLUDING, BUT NOT LIMITED TO, WARRANTY OF FITNESS FOR PURPOSE OR MERCHANTABILITY, EXCLUSIVITY, OR RESULTS OBTAINED FROM USE OF THE MATERIAL. CARNEGIE MELLON UNIVERSITY DOES NOT MAKE ANY WARRANTY OF ANY KIND WITH RESPECT TO FREEDOM FROM PATENT, TRADEMARK, OR COPYRIGHT INFRINGEMENT.
Released under a MIT (SEI)-style license, please see license.txt or contact permission@sei.cmu.edu for full terms.
[DISTRIBUTION STATEMENT A] This material has been approved for public release and unlimited distribution.  Please see Copyright notice for non-US Government use and distribution.
Carnegie Mellon� and CERT� are registered in the U.S. Patent and Trademark Office by Carnegie Mellon University.
DM20-0181
*/

/**
 * Scenario Player API
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: v1
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';

import { ApiError } from '../model/apiError';
import { TeamMembership } from '../model/teamMembership';
import { TeamMembershipForm } from '../model/teamMembershipForm';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';
import { TeamMembershipServiceInterface }                            from './teamMembership.serviceInterface';


@Injectable()
export class TeamMembershipService implements TeamMembershipServiceInterface {

    protected basePath = 'https://localhost';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * Gets a specific Team Membership by id
     * Returns the Team Membership with the id specified  &lt;para /&gt;  Accessible to Super Users, Exercise Admins for the membership&#39;s Exercise, or the User that the membership belongs to
     * @param id The id of the Team Membership
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getTeamMembership(id: string, observe?: 'body', reportProgress?: boolean): Observable<TeamMembership>;
    public getTeamMembership(id: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<TeamMembership>>;
    public getTeamMembership(id: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<TeamMembership>>;
    public getTeamMembership(id: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling getTeamMembership.');
        }

        let headers = this.defaultHeaders;

        // authentication (oauth2) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'text/plain',
            'application/json',
            'text/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<TeamMembership>(`${this.basePath}/team-memberships/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Gets all Team Memberships for a User by Exercise
     * Returns a list of all of the Permissions in the system.  &lt;para /&gt;  Accessible to Super Users or the specified User
     * @param exerciseId 
     * @param userId 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getTeamMemberships(exerciseId: string, userId: string, observe?: 'body', reportProgress?: boolean): Observable<Array<TeamMembership>>;
    public getTeamMemberships(exerciseId: string, userId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<TeamMembership>>>;
    public getTeamMemberships(exerciseId: string, userId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<TeamMembership>>>;
    public getTeamMemberships(exerciseId: string, userId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (exerciseId === null || exerciseId === undefined) {
            throw new Error('Required parameter exerciseId was null or undefined when calling getTeamMemberships.');
        }
        if (userId === null || userId === undefined) {
            throw new Error('Required parameter userId was null or undefined when calling getTeamMemberships.');
        }

        let headers = this.defaultHeaders;

        // authentication (oauth2) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'text/plain',
            'application/json',
            'text/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<Array<TeamMembership>>(`${this.basePath}/users/${encodeURIComponent(String(userId))}/exercises/${encodeURIComponent(String(exerciseId))}/team-memberships`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Updates a Team Membership
     * Updates a Team Membership with the attributes specified  &lt;para /&gt;  Accessible only to a SuperUser or a User on an Admin Team within the specified Exercise
     * @param id The id of the Team Membership
     * @param form The updated Team Membership values
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateTeamMembership(id: string, form?: TeamMembershipForm, observe?: 'body', reportProgress?: boolean): Observable<TeamMembership>;
    public updateTeamMembership(id: string, form?: TeamMembershipForm, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<TeamMembership>>;
    public updateTeamMembership(id: string, form?: TeamMembershipForm, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<TeamMembership>>;
    public updateTeamMembership(id: string, form?: TeamMembershipForm, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling updateTeamMembership.');
        }

        let headers = this.defaultHeaders;

        // authentication (oauth2) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'text/plain',
            'application/json',
            'text/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json-patch+json',
            'application/json',
            'text/json',
            'application/_*+json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.put<TeamMembership>(`${this.basePath}/team-memberships/${encodeURIComponent(String(id))}`,
            form,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
