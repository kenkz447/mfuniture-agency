import './DefaultLayout.scss';

import * as React from 'react';

import { PageContent, PageHeader, PageWrapper } from '@/components';
import { BaseComponent } from '@/domain';

interface DefaultLayoutProps {
}

interface DefaultLayoutState {
    readonly siderCollapsed: boolean;
}

export class DefaultLayout extends BaseComponent<DefaultLayoutProps, DefaultLayoutState> {
    constructor(props: DefaultLayoutProps) {
        super(props);
    }

    public render() {
        const { cuurentAgency } = this.context;

        return (
            <PageWrapper id="calatalogPage">
                <PageHeader title={cuurentAgency.name} />
                <PageContent>
                    {this.props.children}
                </PageContent>
            </PageWrapper>
        );
    }
}