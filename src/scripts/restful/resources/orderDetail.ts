import { Record, Resource, ResourceType } from 'react-restful';

import { getDefaultParamsForUpdate } from '../base';
import { Catalog } from './catalog';
import { Order } from './order';
import { OrderDetailMaterialNorm } from './orderDetailMaterialNorm';
import { Product } from './product';
import { ProductDesign } from './productDesign';
import { ProductType } from './productType';
import { StoredPromoCode } from './storedPromoCode';
import { User } from './user';

export interface OrderDetail extends Record {
    readonly id?: string;
    readonly quantity: number;
    readonly productModulesCode: string;
    readonly product_type: ProductType | string;
    readonly productDesign: ProductDesign | string;
    readonly subTotalPrice: number;
    readonly totalPrice: number;
    readonly productPrice: number;
    readonly discountMoneyByInventoryProduct?: number;
    readonly discountPercentByInventoryProduct?: number;
    readonly totalDiscountPerProduct: number;
    readonly order?: Order;
    readonly status: 'temp' | 'order';
    readonly discount: number;
    readonly discountByAgencyPolicy?: number;
    readonly previewImg?: string;
    readonly created_by?: User;
    readonly productCode?: string;
    readonly product?: Product;
    readonly updatedAt?: string;
    readonly orderDetailMaterialNorms: OrderDetailMaterialNorm[];
    readonly storedPromoCode?: StoredPromoCode;
    readonly catalog?: Catalog | string;
}

export const orderDetailResourceType = new ResourceType<OrderDetail>(nameof<OrderDetail>());

export const orderDetailResources = {
    find: new Resource<OrderDetail, OrderDetail[]>({
        resourceType: orderDetailResourceType,
        url: '/orderDetail',
        method: 'GET'
    }),
    create: new Resource<OrderDetail>({
        resourceType: orderDetailResourceType,
        url: '/orderDetail',
        method: 'POST',
    }),
    update: new Resource<OrderDetail>({
        resourceType: orderDetailResourceType,
        url: '/orderDetail/:id',
        method: 'PUT',
        getDefaultParams: getDefaultParamsForUpdate
    }),
    updateQuantity: new Resource<OrderDetail>({
        resourceType: orderDetailResourceType,
        url: '/orderDetail/update-quantity/:id',
        method: 'PUT',
        getDefaultParams: getDefaultParamsForUpdate
    }),
    delete: new Resource<OrderDetail>({
        resourceType: orderDetailResourceType,
        url: '/orderDetail/:id',
        method: 'DELETE'
    }),
};