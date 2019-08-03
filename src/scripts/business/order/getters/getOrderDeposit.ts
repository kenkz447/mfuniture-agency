import { Order } from '@/restful';

export const getOrderDeposit = (order: Partial<Order>) => {
    if (!order.totalOfPayment) {
        return 0;
    }

    return order.totalOfPayment * 0.5;
};