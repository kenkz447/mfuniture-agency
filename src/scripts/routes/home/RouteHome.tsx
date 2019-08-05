import { RouteInfo } from 'qoobee';
import * as React from 'react';
import { Redirect } from 'react-router';
import { Container } from 'reactstrap';

import { CALALOG_URL, HOME_URL } from '@/configs';
import { AppPageProps, BasePageComponent, policies } from '@/domain';
import { replaceRoutePath } from '@/utilities';

export class RouteHome extends BasePageComponent<AppPageProps> {
    public static readonly routeInfo: RouteInfo = {
        path: HOME_URL,
        title: 'Trang chủ',
        exact: true,
        policies: [policies.locationAllowed]
    };

    public render() {
        const { allProductTypeGroup } = this.context;

        const replaceTo = replaceRoutePath(CALALOG_URL, { productTypeGroupId: allProductTypeGroup[0].id });

        return (
            <Redirect to={replaceTo} />
        );
    }
}