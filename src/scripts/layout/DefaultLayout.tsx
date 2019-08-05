import './DefaultLayout.scss';

import * as React from 'react';

import { PageContent, PageFooter, PageHeader, PageWrapper } from '@/components';
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
        const { curentAgency } = this.context;

        return (
            <PageWrapper>
                <PageHeader title={curentAgency.name} />
                <PageContent>
                    {this.props.children}
                </PageContent>
                <PageFooter />
            </PageWrapper>
        );
    }
}