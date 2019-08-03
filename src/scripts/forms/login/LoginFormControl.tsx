import { Formik, FormikBag } from 'formik';
import * as React from 'react';

import { BaseComponent } from '@/domain';
import { text } from '@/i18n';

import {
    LoginForm,
    LoginFormOwnProps,
    LoginFormValues
} from './login-form-control';

export class LoginFormControl extends BaseComponent {
    public render() {
        return (
            <Formik<LoginFormValues>
                initialValues={{}}
                onSubmit={this.onSubmit}
            >
                {LoginForm}
            </Formik>
        );
    }

    public readonly onSubmit = async (
        values: LoginFormValues,
        formiKBag: FormikBag<LoginFormOwnProps, LoginFormValues>
    ) => {
        const { authClient } = this.context;

        try {
            await authClient.login(values);
        } catch (error) {
            formiKBag.setStatus({
                error: text(error.message)
            });
        } finally {
            formiKBag.setSubmitting(false);
        }
    }
}