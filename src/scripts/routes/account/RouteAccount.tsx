import { RouteInfo } from 'qoobee';
import * as React from 'react';
import { Container } from 'reactstrap';

import { SETTING_URL } from '@/configs';
import { AppPageProps, BasePageComponent, policies } from '@/domain';

import { SettingTabs } from './containers';

export class RouteAccount extends BasePageComponent<AppPageProps> {
    public static readonly routeInfo: RouteInfo = {
        path: SETTING_URL,
        title: 'Cài đặt',
        exact: true,
        policies: [policies.locationAllowed]
    };

    public render() {
        return (
            <Container>
                <h1 className="h3 mb-4">Cài đặt</h1>
                <SettingTabs />
            </Container>
        );
    }
}