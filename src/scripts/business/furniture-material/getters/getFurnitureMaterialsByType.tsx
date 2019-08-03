import {
    FurnitureMaterial,
    furnitureMaterialResources,
    FurnitureMaterialType,
    request
} from '@/restful';

export const getFurnitureMaterialByType = async (
    furnitureMaterialType: FurnitureMaterialType | string
) => {
    const result = await request(furnitureMaterialResources.find, {
        type: 'query',
        parameter: nameof<FurnitureMaterial>(o => o.materialType),
        value: typeof furnitureMaterialType === 'string' ?
            furnitureMaterialType :
            furnitureMaterialType.id
    });

    return result;
};