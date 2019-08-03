import { Record, Resource, ResourceType } from 'react-restful';

import { UploadedFile } from './uploadedFile';

export interface AgencyLevel {
    readonly id: string;
    readonly name: string;
    readonly discountPercent: number;
    readonly minPay: number;
    readonly icon: UploadedFile;
    readonly index: number;
}

export const agencyLevelResourceType = new ResourceType<AgencyLevel>(nameof<AgencyLevel>());

export const agencyLevelResources = {
    find: new Resource<AgencyLevel, AgencyLevel[]>({
        resourceType: agencyLevelResourceType,
        url: '/agencyLevel',
        getDefaultParams: () => ({
            type: 'query',
            parameter: '_sort',
            value: 'index:ASC'
        })
    })
};