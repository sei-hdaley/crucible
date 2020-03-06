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

import { CreateDirectoryCommand } from '../model/createDirectoryCommand';
import { Directory } from '../model/directory';
import { EditDirectoryCommand } from '../model/editDirectoryCommand';
import { PartialEditDirectoryCommand } from '../model/partialEditDirectoryCommand';
import { ProblemDetails } from '../model/problemDetails';


import { Configuration }                                     from '../configuration';


export interface DirectoriesServiceInterface {
    defaultHeaders: HttpHeaders;
    configuration: Configuration;
    

    /**
    * Create a new directory.
    * 
    * @param command 
    */
    createDirectory(command?: CreateDirectoryCommand, extraHttpRequestParams?: any): Observable<Directory>;

    /**
    * Delete a directory.
    * 
    * @param id ID of a directory.
    */
    deleteDirectory(id: string, extraHttpRequestParams?: any): Observable<{}>;

    /**
    * Update a directory.
    * 
    * @param id ID of a directory.
    * @param command 
    */
    editDirectory(id: string, command?: EditDirectoryCommand, extraHttpRequestParams?: any): Observable<Directory>;

    /**
    * Retrieve all directories.
    * 
    * @param IncludeRelated Whether or not to return related objects (Files, Workspaces)
    * @param IncludeFileContent Whether or not to include contents of returned Files. Ignored if IncludeRelated is false
    */
    getAllDirectories(IncludeRelated?: boolean, IncludeFileContent?: boolean, extraHttpRequestParams?: any): Observable<Array<Directory>>;

    /**
    * Retrieve all directories within a single exercise.
    * 
    * @param exerciseId 
    * @param IncludeDescendants Whether or not to return only top-level Directories
    * @param IncludeRelated Whether or not to return related objects (Files, Workspaces)
    * @param IncludeFileContent Whether or not to include contents of returned Files. Ignored if IncludeRelated is false
    */
    getDirectoriesByExercise(exerciseId: string, IncludeDescendants?: boolean, IncludeRelated?: boolean, IncludeFileContent?: boolean, extraHttpRequestParams?: any): Observable<Array<Directory>>;

    /**
    * Retrieve a single directory.
    * 
    * @param id ID of a directory.
    * @param Id ID of a directory.
    * @param IncludeRelated Whether or not to return related objects (Files, Workspaces)
    * @param IncludeFileContent Whether or not to include contents of returned Files. Ignored if IncludeRelated is false
    */
    getDirectory(id: string, Id?: string, IncludeRelated?: boolean, IncludeFileContent?: boolean, extraHttpRequestParams?: any): Observable<Directory>;

    /**
    * Retrieve all directories that are children of a specified directory
    * 
    * @param directoryId 
    * @param IncludeDescendants Whether or not to return only top-level Directories
    * @param IncludeRelated Whether or not to return related objects (Files, Workspaces)
    * @param IncludeFileContent Whether or not to include contents of returned Files. Ignored if IncludeRelated is false
    */
    getDirectoryChildren(directoryId: string, IncludeDescendants?: boolean, IncludeRelated?: boolean, IncludeFileContent?: boolean, extraHttpRequestParams?: any): Observable<Array<Directory>>;

    /**
    * Partial update a directory.
    * 
    * @param id ID of a directory.
    * @param command 
    */
    partialEditDirectory(id: string, command?: PartialEditDirectoryCommand, extraHttpRequestParams?: any): Observable<Directory>;

}
