import { Record, Resource, ResourceType } from 'react-restful';

import { getDefaultParamsForUpdate } from '../base';
import { BusinessLicense } from './businessLicense';
import { City } from './city';
import { County } from './county';
import { User } from './user';

export type AddressType = 'apartment' | 'house';

export interface Address {
    readonly id?: string;
    readonly name: string;
    readonly fullAddress: string;
    readonly phone: string;
    readonly email: string;
    readonly type: AddressType;
    readonly created_by: User;
    readonly city: City;
    readonly county: County;
    readonly consigneeName: string;
}

export const addressResourceType = new ResourceType<Address>(nameof<Address>());

export const addressResources = {
    find: new Resource<Address, Address[]>({
        resourceType: addressResourceType,
        url: '/address'
    }),
    findOne: new Resource<Address>({
        resourceType: addressResourceType,
        url: '/address/:id'
    }),
    create: new Resource<Address>({
        resourceType: addressResourceType,
        url: '/address',
        method: 'POST'
    }),
    update: new Resource<Address>({
        resourceType: addressResourceType,
        url: '/address/:id',
        method: 'PUT',
        getDefaultParams: getDefaultParamsForUpdate
    }),
    delete: new Resource<Address>({
        resourceType: addressResourceType,
        url: '/address/:id',
        method: 'DELETE'
    }),
};