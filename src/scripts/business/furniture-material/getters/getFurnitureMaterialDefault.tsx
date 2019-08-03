import {
    furnitureMaterialResources,
    furnitureMaterialResourceType,
    request,
    restfulStore
} from '@/restful';

export const getFurnitureMaterialDefault = async () => {
    const component = restfulStore.findOneRecord(
        furnitureMaterialResourceType,
        (o) => o.code === '999'
    );

    if (component) {
        return component;
    }

    const result = await request(furnitureMaterialResources.find, {
        type: 'query',
        parameter: 'code',
        value: '999'
    });

    return result[0] || null;
};
