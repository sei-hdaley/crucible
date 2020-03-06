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
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


export interface FileVersion { 
    /**
     * ID of the file version.
     */
    id?: string;
    /**
     * ID of the file.
     */
    fileId?: string | null;
    /**
     * Name of the file.
     */
    name?: string | null;
    /**
     * The ID of the user who saved the file last.
     */
    modifiedById?: string | null;
    /**
     * The name of the user who saved the file last.
     */
    modifiedByName?: string | null;
    /**
     * The date the file was saved.
     */
    dateSaved?: Date | null;
    /**
     * The full contents of the file.
     */
    content?: string | null;
    /**
     * Tag string applied to this version of the file.
     */
    tag?: string | null;
    /**
     * The ID of the user who tagged the file.
     */
    taggedById?: string | null;
    /**
     * The name of the user who tagged the file.
     */
    taggedByName?: string | null;
    /**
     * Date the tag was applied to this version of the file.
     */
    dateTagged?: Date | null;
}

