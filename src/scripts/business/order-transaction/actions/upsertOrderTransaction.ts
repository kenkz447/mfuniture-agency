import {
    OrderTransaction,
    orderTransactionResources,
    request
} from '@/restful';
import { genCodeWithCurrentDate } from '@/utilities';

export const upsertOrderTransaction = (
    orderTransaction: Partial<OrderTransaction>
) => {
    const orderTransactionExisting = !!orderTransaction.id;
    if (orderTransactionExisting) {
        return request(
            orderTransactionResources.update,
            {
                type: 'body',
                value: orderTransaction
            }
        );
    }

    return request(orderTransactionResources.create, {
        type: 'body',
        value: {
            ...orderTransaction,
            code: genCodeWithCurrentDate()
        }
    });
};