import { Order, orderResources, request } from '@/restful';

export const changeOrderExternalMaterialsStatus = (order: Partial<Order>) => {
    return request(
        orderResources.update,
        [{
            type: 'path',
            parameter: 'field',
            value: nameof<Order>(o => o.allExternalMaterialsProvided)
        }, {
            type: 'body',
            value: {
                ...order,
                allExternalMaterialsProvided: true
            }
        }]
    );
};