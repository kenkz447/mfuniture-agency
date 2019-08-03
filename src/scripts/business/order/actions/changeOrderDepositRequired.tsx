import { Order, orderResources, request } from '@/restful';

export const changeOrderDepositRequired = (order: Partial<Order>) => {
    return request(
        orderResources.update,
        [{
            type: 'path',
            parameter: 'field',
            value: nameof<Order>(o => o.depositRequired)
        }, {
            type: 'body',
            value: order
        }]
    );
};