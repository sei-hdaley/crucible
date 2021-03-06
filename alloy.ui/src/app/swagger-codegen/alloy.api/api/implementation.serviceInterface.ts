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
 * Alloy API
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

import { Observable }                                        from 'rxjs/Observable';


import { ApiError } from '../model/apiError';
import { Implementation } from '../model/implementation';


import { Configuration }                                     from '../configuration';


export interface ImplementationServiceInterface {
    defaultHeaders: HttpHeaders;
    configuration: Configuration;
    

    /**
    * Creates a new Implementation
    * Creates a new Implementation with the attributes specified  &lt;para /&gt;  Accessible only to a SuperUser or an Administrator
    * @param implementation The data to create the Implementation with
    */
    createImplementation(implementation?: Implementation, extraHttpRequestParams?: any): Observable<Implementation>;

    /**
    * Creates a new Implementation from a definition
    * Creates a new Implementation from the specified definition
    * @param definitionId The ID of the Definition to use to create the Implementation
    */
    createImplementationFromDefinition(definitionId: string, extraHttpRequestParams?: any): Observable<Implementation>;

    /**
    * Deletes an Implementation
    * Deletes an Implementation with the specified id  &lt;para /&gt;  Accessible only to a SuperUser or a User on an Admin Team within the specified Implementation
    * @param id The id of the Implementation to delete
    */
    deleteImplementation(id: string, extraHttpRequestParams?: any): Observable<{}>;

    /**
    * Ends an Implementation
    * Ends an Implementation with the specified id  &lt;para /&gt;  Accessible only to a SuperUser or a User on an Admin Team within the specified Implementation
    * @param id The id of the Implementation to end
    */
    endImplementation(id: string, extraHttpRequestParams?: any): Observable<{}>;

    /**
    * Gets all Implementations for the indicated Definition
    * Returns a list of all of the Implementations for the Definition.
    * @param definitionId 
    */
    getDefinitionImplementations(definitionId: string, extraHttpRequestParams?: any): Observable<Array<Implementation>>;

    /**
    * Gets a specific Implementation by id
    * Returns the Implementation with the id specified  &lt;para /&gt;  Accessible to a SuperUser or a User that is a member of a Team within the specified Implementation
    * @param id The id of the Implementation
    */
    getImplementation(id: string, extraHttpRequestParams?: any): Observable<Implementation>;

    /**
    * Gets all Implementation in the system
    * Returns a list of all of the Implementations in the system.  &lt;para /&gt;  Only accessible to a SuperUser
    */
    getImplementations(extraHttpRequestParams?: any): Observable<Array<Implementation>>;

    /**
    * Gets the user&#39;s Implementations for the indicated Definition
    * Returns a list of the user&#39;s Implementations for the Definition.
    * @param definitionId 
    */
    getMyDefinitionImplementations(definitionId: string, extraHttpRequestParams?: any): Observable<Array<Implementation>>;

    /**
    * Updates an Implementation
    * Updates an Implementation with the attributes specified  &lt;para /&gt;  Accessible only to a SuperUser or a User on an Admin Team within the specified Implementation
    * @param id The Id of the Exericse to update
    * @param implementation The updated Implementation values
    */
    updateImplementation(id: string, implementation?: Implementation, extraHttpRequestParams?: any): Observable<Implementation>;

}

