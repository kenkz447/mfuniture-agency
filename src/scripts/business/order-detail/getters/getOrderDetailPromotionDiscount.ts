import { OrderDetail } from '@/restful';

export const getOrderDetailPromotionDiscount = (orderDetail: OrderDetail) => {
    if (!orderDetail.productModulesCode) {
        return 0;
    }

    const { productPrice } = orderDetail;
    const { promotion } = orderDetail.storedPromoCode!;

    if (orderDetail.quantity !== promotion.productQuantityOrdering) {
        return 0;
    }

    if (promotion.discountPrice) {
        return promotion.discountPrice * promotion.productQuantityOrdering;
    }

    return productPrice * 0.01 * promotion.discountPercent * promotion.productQuantityOrdering;
};