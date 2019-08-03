import { Address, addressResources, request } from '@/restful';

export const upsertAddress = (address: Partial<Address>) => {
    if (address.id) {
        return request(
            addressResources.update,
            {
                type: 'body',
                value: address
            }
        );
    }

    return request(
        addressResources.create,
        {
            type: 'body',
            value: address
        }
    );
};