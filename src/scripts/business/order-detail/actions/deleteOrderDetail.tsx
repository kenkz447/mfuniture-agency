import { OrderDetail, orderDetailResources, request } from '@/restful';

export const deleteOrderDetail = (orderDetail: Partial<OrderDetail>) => {
    return request(orderDetailResources.delete, {
        type: 'path',
        parameter: 'id',
        value: orderDetail.id!
    });
};