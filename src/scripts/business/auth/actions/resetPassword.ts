import {
    AuthForgottenPasswordRequestBody,
    AuthResetPasswordRequestBody,
    authResources,
    request
} from '@/restful';

export const resetPassword = (body: Partial<AuthResetPasswordRequestBody>) => {
    return request(
        authResources.resetPassword,
        {
            type: 'body',
            value: {
                ...body
            }
        }
    );
};