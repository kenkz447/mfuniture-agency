import { RootContext } from 'qoobee';
import * as React from 'react';
import { WithContextProps } from 'react-context-service';

import { WithDomainContext } from '@/domain';
import { confirm, ConfirmType } from '@/effects';
import { showWarning } from '@/effects/Notification';

export interface BusinessControllerProps<T, R = {}> {
    readonly params?: T;
    // tslint:disable-next-line:no-any
    readonly action: (params: T, context: WithContextProps<WithDomainContext>) => Promise<any>;
    readonly children: (
        doBusiness: (customParams?: T) => Promise<R>,
        loading: boolean,
        context: WithContextProps<WithDomainContext>
    ) => React.ReactNode;
    readonly needsConfirm?: boolean;
    readonly confirmTitle?: string;
    readonly confirmContent?: string;
    readonly confirmType?: ConfirmType;
    readonly onActionBegin?: (param: T, context: WithContextProps<WithDomainContext>) => void;
    readonly onSuccess?: (result: R, context: WithContextProps<WithDomainContext>) => void;
    readonly onFail?: (error: unknown, context: WithContextProps<WithDomainContext>) => void;
}

export class BusinessController<T> extends React.PureComponent<BusinessControllerProps<T>> {
    public static readonly contextType = RootContext;
    public readonly context!: WithContextProps<WithDomainContext>;

    public readonly state = {
        loading: false
    };

    private readonly doBusiness = async (customParams?: T) => {
        const {
            action,
            needsConfirm,
            confirmTitle,
            confirmContent,
            confirmType,
            onActionBegin,
            onSuccess,
            onFail
        } = this.props;

        if (this.state.loading) {
            return;
        }

        try {
            let actionResult;
            const params = customParams || this.props.params;
            if (!params) {
                throw new Error('Missing params in action');
            }

            this.setState({
                loading: true
            });

            if (onActionBegin) {
                onActionBegin(params, this.context);
            }

            if (!needsConfirm) {
                actionResult = await action(params, this.context);
            } else {
                const confirmResult = await confirm(confirmTitle, confirmContent, confirmType);
                if (confirmResult) {
                    actionResult = await action(params, this.context);
                }
            }

            if (actionResult && onSuccess) {
                onSuccess(actionResult, this.context);
            }

            return actionResult;
        } catch (error) {
            if (onFail) {
                onFail(error, this.context);
            }

            if (typeof error === 'string') {
                showWarning(error);
            }

            throw error;
        } finally {
            this.setState({
                loading: false
            });
        }
    }

    public render() {
        const { children } = this.props;
        const { loading } = this.state;

        return children(this.doBusiness, loading, this.context);
    }
}