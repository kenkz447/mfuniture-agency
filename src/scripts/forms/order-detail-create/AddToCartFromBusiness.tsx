import * as React from 'react';

import { BusinessController } from '@/business';
import { upsertOrderDetail } from '@/business/order-detail';
import { BaseComponent } from '@/domain';
import { OrderDetail } from '@/restful';

import { AddToCartFormValues } from './add-to-cart-form-control';
import { AddToCartFormControl } from './AddToCartFromControl';

interface AddToCartFromBusinessProps {
    readonly initialValue: AddToCartFormValues;
    readonly onSuccess: () => void;
}

export class AddToCartFromBusiness extends BaseComponent<AddToCartFromBusinessProps> {

    private readonly getAddToCartFormInitValues = (): AddToCartFormValues => {
        const { initialValue } = this.props;

        return {
            ...initialValue,
            status: 'temp',
            quantity: 1
        };
    }

    public render() {
        const { cartOrderDetails, setContext } = this.context;
        const { onSuccess } = this.props;

        const initialValues = this.getAddToCartFormInitValues();
        const disableAddToCart = false;

        return (
            <BusinessController
                action={upsertOrderDetail}
                onSuccess={(orderDetail: OrderDetail) => {
                    setContext({
                        cartOrderDetails: [
                            ...cartOrderDetails,
                            orderDetail
                        ]
                    });

                    onSuccess();
                }}
            >
                {({ doBusiness }) => (
                    <AddToCartFormControl
                        initialValues={initialValues}
                        submitDisabled={disableAddToCart}
                        submit={doBusiness}
                    />
                )}
            </BusinessController>
        );
    }
}