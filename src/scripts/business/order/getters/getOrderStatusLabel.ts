import { Order } from '@/restful';

import { getAllOrderStatus } from './getAllStatus';

export const getOrderStatusLabel = (order: Partial<Order>) => {
    if (!order || !order.status) {
        return null;
    }

    const allStatus = getAllOrderStatus();
    const status = allStatus.find(o => o.value === order.status);
    if (!status) {
        return null;
    }

    return status.title;
};