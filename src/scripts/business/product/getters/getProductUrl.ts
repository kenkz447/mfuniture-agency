import { getProductModuleCodes } from '@/business/product-modules';
import { PRODUCT_URL } from '@/configs';
import { ProductExtended } from '@/restful';
import { replaceRoutePath } from '@/utilities';

export const getProductUrl = (product: ProductExtended) => {
    const baseUrl = replaceRoutePath(
        PRODUCT_URL,
        {
            modulesCode: getProductModuleCodes(product.modules)
        }
    );

    const url = new URL(baseUrl, location.origin);

    url.searchParams.set('productTypeGroup', product.productType.productTypeGroup as string);
    url.searchParams.set('productType', product.productType.id);
    url.searchParams.set('productDesign', product.design.id);

    return url.pathname + url.search;
};