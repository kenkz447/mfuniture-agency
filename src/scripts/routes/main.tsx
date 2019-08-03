import { routeFrom } from 'qoobee';
import * as React from 'react';
import { Route, Switch } from 'react-router';

import { NotFoundPage } from '@/components';

import { RouteCatalogDetails } from './catalog-details';
import { RouteCatalogs } from './catalogs';
import { RouteHome } from './home';
import { RouteLogin } from './login';

export const routes = routeFrom([
    RouteLogin,
    RouteHome,
    RouteCatalogs,
    RouteCatalogDetails
]);

export default () => (
    <Switch>
        {routes}
        <Route component={NotFoundPage} />
    </Switch>
);