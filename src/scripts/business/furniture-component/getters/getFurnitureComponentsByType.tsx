import {
    FurnitureComponent,
    furnitureComponentResources,
    FurnitureComponentType,
    request
} from '@/restful';

export const getFurnitureComponentsByType = async (furnitureComponentType: FurnitureComponentType | string) => {
    const result = await request(furnitureComponentResources.find, {
        type: 'query',
        parameter: nameof<FurnitureComponent>(o => o.componentType),
        value: typeof furnitureComponentType === 'string' ?
            furnitureComponentType :
            furnitureComponentType.id
    });

    return result;
};
