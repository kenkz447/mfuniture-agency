import { OrderDetail } from '@/restful';

export const getOrderDetailsQuantity = (orderDetails: OrderDetail[]) => {
    return orderDetails.reduce(
        (currentValue, orderDetail) => {
            const nextValue = currentValue += orderDetail.quantity;
            return nextValue;
        },
        0
    );
};