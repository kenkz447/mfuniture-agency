import {
    FurnitureMaterial,
    furnitureMaterialResources,
    request
} from '@/restful';

export const deleteExternalMaterial = (material: FurnitureMaterial) => {
    return request(
        furnitureMaterialResources.delete,
        {
            type: 'path',
            parameter: 'id',
            value: material.id
        }
    );
}