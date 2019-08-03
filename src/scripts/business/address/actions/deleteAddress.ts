import { addressResources, request } from '@/restful';
import { Address } from '@/restful';

export const deleteAddress = (address: Address) => {
    return request(
        addressResources.delete,
        {
            type: 'path',
            parameter: 'id',
            value: address.id!
        }
    );
};