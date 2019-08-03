import { Record, Resource, ResourceType } from 'react-restful';
import * as yup from 'yup';

import { FurnitureMaterial } from './furnitureMaterial';
import { UploadedFile } from './uploadedFile';

export interface FurnitureMaterialType extends Record {
    readonly id: string;
    readonly name: string;
    readonly displayName: string;
    readonly materials?: FurnitureMaterial[];
    readonly view_normalMap?: UploadedFile;
    readonly view_shiny?: number;
    readonly hideInLibrary?: boolean;
    readonly isExternal?: boolean;
}

export const furnitureMaterialTypeSchema = yup.object().shape<FurnitureMaterialType>({
    id: yup.string().required(),
    displayName: yup.string(),
    name: yup.string()
});

export const furnitureMaterialTypeResourceType = new ResourceType<FurnitureMaterialType>(
    nameof<FurnitureMaterialType>()
);

export const furnitureMaterialTypeResources = {
    find: new Resource<FurnitureMaterialType, FurnitureMaterialType[]>({
        resourceType: furnitureMaterialTypeResourceType,
        url: '/materialtype',
        method: 'GET'
    })
};