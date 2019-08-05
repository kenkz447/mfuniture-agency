import { Resource, ResourceType } from 'react-restful';
import * as yup from 'yup';

import { UploadedFile, uploadedFileSchema } from './uploadedFile';
import { User } from './user';

export interface BusinessLicense {
    readonly id: string;
    readonly created_by?: User;
    readonly companyName: string;
    readonly companyAddress: string;
    readonly businessAreas: string;
    readonly businessLicense: UploadedFile | null;
    readonly isBusiness: boolean;
    readonly status?: 'pending' | 'accepted' | 'rejected';
}

export const businessLicenseSchema = yup.object().shape<BusinessLicense>({
    id: yup.string(),
    companyName: yup.string(),
    companyAddress: yup.string(),
    businessAreas: yup.string(),
    businessLicense: uploadedFileSchema.nullable().default(null),
    isBusiness: yup.boolean().required()
});

export const businessLicenseResourceType = new ResourceType<BusinessLicense>(nameof<BusinessLicense>());

export const businessLicenseResources = {
    find: new Resource<BusinessLicense, BusinessLicense[]>({
        resourceType: businessLicenseResourceType,
        method: 'GET',
        url: '/businessLicenses'
    }),
    findOne: new Resource<BusinessLicense>({
        resourceType: businessLicenseResourceType,
        method: 'GET',
        url: '/businessLicenses/:id'
    }),
    create: new Resource<BusinessLicense>({
        resourceType: businessLicenseResourceType,
        method: 'POST',
        url: '/businessLicenses',
        bodySchema: businessLicenseSchema
    }),
    changeStatus: new Resource<BusinessLicense>({
        resourceType: businessLicenseResourceType,
        method: 'PUT',
        url: '/businessLicenses/status/:id/:status'
    })
};