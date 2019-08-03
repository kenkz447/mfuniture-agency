import { Record, Resource, ResourceType } from 'react-restful';

import { ProductDesignGroup } from './productDesignGroup';
import { ProductionCodeEntity } from './productionCodeEntity';
import { ProductType } from './productType';
import { UploadedFile } from './uploadedFile';

export interface ProductDesign extends Record {
    readonly id: string;
    readonly name: string;
    readonly thumbnail: UploadedFile;
    readonly productType: ProductType | string;
    readonly designGroup: ProductDesignGroup;
    readonly title?: string;
    readonly coverPhoto?: UploadedFile;
    readonly coverPhotoShape?: 'square' | 'rectangle';
    readonly photos: UploadedFile[];
    readonly order?: number;
    readonly handHeight?: number;
    readonly productionCode?: ProductionCodeEntity;
}

export const productDesignResourceType = new ResourceType<ProductDesign>(nameof<ProductDesign>());

export const productDesignResources = {
    find: new Resource<ProductDesign, ProductDesign[]>({
        resourceType: productDesignResourceType,
        url: '/design',
    })
};