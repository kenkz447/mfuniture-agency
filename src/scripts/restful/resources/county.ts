import { Resource, ResourceType } from 'react-restful';

import { City } from './city';

export interface County {
    readonly id: string;
    readonly name: string;
    readonly city: City;
}

export const countyResourceType = new ResourceType<County>(nameof<County>());

export const countyResources = {
    find: new Resource<County, County[]>({
        resourceType: countyResourceType,
        url: '/county',
    }),
    findOne: new Resource<County>({
        resourceType: countyResourceType,
        url: '/county'
    })
};