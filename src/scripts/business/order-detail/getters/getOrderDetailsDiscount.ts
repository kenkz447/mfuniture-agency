import { OrderDetail } from '@/restful';

export const getOrderDetailsDiscount = (orderDetails: OrderDetail[] = []) => {
    return orderDetails.reduce(
        (currentValue, orderDetail) => {
            return currentValue + orderDetail.discount;
        },
        0
    );
};