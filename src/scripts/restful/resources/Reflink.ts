import { Resource, ResourceType } from 'react-restful';

import { Promotion } from './promotion';

export interface Reflink {
    readonly id: string;
    readonly name: string;
    readonly code: string;
    readonly expirationDate: string;
    readonly promotion: Promotion;
}

export const reflinkResourceType = new ResourceType<Reflink>({
    name: nameof<Reflink>()
});

export const reflinkResources = {
    find: new Resource<Reflink, Reflink[]>({
        resourceType: reflinkResourceType,
        url: '/reflinks'
    }),
    findOneByCode: new Resource<Reflink>({
        resourceType: reflinkResourceType,
        url: '/reflinks/by-code/:code'
    })
};