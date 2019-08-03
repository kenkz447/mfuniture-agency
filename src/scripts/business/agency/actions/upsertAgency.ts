import { request } from '@/restful';
import { Agency, agencyResources } from '@/restful';

export const upsertAgency = (agency: Partial<Agency>) => {
    if (agency.id) {
        return request(
            agencyResources.update,
            {
                type: 'body',
                value: agency
            }
        );
    }

    return request(
        agencyResources.create,
        {
            type: 'body',
            value: agency
        }
    );
};