import { Record, Resource, ResourceType } from 'react-restful';

import { ProductType } from './productType';

export interface DiscountByQuantity extends Record {
    readonly id?: string;
    readonly discountPerProduct: number;
    readonly discountPerProductPercent?: number;
    readonly quantity: number;
    readonly productType: ProductType;
}

export const discountByQuantitiesResourceType = new ResourceType<DiscountByQuantity>(nameof<DiscountByQuantity>());

export const discountByQuantitiesResources = {
    find: new Resource<DiscountByQuantity, DiscountByQuantity[]>({
        resourceType: discountByQuantitiesResourceType,
        url: '/discountByQuantity',
    })
};