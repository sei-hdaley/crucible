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
 * Caster API
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: v1
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { HttpHeaders }                                       from '@angular/common/http';

import { Observable }                                        from 'rxjs';

import { CreateRunCommand } from '../model/createRunCommand';
import { ProblemDetails } from '../model/problemDetails';
import { Run } from '../model/run';


import { Configuration }                                     from '../configuration';


export interface RunsServiceInterface {
    defaultHeaders: HttpHeaders;
    configuration: Configuration;


    /**
    * Create a new Run
    *
    * @param command The Create command
    */
    createRun(command?: CreateRunCommand, extraHttpRequestParams?: any): Observable<Run>;

    /**
    * Get a Run by Id
    *
    * @param id The Id of the Run to retrieve
    */
    getRun(id: string, extraHttpRequestParams?: any): Observable<Run>;

    /**
    * Get a list of Runs for a specified Workspace
    *
    * @param workspaceId The Id of a Workspace
    */
    getRunsByWorkspaceId(workspaceId: string, IncludePlan?: boolean, IncludeApply?: boolean, extraHttpRequestParams?: any): Observable<Array<Run>>;

    /**
    * Reject a Run, preventing it from being Applied
    *
    * @param id The Id of the Run to reject
    */
    rejectRun(id: string, extraHttpRequestParams?: any): Observable<Run>;

}

