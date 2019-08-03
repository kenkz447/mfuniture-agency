import { DiscountByQuantity } from '@/restful';

import {
    getNearestDiscountByQuantityInList
} from './getNearestDiscountByQuantityInList';

export const getDiscountByQuantityValue = (
    discountByQuantities: DiscountByQuantity[] = [],
    quantity: number = 0,
    productPrice: number
) => {
    const entity = getNearestDiscountByQuantityInList(discountByQuantities, quantity);
    if (!entity) {
        return 0;
    }

    if (entity.discountPerProductPercent) {
        return productPrice * entity.discountPerProductPercent * 0.01;
    }
    
    return entity.discountPerProduct || 0;
};