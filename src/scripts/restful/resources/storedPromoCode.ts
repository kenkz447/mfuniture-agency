import { Resource, ResourceType } from 'react-restful';

import { Agency } from './agency';
import { Promotion } from './promotion';
import { User } from './user';

export interface StoredPromoCode {
    readonly id: string;
    readonly storedAt: string;
    readonly expiredAt: string;
    readonly usedAt: string;
    readonly promotion: Promotion;
    readonly created_by: User;
    readonly storedByAgency: Agency;
    readonly description?: string;
}

export const storedPromoCodeResourceType = new ResourceType<StoredPromoCode>({
    name: nameof<StoredPromoCode>()
});

export const storedPromoCodeResources = {
    find: new Resource<StoredPromoCode, StoredPromoCode[]>({
        resourceType: storedPromoCodeResourceType,
        url: '/storedPromoCodes'
    }),
    findOne: new Resource<StoredPromoCode>({
        resourceType: storedPromoCodeResourceType,
        url: '/storedPromoCodes'
    }),
    create: new Resource<StoredPromoCode>({
        resourceType: storedPromoCodeResourceType,
        url: '/storedPromoCodes',
        method: 'POST'
    }),
    update: new Resource<StoredPromoCode>({
        resourceType: storedPromoCodeResourceType,
        url: '/storedPromoCodes/:id',
        method: 'PUT'
    }),
    detele: new Resource<StoredPromoCode>({
        resourceType: storedPromoCodeResourceType,
        url: '/storedPromoCodes/:id',
        method: 'DELETE'
    })
};