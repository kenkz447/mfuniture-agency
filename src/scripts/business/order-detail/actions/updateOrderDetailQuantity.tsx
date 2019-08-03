import { OrderDetail, orderDetailResources, request } from '@/restful';

export const updateOrderDetailQuantity = (orderDetail: Partial<OrderDetail>) => {
    return request(orderDetailResources.updateQuantity, {
        type: 'body',
        value: orderDetail
    });
};