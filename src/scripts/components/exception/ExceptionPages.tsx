import { ErrorPageProps } from 'qoobee';
import React from 'react';

import { PageContent, PageWrapper } from '../structures';

export const PermissionDenyPage = () => {
    return (
        <PageWrapper>
            <PageContent>
                <h1>403</h1>
            </PageContent>
        </PageWrapper>
    );
};

export const NotFoundPage = () => {
    return (
        <PageWrapper>
            <PageContent>
                <h1>404</h1>
            </PageContent>
        </PageWrapper>
    );
};

export function ErrorPage(props: ErrorPageProps) {
    return (
        <PageWrapper>
            <PageContent>
                <h1>500</h1>
            </PageContent>
        </PageWrapper>
    );
}