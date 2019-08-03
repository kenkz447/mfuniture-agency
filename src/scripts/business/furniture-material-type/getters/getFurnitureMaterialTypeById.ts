import {
    furnitureMaterialTypeResources,
    furnitureMaterialTypeResourceType,
    request,
    restfulStore
} from '@/restful';

export const getFurnitureMaterialTypeById = async (id: string) => {
    const component = restfulStore.findOneRecord(
        furnitureMaterialTypeResourceType,
        (o) => o.id === id
    );

    if (component) {
        return component;
    }
    const result = await request(furnitureMaterialTypeResources.find, {
        type: 'path',
        parameter: 'id',
        value: id
    });

    return result[0] || null;
};
