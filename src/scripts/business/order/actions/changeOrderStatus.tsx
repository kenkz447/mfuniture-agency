import { Order, orderResources, request } from '@/restful';

export const changeOrderStatus = (order: Partial<Order>) => {
    return request(
        orderResources.updateStatus,
        [{
            type: 'path',
            parameter: 'id',
            value: order.id!
        }, {
            type: 'path',
            parameter: 'status',
            value: order.status!
        }]
    );
};