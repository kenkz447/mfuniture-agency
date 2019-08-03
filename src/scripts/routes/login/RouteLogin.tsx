import { RouteInfo } from 'qoobee';
import * as React from 'react';
import { Container } from 'reactstrap';

import { PageContent, PageWrapper } from '@/components';
import { LOGIN_URL } from '@/configs';
import { AppPageProps, BasePageComponent } from '@/domain';
import { LoginFormControl } from '@/forms/login';

export class RouteLogin extends BasePageComponent<AppPageProps> {
    public static readonly routeInfo: RouteInfo = {
        path: LOGIN_URL,
        title: 'Login',
        exact: true
    };

    public render() {
        return (
            <PageWrapper>
                <PageContent>
                    <Container>
                        <LoginFormControl />
                    </Container>
                </PageContent>
            </PageWrapper>
        );
    }
}