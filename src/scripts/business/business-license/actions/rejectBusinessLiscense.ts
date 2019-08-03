import { request } from '@/restful';
import { BusinessLicense, businessLicenseResources } from '@/restful';

export const rejectBusinessLiscense = (businessLicense: Partial<BusinessLicense>) => {

    return request(
        businessLicenseResources.changeStatus, [
            {
                type: 'path',
                parameter: 'id',
                value: businessLicense.id! || businessLicense['_id']
            },
            {
                type: 'path',
                parameter: 'status',
                value: 'rejected'
            },
            {
                type: 'body',
                value: businessLicense
            }
        ]
    );
};