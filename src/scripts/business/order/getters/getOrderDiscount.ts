import {
    getOrderDetailsDiscount,
    getOrderDetailsSubTotal
} from '@/business/order-detail';
import { Order } from '@/restful';

export const getOrderDiscount = (order: Partial<Order>, subTotal?: number) => {
    const {
        orderDetails,
        agencyOrderer,
        promotion
    } = order;

    if (!subTotal) {
        subTotal = getOrderDetailsSubTotal(orderDetails);
    }

    let promotionDiscount = 0;

    if (promotion) {
        if (promotion.forSpecificProduct) {
            if (orderDetails) {
                const targetOrderDetail = orderDetails.find(o => o.productModulesCode === promotion.forSpecificProduct);
                if (targetOrderDetail) {
                    promotionDiscount = promotion.discountPrice
                    || targetOrderDetail.totalPrice * (promotion.discountPercent * 0.01);
                }
            }
        } else {
            promotionDiscount =
                promotion.discountPrice
                || subTotal * (promotion.discountPercent * 0.01);
        }
    }

    const productDiscount = getOrderDetailsDiscount(orderDetails);

    const agencyDiscount = (subTotal - promotionDiscount - productDiscount) * (agencyOrderer ? (agencyOrderer.level.discountPercent * 0.01) : 0);

    const totalDiscount = promotionDiscount + productDiscount + agencyDiscount;

    return {
        promotion: promotionDiscount,
        agency: {
            discount: agencyDiscount,
            percent: agencyOrderer ? agencyOrderer!.level.discountPercent : 0,
            name: agencyOrderer ? agencyOrderer!.level.name : 'Khách lẻ'
        },
        products: productDiscount,
        total: totalDiscount
    };
};