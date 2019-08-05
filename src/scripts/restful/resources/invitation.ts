import { Resource, ResourceType } from 'react-restful';
import * as yup from 'yup';

import { getDefaultParams, getDefaultParamsForUpdate } from '../base';
import { City } from './city';
import { County } from './county';
import { User, UserRegisterResponse } from './user';

export interface Invitation {
    readonly id?: string;
    readonly code: string;
    readonly expirationDate: string;
    readonly created_by: User;
    readonly receiverFullName: string;
    readonly receiverAgencyName?: string;
    readonly receiverPhone?: string;
    readonly receiverAddress?: string;
    readonly receiverCity?: City;
    readonly receiverCounty?: County;
    readonly joinedDate?: string;
    readonly createdAt: string;
    readonly joinedUser?: User;
    readonly note?: string; 
}

export interface InvitationJoinRequestBody {
    readonly invitationId: string;
    readonly email: string;
    readonly password: string;
    readonly rePassword: string;
}

export const invitationResourceType = new ResourceType<Invitation>(nameof<Invitation>());

export const invitationResources = {
    find: new Resource<Invitation, Invitation[]>({
        resourceType: invitationResourceType,
        url: '/invitations',
        getDefaultParams: getDefaultParams
    }),
    findOne: new Resource<Invitation>({
        resourceType: invitationResourceType,
        url: '/invitations/:id'
    }),
    findOneByCode: new Resource<Invitation>({
        resourceType: invitationResourceType,
        url: '/invitations/code/:code'
    }),
    create: new Resource<Invitation>({
        resourceType: invitationResourceType,
        url: '/invitations',
        method: 'POST'
    }),
    update: new Resource<Invitation>({
        resourceType: invitationResourceType,
        url: '/invitations/:id',
        method: 'PUT',
        getDefaultParams: getDefaultParamsForUpdate
    }),
    join: new Resource<InvitationJoinRequestBody, UserRegisterResponse>({
        url: '/invitations/join/:inviationId',
        method: 'PUT',
        bodySchema: yup.object().shape<InvitationJoinRequestBody>({
            invitationId: yup.string().required(),
            email: yup.string().email().required(),
            password: yup.string().required(),
            rePassword: yup.string()
                .oneOf([yup.ref('password'), ''], 'Passwords must match')
        })
    }),
    delete: new Resource<Invitation>({
        resourceType: invitationResourceType,
        url: '/invitations/:id',
        method: 'DELETE'
    }),
};