import { request } from '@/restful';
import { BusinessLicense, businessLicenseResources } from '@/restful';

export const upsertBusinessLiscense = (businessLicense: Partial<BusinessLicense>) => {

    return request(
        businessLicenseResources.create,
        {
            type: 'body',
            value: businessLicense
        }
    );
};