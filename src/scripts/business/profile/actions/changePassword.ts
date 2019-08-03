import {
    ChangePasswordRequestBody,
    profileResources,
    request
} from '@/restful';

export const changePassword = (values: ChangePasswordRequestBody) => {
    return request(profileResources.changePassword, { type: 'body', value: values });
};