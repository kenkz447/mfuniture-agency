import {
    furnitureComponentResources,
    furnitureComponentResourceType,
    request,
    restfulStore
} from '@/restful';

export const getFurnitureComponentById = async (id: string) => {
    const component = restfulStore.findOneRecord(
        furnitureComponentResourceType,
        (o) => o.id === id
    );

    if (component) {
        return component;
    }

    const result = await request(furnitureComponentResources.findOne, {
        type: 'path',
        parameter: 'id',
        value: id
    });

    return result;
};