import { getProductModulesPrice } from '@/business/product-modules';
import { ProductExtended } from '@/restful';

export const getProductOriginPrice = (product: ProductExtended) => {
    if (product.totalPrice) {
        return product.totalPrice;
    }

    return getProductModulesPrice({
        productModules: product.modules,
        startPrice: 0
    });
};