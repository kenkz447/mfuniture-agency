import debounce from 'lodash/debounce';
import { RootContext } from 'qoobee';
import * as React from 'react';
import { WithContextProps } from 'react-context-service';

import { WithDomainContext } from '@/domain';
import { confirm, ConfirmType, showError } from '@/effects';

interface BusinessControllerRenderProps<T, R> {
    readonly doBusiness: (customParams?: T) => Promise<R>;
    readonly loading: boolean;
    readonly context: WithContextProps<WithDomainContext>;
}

export interface BusinessControllerProps<T, R = {}> {
    readonly deboucingTime?: number;
    readonly params?: T;
    readonly needsConfirm?: boolean;
    readonly confirmTitle?: string;
    readonly confirmContent?: string;
    readonly confirmType?: ConfirmType;
    readonly action: (params: T, context: WithContextProps<WithDomainContext>) => Promise<{}>;
    readonly onActionBegin?: (param: T, context: WithContextProps<WithDomainContext>) => void;
    readonly onSuccess?: (result: R, context: WithContextProps<WithDomainContext>) => void;
    readonly onFail?: (error: unknown, context: WithContextProps<WithDomainContext>) => void;
    readonly children: (renderProps: BusinessControllerRenderProps<T, R>) => React.ReactNode;
}

export class BusinessController<T> extends React.PureComponent<BusinessControllerProps<T>> {
    public static readonly contextType = RootContext;
    public readonly context!: WithContextProps<WithDomainContext>;

    public readonly state = {
        loading: false
    };

    constructor(props: BusinessControllerProps<T>) {
        super(props);

        if (props.deboucingTime) {
            this.doBusiness = debounce(this.doBusiness, props.deboucingTime);
        }
    }

    public readonly doBusiness = async (customParams?: T) => {
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
        try {
            let actionResult;

            const params = customParams || this.props.params;
            if (!params) {
                throw new Error('Missing params in action');
            }

            if (onActionBegin) {
                onActionBegin(params, this.context);
            }

            this.setState({
                loading: true
            });

            if (!needsConfirm) {
                actionResult = await action(params, this.context);
            } else {
                const confirmResult = await confirm(confirmTitle, confirmContent, confirmType);
                if (confirmResult) {
                    actionResult = await action(params, this.context);
                }
            }

            if (onSuccess) {
                onSuccess(actionResult, this.context);
            }

            return actionResult;
        } catch (error) {
            if (onFail) {
                onFail(error, this.context);
            }

            if (typeof error === 'string') {
                showError(error);
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

        return children({
            doBusiness: this.doBusiness,
            loading: loading,
            context: this.context
        });
    }
}