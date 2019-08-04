import { RootContext } from 'qoobee';
import * as React from 'react';
import { Route, Router, Switch } from 'react-router';

import { PageLoading } from '@/components';
import { LOGIN_URL } from '@/configs';
import { WithDomainContext } from '@/domain';
import { BlankLayout, DefaultLayout } from '@/layout';

const MainRoutes = React.lazy(() => import('./main'));
const AuthenticationRoutes = React.lazy(() => import('./authentication'));

export class RouterRoot extends React.PureComponent {
    public static readonly contextType = RootContext;
    public readonly context!: WithDomainContext;

    private readonly authenticationRouteComponent = () => {
        return (
            <BlankLayout>
                <React.Suspense fallback={<PageLoading />}>
                    <AuthenticationRoutes />
                </React.Suspense>
            </BlankLayout>
        );
    }

    private readonly mainRouteComponent = () => {
        return (
            <DefaultLayout>
                <React.Suspense fallback={<PageLoading />}>
                    <MainRoutes />
                </React.Suspense>
            </DefaultLayout>
        );
    }

    public render() {
        const { history } = this.context;

        return (
            <Router history={history}>
                <Switch>
                    <Route path={LOGIN_URL}>
                        {this.authenticationRouteComponent}
                    </Route>
                    <Route>
                        {this.mainRouteComponent}
                    </Route>
                </Switch>
            </Router>
        );
    }
}