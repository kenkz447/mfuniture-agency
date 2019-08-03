import moment from 'moment';

export const getOrderShippingDate = (options: {
    readonly inventoryProduct?: boolean
} = {}) => {
    const shippingDateMoment = moment();

    const initDayCount = options.inventoryProduct ? 2 : 14;

    shippingDateMoment.add(initDayCount, 'days');
    const targetDay = shippingDateMoment.day();
    if (targetDay === 0) {
        shippingDateMoment.add(1, 'day');
    } else if (targetDay === 6) {
        shippingDateMoment.add(2, 'days');
    }

    return shippingDateMoment.toDate();
};