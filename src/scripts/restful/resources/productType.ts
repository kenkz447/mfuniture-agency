import { Record, Resource, ResourceType } from 'react-restful';

import { DiscountByQuantity } from './discountByQuantities';
import { ProductTypeGroup } from './productTypeGroup';
import { UploadedFile } from './uploadedFile';

export interface ProductType extends Record {
    readonly id: string;
    readonly name: string;
    readonly thumbnail: UploadedFile;
    readonly productTypeGroup: ProductTypeGroup | string;
    readonly discountByQuantities?: DiscountByQuantity[];
    readonly size: string;
    readonly volume: number;

    readonly sizeHeight: number;
    readonly sizeWeight: number;
    readonly sizeDepth: number;
    readonly sizeHeightHand: number;
    readonly sizeHeightFoot: number;
    readonly hwd: string;
    readonly crs: string;

    readonly weight: number;
    readonly chairCoverType: string;
    readonly mattressMaterial: string;
    readonly foamType: string;
    readonly caringInstruction: string;
    readonly wrappedMaterial: string;

    readonly view_senceWidth: number;
    readonly view_senceHeight: number;
    readonly view_rotateX: number;
    readonly view_rotateY: number;
    readonly view_cameraFar: number;
}

export const productTypeResourceType = new ResourceType<ProductType>(nameof<ProductType>());

export const productTypeResources = {
    find: new Resource<ProductType, ProductType[]>({
        resourceType: productTypeResourceType,
        url: '/producttype',
        getDefaultParams: () => ({
            type: 'query',
            parameter: 'disabled',
            value: false
        })
    }),
    findOne: new Resource<ProductType, ProductType>({
        resourceType: productTypeResourceType,
        url: '/producttype/:id',
    })
};