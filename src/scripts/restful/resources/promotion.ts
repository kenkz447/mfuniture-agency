import { Record, Resource, ResourceType } from 'react-restful';

import { Post } from './post';
import { ProductType } from './productType';

export interface Promotion extends Record {
    readonly id: string;
    readonly code: string;
    readonly quantity: number;
    readonly discountPrice: number;
    readonly discountPercent: number;
    readonly expirationDate: string;
    readonly enabled?: boolean;
    readonly useFor: 'order' | 'orderDetail';
    readonly description: string;
    readonly forProductTypes: string[] | ProductType[];
    readonly productQuantityOrdering?: number;
    readonly linkedPost?: string | Post;
    readonly forSpecificProduct?: string;
}

export const promotionResourceType = new ResourceType<Promotion>(nameof<Promotion>());

export const promotionResources = {
    find: new Resource<Promotion, Promotion[]>({
        resourceType: promotionResourceType,
        url: '/promotion'
    }),
    findOne: new Resource<Promotion>({
        resourceType: promotionResourceType,
        url: '/promotion/:id',
    })
};