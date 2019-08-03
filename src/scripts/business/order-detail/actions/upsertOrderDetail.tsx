import { OrderDetail, orderDetailResources, request } from '@/restful';
import { genCodeWithCurrentDate } from '@/utilities';

export const upsertOrderDetail = (orderDetail: Partial<OrderDetail>) => {
    const orderExisting = !!orderDetail.id;
    if (orderExisting) {
        return request(orderDetailResources.update, {
            type: 'body',
            value: orderDetail
        });
    }

    return request(orderDetailResources.create, {
        type: 'body',
        value: {
            ...orderDetail,
            code: genCodeWithCurrentDate()
        }
    });
};