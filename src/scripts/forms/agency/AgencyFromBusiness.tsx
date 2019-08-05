import * as React from 'react';

import { BusinessController } from '@/business';
import { upsertAgency } from '@/business/agency';
import { BaseComponent } from '@/domain';
import { Agency } from '@/restful';

import { AgencyFormValues } from './agency-form-control';
import { AgencyFormControl } from './AgencyFromControl';

interface AgencyFromBusinessProps {
    readonly initialValues: AgencyFormValues;
    readonly onSuccess?: (updatedAgency: Agency) => void;
}

export class AgencyFromBusiness extends BaseComponent<AgencyFromBusinessProps> {

    public render() {
        const { onSuccess, initialValues } = this.props;

        return (
            <BusinessController
                action={upsertAgency}
                onSuccess={(updatedAgency: Agency) => {
                    if (onSuccess) {
                        onSuccess(updatedAgency);
                    }
                }}
            >
                {({ doBusiness }) => (
                    <AgencyFormControl
                        initialValues={initialValues}
                        submit={doBusiness}
                    />
                )}
            </BusinessController>
        );
    }
}