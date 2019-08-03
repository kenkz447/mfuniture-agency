import {
    BreakpointDetector,
    ErrorLogger,
    I18NLoader,
    render,
    RootProps
} from 'qoobee';
import * as React from 'react';

import * as Sentry from '@sentry/browser';

import { ErrorPage } from './components';
import { defaultLanguage } from './configs';
import {
    Authentication,
    ContextFetcher,
    GlobalModal,
    Notifications,
    policies
} from './domain';
import { showAction } from './effects';
import { RouterRoot } from './routes';

const AppContent = () => (
    <ErrorLogger
        ErrorPage={ErrorPage}
        setup={() => {
            Sentry.init({
                dsn: SENTRY_ID,
                environment: SUB_ENV
            });
            Sentry.configureScope((scope) => {
                scope.setExtra('versionHash', VERSION_HASH);
            });
        }}
        onError={({ error, errorInfo }) => {
            if (!error) {
                return null;
            }

            Sentry.withScope(scope => {
                if (errorInfo) {
                    Object.keys(errorInfo).forEach(key => {
                        scope.setExtra(key, errorInfo[key]);
                    });
                }
                Sentry.captureException(error);
            });
        }}
    >

        <Notifications />

        <BreakpointDetector />
        <I18NLoader>
            <Authentication>
                <ContextFetcher>
                    <RouterRoot />
                </ContextFetcher>
            </Authentication>
        </I18NLoader>
        <GlobalModal />
    </ErrorLogger>
);

const rootProps: RootProps = {
    AppContent: AppContent,
    initialContext: {
        policies: policies,
        currentLanguage: localStorage.getItem('lang') || defaultLanguage
    },
    SWRegistrationProps:
        process.env.NODE_ENV === 'production'
            ? {
                onUpdateFound: function () {
                    const sw = this.installing!;
                    sw.onstatechange = () => {
                        if (
                            sw.state !== 'installed' ||
                            !navigator.serviceWorker.controller
                        ) {
                            return;
                        }

                        showAction({
                            message: 'Nội dung mới khả dụng, tải lại trang để cập nhật phiên bản mới nhất?',
                            actionLabel: 'Tải lại trang',
                            onClick: () => location.reload(true)
                        });
                    };
                }
            }
            : undefined
};

export const startup = (rootElement: HTMLElement | null) => {
    if (!rootElement) {
        return null;
    }

    render(rootElement, rootProps);
};