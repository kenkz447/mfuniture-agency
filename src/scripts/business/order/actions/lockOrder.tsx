import { Order, orderResources, request } from '@/restful';

export const lockOrder = (order: Partial<Order>) => {
    return request(
        orderResources.lock,
        [{
            type: 'path',
            parameter: 'id',
            value: order
        }]
    );
};