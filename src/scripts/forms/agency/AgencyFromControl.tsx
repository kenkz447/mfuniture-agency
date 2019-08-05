import { Formik } from 'formik';
import * as React from 'react';

import { FormikControlBase, FormikControlBaseProps } from '@/components';

import { AgencyForm, AgencyFormValues } from './agency-form-control';

interface AgencyFormControlProps extends FormikControlBaseProps<AgencyFormValues> {
    readonly initialValues?: AgencyFormValues;
}

interface AgencyFormControlState {
    readonly loaded: boolean;
}

export class AgencyFormControl extends FormikControlBase<
    AgencyFormValues,
    AgencyFormControlProps,
    AgencyFormControlState> {

    constructor(props: AgencyFormControlProps) {
        super(props);

        this.state = {
            loaded: false
        };
    }

    private readonly fetchResources = async () => {
        this.setState({
            loaded: true
        });
    }

    public componentDidMount() {
        this.fetchResources();
    }

    public render() {
        const { loaded } = this.state;

        if (!loaded) {
            return null;
        }

        const { initialValues } = this.props;

        return (
            <Formik
                ref={this.formInstance}
                initialValues={initialValues!}
                onSubmit={this.onSubmit}
                enableReinitialize={true}
            >
                {(formProps) => (
                    <AgencyForm
                        {...formProps}
                    />
                )}
            </Formik>
        );
    }
}