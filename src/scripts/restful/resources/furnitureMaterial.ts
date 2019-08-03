import { Resource, ResourceType } from 'react-restful';
import * as yup from 'yup';

import {
    FurnitureMaterialType,
    furnitureMaterialTypeSchema
} from './furnitureMaterialType';
import { UploadedFile, uploadedFileSchema } from './uploadedFile';

export interface FurnitureMaterial {
    readonly id: string;
    readonly name: string;
    readonly texture: UploadedFile;
    readonly materialType: FurnitureMaterialType;
    readonly price: number;
    readonly inStock: boolean;
    readonly code: string;
    readonly description?: string;
    readonly view_normalMap?: UploadedFile;
    readonly isDefault?: boolean;
    readonly displayName?: string;
    readonly hideInLibrary?: boolean;
    readonly shininess?: number;
    readonly isExternal?: boolean;
    
    readonly thumbnail?: UploadedFile;
    readonly details?: string;
}

export const furnitureMaterialResourceType = new ResourceType<FurnitureMaterial>(nameof<FurnitureMaterial>());

export const furnitureMaterialResources = {
    find: new Resource<FurnitureMaterial, FurnitureMaterial[]>({
        resourceType: furnitureMaterialResourceType,
        url: '/material'
    }),
    createExternal: new Resource<FurnitureMaterial>({
        resourceType: furnitureMaterialResourceType,
        method: 'POST',
        url: '/material/external',
        bodySchema: yup.object().shape<Partial<FurnitureMaterial>>({
            displayName: yup.string().required(),
            materialType: furnitureMaterialTypeSchema.required(),
            texture: uploadedFileSchema.required()
        })
    }),
    delete: new Resource<FurnitureMaterial>({
        resourceType: furnitureMaterialResourceType,
        url: '/material/:id',
        method: 'DELETE'
    }),
};