import * as React from 'react';

import { PageWrapper } from '@/components';
import { BaseComponent } from '@/domain';

interface BlankLayoutProps {
}

interface BlankLayoutState {
    readonly siderCollapsed: boolean;
}

export class BlankLayout extends BaseComponent<BlankLayoutProps, BlankLayoutState> {
    constructor(props: BlankLayoutProps) {
        super(props);
    }

    public render() {
        return (
            <PageWrapper>
                {this.props.children}
            </PageWrapper>
        );
    }
}