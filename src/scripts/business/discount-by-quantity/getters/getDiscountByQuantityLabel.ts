import { getProductOriginPrice } from '@/business/product';
import { DiscountByQuantity, ProductExtended } from '@/restful';
import { formatCurrency } from '@/utilities';

export const getDiscountByQuantityLabel = (
    discountByQuantity: DiscountByQuantity,
    product: ProductExtended,
    getPrice?: (rawPrice: number) => number
) => {
    const { quantity, discountPerProduct } = discountByQuantity;
    const rawPrice = getProductOriginPrice(product) - (discountPerProduct);
    const absPrice = Math.abs(rawPrice);
    const price = getPrice ?
        getPrice(absPrice) :
        absPrice;

    return `mua ${quantity} - ${formatCurrency(price)}/cái`;
};