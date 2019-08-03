import { agencyResourceType, restfulStore } from '@/restful';

export const getAllAgency = () => {
    return restfulStore.findManyRecords(agencyResourceType, () => true);
};