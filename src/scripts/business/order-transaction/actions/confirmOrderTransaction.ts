import {
    OrderTransaction,
    orderTransactionResources,
    request
} from '@/restful';

export const confirmOrderTransaction = (
    orderTransaction: Partial<OrderTransaction>
) => {
    return request(
        orderTransactionResources.confirm,
        {
            type: 'body',
            value: orderTransaction
        }
    );
};