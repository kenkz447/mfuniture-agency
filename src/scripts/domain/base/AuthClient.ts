// tslint:disable:no-any
import { History } from 'history';
import { RequestParameter, Resource } from 'react-restful';

import { request } from '@/restful';
import {
    clearToken,
    CookiesOption,
    getToken,
    getUrlSearchParam,
    redirect,
    saveToken
} from '@/utilities';

interface AuthClientProps<T> {
    readonly loginPath: string;
    readonly history: History;
    readonly getResponseToken: (response: any) => string;
    readonly getCookiesOption?: (token: string, response?: any) => CookiesOption;
    readonly getUserResource: Resource<T>;
    readonly getUserEquestParams?: (token: string) => RequestParameter | RequestParameter[];
    readonly loginResource: Resource<{}>;
}

export class AuthClient<T> {
    public static readonly authInstance = Symbol();

    public readonly props: AuthClientProps<T>;

    constructor(props: AuthClientProps<T>) {
        this.props = props;
    }

    public async getLoggedInUser() {
        const { getUserResource, getUserEquestParams } = this.props;

        const storedToken = getToken();
        if (!storedToken) {
            throw 'NO_TOKEN_FOUND';
        }

        try {
            const requestParams = getUserEquestParams && getUserEquestParams(storedToken);
            const user: T = await request(
                getUserResource,
                requestParams
            );

            return user;
        } catch (error) {
            if (error instanceof Response) {
                if (error.status === 401) {
                    clearToken();
                }
                throw 'TOKEN_INVALID';
            }

            throw 'no action';
        }
    }

    public readonly login = async (requestBody: {}) => {
        const { getResponseToken, getCookiesOption, loginResource } = this.props;
        try {
            const response = await request(loginResource, {
                type: 'body',
                value: requestBody
            });

            const token = getResponseToken(response);
            const tokenCookiesOption = getCookiesOption && getCookiesOption(token, response);
            saveToken(token, tokenCookiesOption);

            const returnUrlParam = getUrlSearchParam('returnUrl');
            const returnPath = returnUrlParam ? returnUrlParam : '/';

            redirect(returnPath);
        } catch (error) {
            throw error;
        }
    }

    public readonly jwtLogin = (token: string, isRedirect: boolean = true) => {
        const { getCookiesOption } = this.props;

        const tokenCookiesOption = getCookiesOption && getCookiesOption(token);

        saveToken(token, tokenCookiesOption);
        
        if (!isRedirect) {
            return;
        }

        const returnUrlParam = getUrlSearchParam('returnUrl');
        const returnPath = returnUrlParam ? returnUrlParam : '/';

        redirect(returnPath);
    }

    public readonly logout = (returnUrl?: string) => {
        const { loginPath } = this.props;
        clearToken();
        location.href = returnUrl || loginPath;
    }

    public readonly gotoLoginPage = () => {
        this.props.history.replace(
            this.props.loginPath
        );
    }
}