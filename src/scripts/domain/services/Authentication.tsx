import * as jwtDecode from 'jwt-decode';
import * as React from 'react';

import { LOGIN_URL } from '@/configs';
import {
    AuthLoginResponseBody,
    authResources,
    User,
    userResources
} from '@/restful';

import { AuthClient, BaseComponent } from '../base';
import { roles } from '../roles-permission';

interface DecodedJWT {
    readonly _id: string;
    readonly sub: number;
    readonly name: string;
    readonly email: string;
    readonly exp: number;
    readonly iss: string;
    readonly aud: string;
}

type AuthenticationProps = {
};

interface AuthenticationState {
    readonly allowLoad: boolean;
}

export class Authentication extends BaseComponent<
    AuthenticationProps,
    AuthenticationState
    > {

    public static readonly defaultProps = {
        children: null
    };

    constructor(props: AuthenticationProps) {
        super(props);

        this.state = {
            allowLoad: false
        };
    }

    private readonly authenticaton = async (authClient: AuthClient<User>) => {
        const { setContext } = this.context;

        try {
            const user = await authClient.getLoggedInUser();
            const role = roles.find(o => o.key === user.role.type);

            if (!role) {
                throw 'ACCESS_DENIED';
            }

            setContext({
                currentUser: user,
                currentRole: role
            });

        } catch (message) {
            if (message === 'TOKEN_INVALID') {
                authClient.logout();
            }

            if (message === 'NO_TOKEN_FOUND') {
                authClient.gotoLoginPage();
            }
        } finally {
            this.setState({
                allowLoad: true
            });
        }
    }

    private readonly getAuthClient = (history) => {
        const authClient = new AuthClient<User>({
            history: history,
            loginPath: LOGIN_URL,
            getUserResource: userResources.me,
            getUserEquestParams: (token) => {
                const userInfo: DecodedJWT = jwtDecode(token);

                return {
                    type: 'path',
                    parameter: 'id',
                    value: userInfo.sub || userInfo._id
                };
            },
            getResponseToken: (response: AuthLoginResponseBody) => response.jwt,
            getCookiesOption: (token) => {
                const userInfo: DecodedJWT = jwtDecode(token);
                const now = new Date();
                const timeNow = now.getTime();

                return {
                    expires: new Date(timeNow + userInfo.exp)
                };
            },
            loginResource: authResources.login
        });

        return authClient;
    }

    public componentWillMount() {
        const { setContext, history } = this.context;

        const authClient = this.getAuthClient(history);

        this.authenticaton(authClient)
            .then(() => setContext({ authClient }));
    }

    public render() {
        if (!this.state.allowLoad) {
            return null;
        }

        return this.props.children;
    }
}