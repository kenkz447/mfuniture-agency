import { Record, Resource, ResourceType } from 'react-restful';

import { County } from './county';

export interface City extends Record {
    readonly id: string;
    readonly name: string;
    readonly transportFee: number;
    readonly additionalShippingDays: number;
    readonly counties: County[];
}

export const cityResourceType = new ResourceType<City>(nameof<City>());

export const cityResources = {
    find: new Resource<City, City[]>({
        resourceType: cityResourceType,
        url: '/city',
    })
};