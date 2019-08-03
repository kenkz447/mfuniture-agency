import { Resource, ResourceType } from 'react-restful';
import * as yup from 'yup';

import { Agency } from './agency';
import { Reflink } from './Reflink';
import { Role, roleSchema } from './role';

export interface User {
    readonly _id: string;
    readonly id: string;
    readonly fullName?: string;
    readonly email: string;
    readonly role: Role;
    readonly username: string;
    readonly confirmed?: boolean;
    readonly agency?: Agency;
    readonly phone?: string;
    readonly createdAt?: string;

    readonly blocked?: boolean;
    readonly blockedAt?: string;
    readonly blockedReason?: string;
    readonly blockedBy?: User;

    readonly password?: string;
    readonly rePassword?: string;

    readonly registration_businessAreas?: string;
    readonly registration_companyName?: string;
    readonly registration_companyAddress?: string;

    readonly reflinkCode?: string;
    readonly reflink?: Reflink;

    readonly registeredAt?: string;
}

export interface UserRegisterResponse {
    readonly jwt: string;
    readonly user: User;
}

export const userSchema = yup.object().shape<User>({
    _id: yup.string(),
    id: yup.string(),
    email: yup.string().email().required(),
    fullName: yup.string().required(),
    confirmed: yup.bool(),
    role: roleSchema.nullable(true).default(null),
    username: yup.string().required(),
    phone: yup.string().required(),

    registration_businessAreas: yup.string().nullable(true),
    registration_companyAddress: yup.string().nullable(true),
    registration_companyName: yup.string().nullable(true),
});

export const userResourceType = new ResourceType<User>({
    name: nameof<User>(),
    keyProperty: '_id'
});

export const userResources = {
    find: new Resource<User, User[]>({
        resourceType: userResourceType,
        url: '/users'
    }),
    me: new Resource<User>({
        resourceType: userResourceType,
        url: '/users/me'
    }),
    update: new Resource<User>({
        resourceType: userResourceType,
        url: '/users/:id',
        method: 'PUT'
    })
};