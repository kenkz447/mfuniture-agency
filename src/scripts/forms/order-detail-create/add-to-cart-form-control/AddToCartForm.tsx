import { FormikProps } from 'formik';
import * as React from 'react';
import { Button, Form } from 'reactstrap';

import { OrderDetail } from '@/restful';

export type AddToCartFormValues = Partial<OrderDetail>;

export interface AddToCartFormProps extends FormikProps<AddToCartFormValues> {
}

interface AddToCartFormForm {
}

export class AddToCartForm extends React.PureComponent<
    AddToCartFormProps,
    AddToCartFormForm
    > {

    constructor(props: AddToCartFormProps) {
        super(props);

        this.state = {
        };
    }

    private readonly onQuantityChange = () => {
        // *
    }

    public componentDidUpdate(prevProps: AddToCartFormProps) {
        if (this.props.values.quantity !== prevProps.values.quantity) {
            this.onQuantityChange();
        }
    }

    public render() {
        const {
            handleSubmit,
            setFieldValue,
            values
        } = this.props;

        const currentQuantity = (values.quantity || 0);

        return (
            <Form onSubmit={handleSubmit}>
                <Button
                    color="danger"
                    className="btn-just-icon btn-border mr-2"
                    outline={true}
                    onClick={() => {
                        if (currentQuantity < 1) {
                            return;
                        }

                        setFieldValue(
                            nameof<AddToCartFormValues>(o => o.quantity),
                            currentQuantity - 1
                        );
                    }}
                >
                    -
                </Button>

                <strong className="d-inline-block text-center mr-2" style={{width: 25}}>
                    {values.quantity}
                </strong>

                <Button
                    color="danger"
                    className="btn-just-icon btn-border mr-4"
                    outline={true}
                    onClick={() => {
                        setFieldValue(
                            nameof<AddToCartFormValues>(o => o.quantity),
                            currentQuantity + 1
                        );
                    }}
                >
                    +
                </Button>

                <Button
                    type="submit"
                    className="btn-round"
                    color="danger"
                >
                    Thêm vào giỏ
                </Button>
            </Form>
        );
    }
}