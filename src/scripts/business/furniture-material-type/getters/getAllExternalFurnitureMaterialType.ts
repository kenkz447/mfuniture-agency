import { furnitureMaterialTypeResourceType, restfulStore } from '@/restful';

export const getAllExternalFurnitureMaterialType = () => {
    return restfulStore.findManyRecords(
        furnitureMaterialTypeResourceType,
        (o) => !!o.isExternal
    );
};