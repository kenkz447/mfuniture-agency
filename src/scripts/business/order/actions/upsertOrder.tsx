import { DomainContext } from '@/domain';
import { Order, orderResources, request } from '@/restful';
import { genCodeWithCurrentDate } from '@/utilities';

import {
    getOrderDeposit,
    getOrderShippingDate,
    isOrderHasExternalMaterials
} from '../getters';

export const upsertOrder = (order: Partial<Order>, context: DomainContext) => {
    if (!order.orderDetails) {
        throw 'Không có sản phẩm nào!';
    }

    const orderExisting = !!order.id;
    if (orderExisting) {
        return request(orderResources.update, {
            type: 'body',
            value: order
        });
    }

    const orderHasExternalMaterials = isOrderHasExternalMaterials(order);

    const shippingDate = getOrderShippingDate();

    return request(orderResources.create, {
        type: 'body',
        value: {
            ...order,
            code: genCodeWithCurrentDate('HD'),
            depositRequired: getOrderDeposit(order),
            totalProduct: order.orderDetails.reduce(
                (total, detail) => total + detail.quantity,
                0
            ),
            shippingDate: orderHasExternalMaterials
                ? null
                : shippingDate.toISOString(),
            status: 'new',
            hasExternalMaterials: orderHasExternalMaterials
        } as Order
    });
};