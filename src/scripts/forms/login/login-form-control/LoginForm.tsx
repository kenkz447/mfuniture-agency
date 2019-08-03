import { FormikProps } from 'formik';
import * as React from 'react';
import {
    Alert,
    Button,
    Card,
    CardTitle,
    Form,
    FormText,
    Input
} from 'reactstrap';

import { AuthLoginRequestBody } from '@/restful';

export type LoginFormValues = Partial<AuthLoginRequestBody>;

export interface LoginFormOwnProps extends FormikProps<LoginFormValues> {

}

export function LoginForm(props: LoginFormOwnProps) {
    const {
        values,
        handleChange,
        handleSubmit,
        isSubmitting,
        status
    } = props;

    return (
        <Card className="card-register">
            {
                (status && status.error) && (
                    <Alert color="danger">{status.error}</Alert>
                )
            }
            <CardTitle tag="h3">Welcome</CardTitle>
            <Form className="register-form" onSubmit={handleSubmit}>
                <label>Email</label>
                <Input
                    className="no-border"
                    placeholder="Email"
                    type="email"
                    value={values.identifier}
                    onChange={handleChange}
                    name={nameof<LoginFormValues>(o => o.identifier)}
                />
                <label>Mật khẩu</label>
                <Input
                    className="no-border"
                    placeholder="Password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    name={nameof<LoginFormValues>(o => o.password)}
                />
                <Button
                    block={true}
                    disabled={isSubmitting}
                    className="btn-round"
                    color="danger"
                >
                    Đăng nhập
                </Button>
            </Form>
        </Card>
    );
}