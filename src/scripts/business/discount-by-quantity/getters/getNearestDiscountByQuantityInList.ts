import sortBy from 'lodash/sortBy';

import { DiscountByQuantity } from '@/restful';

export const getNearestDiscountByQuantityInList = (
    discountByQuantities: DiscountByQuantity[],
    quantity: number
) => {
    if (!discountByQuantities.length) {
        return null;
    }
    const entity = discountByQuantities.find(o => o.quantity === quantity);
    if (!entity) {
        const sortedDiscountByQuantities =
            sortBy(discountByQuantities, nameof<DiscountByQuantity>(o => o.quantity))
                .reverse();

        for (const discountByQuantity of sortedDiscountByQuantities) {
            if (
                quantity > discountByQuantity.quantity ||
                quantity === discountByQuantity.quantity
            ) {
                return discountByQuantity;
            }
        }
        return null;
    }
    return entity;
};