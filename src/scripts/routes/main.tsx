import { routeFrom } from 'qoobee';
import * as React from 'react';
import { Route, Switch } from 'react-router';

import { NotFoundPage } from '@/components';

import { RouteCart } from './cart';
import { RouteCatalogDetails } from './catalog-details';
import { RouteCatalogs } from './catalogs';
import { RouteHome } from './home';
import { RouteOrderDetail } from './order-detail';
import { RouteOrders } from './orders';

export const routes = routeFrom([
    RouteHome,
    RouteCatalogs,
    RouteCatalogDetails,
    RouteCart,
    RouteOrderDetail,
    RouteOrders
]);

export default () => (
    <Switch>
        {routes}
        <Route component={NotFoundPage} />
    </Switch>
);