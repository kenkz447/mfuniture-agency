import * as React from 'react';

import { BusinessController } from '@/business';
import { upsertOrderDetail } from '@/business/order-detail';
import { BaseComponent } from '@/domain';
import { OrderDetail } from '@/restful';

import { AddToCartFormValues } from './add-to-cart-form-control';
import { AddToCartFormControl } from './AddToCartFromControl';

interface AddToCartFromBusinessProps {
    readonly initialValue: AddToCartFormValues;
    readonly modulesCode: string;
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
        const initialValues = this.getAddToCartFormInitValues();
        const disableAddToCart = false;

        return (
            <BusinessController
                action={upsertOrderDetail}
                onSuccess={(orderDetail: OrderDetail) => {
                    if (!orderDetail.storedPromoCode) {
                        return;
                    }
                }}
            >
                {(doBusiness) => (
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