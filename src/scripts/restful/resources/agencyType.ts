import { Record, Resource, ResourceType } from 'react-restful';

export interface AgencyType extends Record {
    readonly id: string;
    readonly name: string;
}

export const agencyTypeResourceType = new ResourceType<AgencyType>(nameof<AgencyType>());

export const agencyTypeResources = {
    find: new Resource<AgencyType, AgencyType[]>({
        resourceType: agencyTypeResourceType,
        url: '/agencytypes'
    })
};