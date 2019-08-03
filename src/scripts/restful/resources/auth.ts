import { Resource } from 'react-restful';
import * as yup from 'yup';

import { User, userSchema } from './user';

export interface AuthLoginRequestBody {
    readonly identifier: string;
    readonly password: string;
}

export interface AuthLoginResponseBody {
    readonly user: User;
    readonly jwt: string;
}

export interface AuthForgottenPasswordRequestBody {
    readonly email: string;
    readonly url: string;
}

export interface AuthForgottenPasswordResponseBody {

}

export interface AuthResetPasswordRequestBody {
    readonly code: string;
    readonly password: string;
    readonly passwordConfirmation: string;
}

export interface AuthResetPasswordReponseBody {

}

export const authResources = {
    login: new Resource<AuthLoginRequestBody, AuthLoginResponseBody>({
        url: '/auth/local',
        method: 'POST'
    }),
    forgottenPassword: new Resource<AuthForgottenPasswordRequestBody, AuthForgottenPasswordResponseBody>({
        url: '/auth/forgot-password',
        method: 'POST'
    }),
    resetPassword: new Resource<AuthResetPasswordRequestBody, AuthResetPasswordReponseBody>({
        url: '/auth/reset-password',
        method: 'POST'
    }),
    register: new Resource<User>({
        url: '/auth/local/register',
        method: 'POST',
        bodySchema: userSchema.concat(
            // tslint:disable-next-line:no-any
            yup.object().shape<any>({
                password: yup.string().required(),
                rePassword: yup.string()
                    .oneOf([yup.ref('password')], 'Passwords must match')
                    .required()
            })
        )
    }),
    providerLogin: new Resource<AuthLoginRequestBody, AuthLoginResponseBody>({
        url: '/auth/:provider/callback'
    }),
};