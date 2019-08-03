import {
    furnitureMaterialResources,
    furnitureMaterialResourceType,
    request,
    restfulStore
} from '@/restful';

export const getFurnitureMaterialByCode = async (code: string) => {
    const component = restfulStore.findOneRecord(
        furnitureMaterialResourceType,
        (o) => o.code === code
    );

    if (component) {
        return component;
    }
    const result = await request(furnitureMaterialResources.find, {
        type: 'query',
        parameter: 'code',
        value: code
    });

    return result[0] || null;
};
