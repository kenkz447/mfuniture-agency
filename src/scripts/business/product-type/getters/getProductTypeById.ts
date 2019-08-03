import {
    ProductType,
    productTypeResources,
    productTypeResourceType,
    request,
    restfulStore
} from '@/restful';

export const getProductTypeById = async (productTypeObj: ProductType | string) => {
    const productTypeId = typeof productTypeObj === 'string' ? productTypeObj : productTypeObj.id;

    let productType = restfulStore.findRecordByKey(productTypeResourceType, productTypeId);
    if (productType) {
        return productType;
    }

    productType = await request(productTypeResources.findOne, { type: 'path', parameter: 'id', value: productTypeId });
    return productType;
};