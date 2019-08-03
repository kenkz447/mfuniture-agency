import { Order, orderResources, request } from '@/restful';

export const changeOrderDeliveryDate = (order: Partial<Order>) => {
    return request(
        orderResources.update,
        [{
            type: 'path',
            parameter: 'field',
            value: nameof<Order>(o => o.shippingDate)
        }, {
            type: 'body',
            value: order
        }]
    );
};