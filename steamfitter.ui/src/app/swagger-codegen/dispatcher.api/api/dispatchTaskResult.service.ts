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
 * Steamfitter API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * OpenAPI spec version: v1
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
    HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';

import { ApiError } from '../model/apiError';
import { DispatchTask } from '../model/dispatchTask';
import { DispatchTaskResult } from '../model/dispatchTaskResult';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable({
  providedIn: 'root'
})
export class DispatchTaskResultService {

  protected basePath = 'http://localhost';
  public defaultHeaders = new HttpHeaders();
  public configuration = new Configuration();

  constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {

      if (configuration) {
          this.configuration = configuration;
          this.configuration.basePath = configuration.basePath || basePath || this.basePath;

      } else {
          this.configuration.basePath = basePath || this.basePath;
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
     * Creates a new DispatchTaskResult
     * Creates a new DispatchTaskResult with the attributes specified  &lt;para /&gt;  Accessible only to a SuperUser or an Administrator
     * @param dispatchTaskResult The data to create the DispatchTaskResult with
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createDispatchTaskResult(dispatchTaskResult?: DispatchTaskResult, observe?: 'body', reportProgress?: boolean): Observable<DispatchTaskResult>;
    public createDispatchTaskResult(dispatchTaskResult?: DispatchTaskResult, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<DispatchTaskResult>>;
    public createDispatchTaskResult(dispatchTaskResult?: DispatchTaskResult, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<DispatchTaskResult>>;
    public createDispatchTaskResult(dispatchTaskResult?: DispatchTaskResult, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // authentication (oauth2) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
            'text/plain',
            'application/json',
            'text/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
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
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.post<DispatchTaskResult>(`${this.configuration.basePath}/dispatchtaskresults`,
            dispatchTaskResult,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Deletes an DispatchTaskResult
     * Deletes an DispatchTaskResult with the specified id  &lt;para /&gt;  Accessible only to a SuperUser or a User on an Admin Team within the specified DispatchTaskResult
     * @param id The id of the DispatchTaskResult to delete
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteDispatchTaskResult(id: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deleteDispatchTaskResult(id: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deleteDispatchTaskResult(id: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deleteDispatchTaskResult(id: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling deleteDispatchTaskResult.');
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
        const httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.delete<any>(`${this.configuration.basePath}/dispatchtaskresults/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Gets a specific DispatchTaskResult by id
     * Returns the DispatchTaskResult with the id specified  &lt;para /&gt;  Accessible to a SuperUser or a User that is a member of a Team within the specified DispatchTaskResult
     * @param id The id of the DispatchTaskResult
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getDispatchTaskResult(id: string, observe?: 'body', reportProgress?: boolean): Observable<DispatchTaskResult>;
    public getDispatchTaskResult(id: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<DispatchTaskResult>>;
    public getDispatchTaskResult(id: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<DispatchTaskResult>>;
    public getDispatchTaskResult(id: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling getDispatchTaskResult.');
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
        const httpHeaderAccepts: string[] = [
            'text/plain',
            'application/json',
            'text/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.get<DispatchTaskResult>(`${this.configuration.basePath}/dispatchtaskresults/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Gets all DispatchTaskResult in the system
     * Returns a list of all of the DispatchTaskResults in the system.  &lt;para /&gt;  Only accessible to a SuperUser
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getDispatchTaskResults(observe?: 'body', reportProgress?: boolean): Observable<Array<DispatchTaskResult>>;
    public getDispatchTaskResults(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<DispatchTaskResult>>>;
    public getDispatchTaskResults(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<DispatchTaskResult>>>;
    public getDispatchTaskResults(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // authentication (oauth2) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
            'text/plain',
            'application/json',
            'text/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.get<Array<DispatchTaskResult>>(`${this.configuration.basePath}/dispatchtaskresults`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Gets all DispatchTaskResults for an Exercise
     * Returns all DispatchTaskResults for the specified Exercise
     * @param id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getExerciseDispatchTaskResults(id: string, observe?: 'body', reportProgress?: boolean): Observable<Array<DispatchTask>>;
    public getExerciseDispatchTaskResults(id: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<DispatchTask>>>;
    public getExerciseDispatchTaskResults(id: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<DispatchTask>>>;
    public getExerciseDispatchTaskResults(id: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling getExerciseDispatchTaskResults.');
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
        const httpHeaderAccepts: string[] = [
            'text/plain',
            'application/json',
            'text/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.get<Array<DispatchTask>>(`${this.configuration.basePath}/exercises/${encodeURIComponent(String(id))}/dispatchtaskresults`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Gets all manual DispatchTaskResults for the current User
     * Returns all manual DispatchTaskResults for the current User
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getMyDispatchTaskResults(observe?: 'body', reportProgress?: boolean): Observable<Array<DispatchTask>>;
    public getMyDispatchTaskResults(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<DispatchTask>>>;
    public getMyDispatchTaskResults(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<DispatchTask>>>;
    public getMyDispatchTaskResults(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // authentication (oauth2) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
            'text/plain',
            'application/json',
            'text/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.get<Array<DispatchTask>>(`${this.configuration.basePath}/me/dispatchtaskresults`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Gets all DispatchTaskResults for a Session
     * Returns all DispatchTaskResults for the specified Session
     * @param id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getSessionDispatchTaskResults(id: string, observe?: 'body', reportProgress?: boolean): Observable<Array<DispatchTask>>;
    public getSessionDispatchTaskResults(id: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<DispatchTask>>>;
    public getSessionDispatchTaskResults(id: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<DispatchTask>>>;
    public getSessionDispatchTaskResults(id: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling getSessionDispatchTaskResults.');
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
        const httpHeaderAccepts: string[] = [
            'text/plain',
            'application/json',
            'text/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.get<Array<DispatchTask>>(`${this.configuration.basePath}/sessions/${encodeURIComponent(String(id))}/dispatchtaskresults`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Gets all manual DispatchTaskResults for a User
     * Returns all manual DispatchTaskResults for the specified User
     * @param id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getUserDispatchTaskResults(id: string, observe?: 'body', reportProgress?: boolean): Observable<Array<DispatchTask>>;
    public getUserDispatchTaskResults(id: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<DispatchTask>>>;
    public getUserDispatchTaskResults(id: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<DispatchTask>>>;
    public getUserDispatchTaskResults(id: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling getUserDispatchTaskResults.');
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
        const httpHeaderAccepts: string[] = [
            'text/plain',
            'application/json',
            'text/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.get<Array<DispatchTask>>(`${this.configuration.basePath}/users/${encodeURIComponent(String(id))}/dispatchtaskresults`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Gets all DispatchTaskResults for a VM
     * Returns all DispatchTaskResults for the specified VM
     * @param id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getVmDispatchTaskResults(id: string, observe?: 'body', reportProgress?: boolean): Observable<Array<DispatchTask>>;
    public getVmDispatchTaskResults(id: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<DispatchTask>>>;
    public getVmDispatchTaskResults(id: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<DispatchTask>>>;
    public getVmDispatchTaskResults(id: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling getVmDispatchTaskResults.');
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
        const httpHeaderAccepts: string[] = [
            'text/plain',
            'application/json',
            'text/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.get<Array<DispatchTask>>(`${this.configuration.basePath}/vms/${encodeURIComponent(String(id))}/dispatchtaskresults`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Updates an DispatchTaskResult
     * Updates an DispatchTaskResult with the attributes specified  &lt;para /&gt;  Accessible only to a SuperUser or a User on an Admin Team within the specified DispatchTaskResult
     * @param id The Id of the Exericse to update
     * @param dispatchTaskResult The updated DispatchTaskResult values
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateDispatchTaskResult(id: string, dispatchTaskResult?: DispatchTaskResult, observe?: 'body', reportProgress?: boolean): Observable<DispatchTaskResult>;
    public updateDispatchTaskResult(id: string, dispatchTaskResult?: DispatchTaskResult, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<DispatchTaskResult>>;
    public updateDispatchTaskResult(id: string, dispatchTaskResult?: DispatchTaskResult, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<DispatchTaskResult>>;
    public updateDispatchTaskResult(id: string, dispatchTaskResult?: DispatchTaskResult, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling updateDispatchTaskResult.');
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
        const httpHeaderAccepts: string[] = [
            'text/plain',
            'application/json',
            'text/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
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
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.put<DispatchTaskResult>(`${this.configuration.basePath}/dispatchtaskresults/${encodeURIComponent(String(id))}`,
            dispatchTaskResult,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
