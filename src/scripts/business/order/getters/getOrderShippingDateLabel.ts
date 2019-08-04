import { defaultDateFormat } from '@/configs';
import { Order } from '@/restful';
import { formatDate } from '@/utilities';

export const getOrderShippingDateLabel = (order: Order) => {
    if (order.hasExternalMaterials && !order.allExternalMaterialsProvided) {
        return '15 ngày sau khi nhận đủ vật liệu';
    }

    if (!order.shippingDate) {
        return 'Chưa xác định';
    }

    return formatDate(order.shippingDate, defaultDateFormat);
};