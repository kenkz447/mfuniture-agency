import { Resource } from 'react-restful';
import * as yup from 'yup';

import { getDefaultParamsForUpdate } from '../base';
import { User, userResourceType } from './user';

export interface ChangePasswordRequestBody {
    readonly oldPassword: string;
    readonly newPassword: string;
    readonly confirmNewPassword: string;
}

export const profileResources = {
    updateUser: new Resource({
        url: '/profile/update-user/:id',
        method: 'PUT',
        getDefaultParams: getDefaultParamsForUpdate
    }),
    updateBusinessInfo: new Resource<User>({
        resourceType: userResourceType,
        url: '/profile/update-business-info/:id',
        method: 'PUT',
        getDefaultParams: getDefaultParamsForUpdate,
        bodySchema: yup.object().shape<Partial<User>>({
            registration_businessAreas: yup.string().required(),
            registration_companyAddress: yup.string().required(),
            registration_companyName: yup.string().required()
        }),
        getDefaultMeta: () => ({
            message: 'Cập nhật thành công'
        })
    }),
    changePassword: new Resource({
        url: '/profile/change-password',
        method: 'PUT'
    }),
    blockUser: new Resource({
        resourceType: userResourceType,
        url: '/profile/block/:id',
        method: 'PUT',
        getDefaultParams: getDefaultParamsForUpdate,
        bodySchema: yup.object().shape<Partial<User>>({
            blockedReason: yup.string().required()
        })
    }),
};