import {
    OrderTransaction,
    orderTransactionResources,
    request
} from '@/restful';

export const rejectOrderTransaction = (
    orderTransaction: Partial<OrderTransaction>
) => {
    return request(
        orderTransactionResources.reject,
        {
            type: 'body',
            value: orderTransaction
        }
    );
};