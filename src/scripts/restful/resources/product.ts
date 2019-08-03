import { Omit } from 'qoobee';
import { Resource, ResourceType } from 'react-restful';

import { FurnitureComponent } from './furnitureComponent';
import { FurnitureMaterial } from './furnitureMaterial';
import { ProductDesign } from './productDesign';
import { ProductType } from './productType';
import { UploadedFile } from './uploadedFile';

export interface Product {
    readonly id?: string;
    readonly design: ProductDesign;
    readonly productType: ProductType;
    readonly totalPrice: number;
    readonly produceCode: string;
    readonly isFeatureProduct?: boolean;
    readonly thumbnail?: UploadedFile;
    readonly name?: string;
    readonly inventory?: number;
    readonly modulesCode: string;
    readonly photos?: UploadedFile[];
}

export interface ProductModule {
    readonly component: FurnitureComponent;
    readonly componentPrice: number;
    readonly material: FurnitureMaterial;
    readonly materialPrice: number;
}

export interface ProductExtended extends Omit<Product, 'produceCode'> {
    readonly modules: ProductModule[];
    readonly thumbnail?: UploadedFile;
}

export const productResourceType = new ResourceType<Product>(nameof<Product>());

export const productResources = {
    find: new Resource<Product, Product[]>({
        resourceType: productResourceType,
        url: '/product'
    }),
    findOne: new Resource<Product>({
        resourceType: productResourceType,
        url: '/product/:id'
    }),
    count: new Resource<Product, number>({
        resourceType: productResourceType,
        method: 'GET',
        url: '/product/count'
    })
};