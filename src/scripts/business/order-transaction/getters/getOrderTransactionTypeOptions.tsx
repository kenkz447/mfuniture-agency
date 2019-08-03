import { OrderTransaction } from '@/restful';

export const getOrderTransactionTypeOptions = (): Array<{
    readonly value: OrderTransaction['type'];
    readonly title: string;
}> => {
    return [{
        value: 'deposit',
        title: 'Đặt cọc'
    }, {
        value: 'payment',
        title: 'Thanh toán'
    }, {
        value: 'refund',
        title: 'Hoàn tiền'
    }];
};