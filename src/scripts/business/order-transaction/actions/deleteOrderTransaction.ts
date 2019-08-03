import {
    OrderTransaction,
    orderTransactionResources,
    request
} from '@/restful';

export const deleteOrderTransaction = (
    orderTransaction: Partial<OrderTransaction>
) => {
    return request(orderTransactionResources.delete, {
        type: 'path',
        parameter: 'id',
        value: orderTransaction.id!
    });
};