import { Order } from '@/restful';

export const isOrderHasExternalMaterials = (order: Partial<Order>) => {
    const { orderDetails } = order;
    if (!orderDetails) {
        return false;
    }
    
    for (const orderDetail of orderDetails) {
        for (const orderDetailMaterialNorm of orderDetail.orderDetailMaterialNorms) {
            if (orderDetailMaterialNorm.isExternal) {
                return true;
            }
        }
    }

    return false;
};