import { request, UploadedFile, uploadedResources } from '@/restful';

export const deleteUploadedFile = (file: Partial<UploadedFile>) => {
    return request(
        uploadedResources.delete, { type: 'path', parameter: 'id', value: file.id! });
};