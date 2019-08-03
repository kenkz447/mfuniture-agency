import { RootContext } from 'qoobee';
import * as React from 'react';
import { Route, Router, Switch } from 'react-router';

import { PageLoading } from '@/components';
import { WithDomainContext } from '@/domain';
import { DefaultLayout } from '@/layout';

const MainRoutes = React.lazy(() => import('./main'));

export class RouterRoot extends React.PureComponent {
    public static readonly contextType = RootContext;
    public readonly context!: WithDomainContext;

    private readonly getLayoutComponent = () => {
        return DefaultLayout;
    }

    private readonly mainRouteComponent = () => {

        const Layout = this.getLayoutComponent();

        return (
            <Layout>
                <React.Suspense fallback={<PageLoading />}>
                    <MainRoutes />
                </React.Suspense>
            </Layout>
        );
    }

    public render() {
        const { history } = this.context;

        return (
            <Router history={history}>
                <Switch>
                    <Route >
                        {this.mainRouteComponent}
                    </Route>
                </Switch>
            </Router>
        );
    }
}