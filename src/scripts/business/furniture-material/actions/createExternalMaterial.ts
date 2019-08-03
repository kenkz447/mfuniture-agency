import {
    FurnitureMaterial,
    furnitureMaterialResources,
    request
} from '@/restful';

export const createExternalMaterial = (businessLicense: Partial<FurnitureMaterial>) => {
    return request(
        furnitureMaterialResources.createExternal,
        {
            type: 'body',
            value: businessLicense
        }
    );
};