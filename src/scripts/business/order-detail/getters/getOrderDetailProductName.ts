import { getIn } from 'formik';

import { OrderDetail } from '@/restful';

export const getOrderDetailProductName = (orderDetail: OrderDetail) => {
    if (orderDetail.catalog) {
        return getIn(orderDetail.catalog, 'name');
    }

    return getIn(orderDetail.product_type, 'name');
};