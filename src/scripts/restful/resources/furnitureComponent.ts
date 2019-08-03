import { Record, Resource, ResourceType } from 'react-restful';

import { FurnitureComponentGroup } from './furnitureComponentGroup';
import { FurnitureComponentType } from './furnitureComponentType';
import { FurnitureMaterialType } from './furnitureMaterialType';
import { ProductDesign } from './productDesign';
import { UploadedFile } from './uploadedFile';

export interface FurnitureComponent extends Record {
    readonly id: string;
    readonly name: string;
    readonly obj?: UploadedFile;
    readonly mtl?: UploadedFile;
    readonly thumbnail?: UploadedFile;
    readonly componentType: FurnitureComponentType | string;
    readonly materialTypes: FurnitureMaterialType[];
    readonly quotaValue: number;
    readonly design: ProductDesign;
    readonly price: number;
    readonly fbx?: UploadedFile;
    readonly displayName: string;
    readonly code: string;
    readonly height?: number;
    readonly componentGroup?: FurnitureComponentGroup | string;
    readonly isDefault?: boolean;
    readonly noSelection?: boolean;
    readonly diameter?: number;
    readonly variantIndex?: number;
    readonly scale?: number;
    readonly lengthiness?: number;
    readonly handHeight?: number;
    readonly displayHeight?: number;
    readonly materialNorm?: number;
}

export const furnitureComponentResourceType = new ResourceType<FurnitureComponent>(nameof<FurnitureComponent>());

export const furnitureComponentResources = {
    find: new Resource<FurnitureComponent, FurnitureComponent[]>({
        resourceType: furnitureComponentResourceType,
        url: '/components',
        method: 'GET',
        getDefaultParams: () => ({
            type: 'query',
            parameter: 'disabled_ne',
            value: true
        })
    }),
    findOne: new Resource<FurnitureComponent, FurnitureComponent>({
        resourceType: furnitureComponentResourceType,
        url: '/components/:id',
        method: 'GET'
    }),
    create: new Resource<FurnitureComponent>({
        resourceType: furnitureComponentResourceType,
        url: '/components',
        method: 'POST'
    }),
};