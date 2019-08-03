import {
    FurnitureComponentGroup,
    furnitureComponentGroupResources,
    request
} from '@/restful';

export const getFurnitureComponentGroupById = async (
    furnitureComponentGroup: FurnitureComponentGroup | string | undefined
) => {
    
    if (!furnitureComponentGroup) {
        return null;
    }

    const result = await request(furnitureComponentGroupResources.findById, {
        type: 'path',
        parameter: 'id',
        value: typeof furnitureComponentGroup === 'string' ?
            furnitureComponentGroup :
            furnitureComponentGroup.id
    });

    return result;
};