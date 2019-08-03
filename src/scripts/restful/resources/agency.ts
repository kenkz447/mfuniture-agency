import { Record, Resource, ResourceType } from 'react-restful';
import * as yup from 'yup';

import { getDefaultParamsForUpdate } from '../base';
import { AgencyLevel } from './agencyLevel';
import { AgencyType } from './agencyType';
import { BusinessLicense } from './businessLicense';
import { City } from './city';
import { County } from './county';
import { User } from './user';

export interface Agency extends Record {
    readonly id?: string;
    readonly name: string;
    readonly address: string;
    readonly phone: string;
    readonly email: string;
    readonly level: AgencyLevel;
    readonly linkedUser: User;
    readonly city: City;
    readonly county: County;
    readonly createdAt?: string;
    readonly agencyType?: AgencyType;
}

const agencySchema = yup.object().shape<Agency>({
    address: yup.string().required(),
    city: yup.object().required() as any,
    county: yup.object().required() as any,
    email: yup.string().email().required(),
    level: yup.object().required() as any,
    linkedUser: yup.object().required() as any,
    name: yup.string().required(),
    phone: yup.string().required()
});

export const agencyResourceType = new ResourceType<Agency>(nameof<Agency>());

export const agencyResources = {
    find: new Resource<Agency, Agency[]>({
        resourceType: agencyResourceType,
        url: '/agency'
    }),
    findOne: new Resource<Agency>({
        resourceType: agencyResourceType,
        url: '/agency/:id'
    }),
    findOneByUser: new Resource<Agency>({
        resourceType: agencyResourceType,
        url: '/agency/by-user/:userId'
    }),
    create: new Resource<Agency>({
        resourceType: agencyResourceType,
        url: '/agency',
        method: 'POST',
        bodySchema: agencySchema
    }),
    update: new Resource<Agency>({
        resourceType: agencyResourceType,
        url: '/agency/:id',
        method: 'PUT',
        getDefaultParams: getDefaultParamsForUpdate
    }),
};