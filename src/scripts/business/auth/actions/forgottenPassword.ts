import { RESET_PASSWORD_URL } from '@/configs';
import {
    AuthForgottenPasswordRequestBody,
    authResources,
    request
} from '@/restful';

export const forgottenPassword = (body: Partial<AuthForgottenPasswordRequestBody>) => {
    return request(
        authResources.forgottenPassword,
        {
            type: 'body',
            value: {
                ...body,
                url: `${location.protocol}//${location.host}${RESET_PASSWORD_URL}`
            }
        }
    );
};