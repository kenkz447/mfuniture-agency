import { Formik, FormikBag, isPromise } from 'formik';
import * as React from 'react';

import { BaseComponent } from '@/domain';
import { text } from '@/i18n';

export interface FormikControlBaseProps<V> {
    readonly initialValues?: V;
    readonly submit: (formValue: V) => Promise<{}>;
}

export class FormikControlBase<V, P extends FormikControlBaseProps<V>, S = {}> extends BaseComponent<P, S> {

    public static readonly defaultProps = {
        initialValues: {}
    };
    public readonly formInstance = React.createRef<Formik<V>>();

    public readonly beforeSubmit!: (values: V, formiKBag: FormikBag<P, V>) => Promise<V>;

    public listToOptions<T>(
        list: Array<T>,
        titleKey?: keyof T,
        valueKey?: keyof T
    ) {
        const titleKeyStr = String(titleKey || 'name');
        const valueKeyStr = String(valueKey || 'id');
        
        return list.map((o) => ({
            title: o[titleKeyStr],
            value: o[valueKeyStr]
        }));
    }

    public readonly onSubmit = async (
        values: V,
        formiKBag: FormikBag<P, V>
    ) => {
        const { submit } = this.props;
        try {
            let requestBody = values;
            if (this.beforeSubmit) {
                requestBody = await this.beforeSubmit(values, formiKBag);
            }

            await submit(requestBody);
        } catch (error) {
            if (error.message === 'SchemaError') {
                // tslint:disable-next-line:no-any
                return void formiKBag.setErrors(error.errors as any);
            }

            if (isPromise(error)) {
                error.then(result => {
                    formiKBag.setStatus({
                        error: result
                    });
                });

                return;
            }

            formiKBag.setStatus({
                error: text(error ? error.message : 'Unknow error!')
            });

        } finally {
            formiKBag.setSubmitting(false);
        }
    }
}