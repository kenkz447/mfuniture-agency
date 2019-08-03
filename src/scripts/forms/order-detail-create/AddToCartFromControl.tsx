import { Formik } from 'formik';
import * as React from 'react';

import { getUploadedFileSrc } from '@/business/uploaded-file';
import { FormikControlBase, FormikControlBaseProps } from '@/components';
import { ProductExtended } from '@/restful';

import { AddToCartForm, AddToCartFormValues } from './add-to-cart-form-control';

interface AddToCartFormControlProps extends FormikControlBaseProps<AddToCartFormValues> {
    readonly initialValues?: AddToCartFormValues;
    readonly submitDisabled: boolean;
}

interface AddToCartFormControlState {
    readonly loaded: boolean;
}

export class AddToCartFormControl extends FormikControlBase<
    AddToCartFormValues,
    AddToCartFormControlProps,
    AddToCartFormControlState> {

    constructor(props: AddToCartFormControlProps) {
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

    public readonly beforeSubmit = async (
        values: AddToCartFormValues
    ): Promise<AddToCartFormValues> => {
        const { initialValues } = this.props;

        return {
            ...values,
            totalPrice: values.subTotalPrice,
            previewImg: initialValues!.previewImg
        };
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
                    <AddToCartForm
                        {...formProps}
                    />
                )}
            </Formik>
        );
    }
}