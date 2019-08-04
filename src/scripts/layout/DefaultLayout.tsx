import './DefaultLayout.scss';

import * as React from 'react';

import {
    PageContent,
    PageFooter,
    PageHeader,
    PageWrapper,
    SlideUp
} from '@/components';
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
            <PageWrapper>
                <PageHeader title={cuurentAgency.name} />
                <PageContent>
                    <SlideUp key={location.pathname}>
                        {this.props.children}
                    </SlideUp>
                </PageContent>
                <PageFooter />
            </PageWrapper>
        );
    }
}