import uniq from 'lodash/uniq';

import {
    FurnitureMaterial,
    furnitureMaterialResources,
    FurnitureMaterialType,
    request
} from '@/restful';

export const getFurnitureMaterialsByTypes = async (
    furnitureMaterialTypes: FurnitureMaterialType[]
) => {

    let furnitureMaterialTypeIds = furnitureMaterialTypes.map(o => o.id);

    const result = await request(furnitureMaterialResources.find, {
        type: 'query',
        parameter: nameof<FurnitureMaterial>(o => o.materialType) + '_in',
        value: uniq(furnitureMaterialTypeIds)
    });

    return result;
};
