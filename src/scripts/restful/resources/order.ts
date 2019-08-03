import { Record, Resource, ResourceType } from 'react-restful';

import { getDefaultParamsForUpdate } from '../base';
import { AddressType } from './address';
import { Agency } from './agency';
import { City } from './city';
import { County } from './county';
import { IssueTicket } from './issueTicket';
import { OrderDetail } from './orderDetail';
import { OrderTransaction } from './orderTransaction';
import { Promotion } from './promotion';
import { UploadedFile } from './uploadedFile';
import { User } from './user';

export interface Order extends Record {
    readonly id: string;
    readonly orderDetails: OrderDetail[];
    readonly phone: string;
    readonly email: string;
    readonly shippingAddress: string;
    readonly shippingDate: string;
    readonly depositRequired: number;
    readonly paid: boolean;
    readonly totalPrice: number;
    readonly status: 'new' | 'confirmed' | 'produce' | 'payment' | 'shipping' | 'done' | 'cancel' | 'change';
    readonly createdAt?: string;
    readonly promotion?: Promotion;
    readonly note?: string;
    readonly shippingToCity: City;
    readonly shippingToCounty: County;
    readonly shippingFee: number;
    readonly totalOfPayment: number;
    readonly totalDiscount: number;
    readonly productsDiscount: number;
    readonly promotionDiscount: number;
    readonly agencyCommissionPercent: number;
    readonly agencyCommissionValue: number;
    readonly billDiscount: number;
    readonly code: string;
    readonly agencyOrderer: Agency;
    readonly orderTransactions: Array<OrderTransaction>;
    readonly created_by: User;

    readonly contactTo?: string;
    readonly contactToPhone?: string;

    readonly billingOrganization?: string;
    readonly billingTaxcode?: string;
    readonly billingAddress?: string;

    readonly addressType: AddressType;
    readonly photos: UploadedFile[];

    readonly issueTickets?: IssueTicket[];

    readonly totalProduct: number;
    readonly locked?: boolean;
    readonly recipientName: string;

    readonly consigneeName: string;

    readonly hasExternalMaterials?: boolean;
    
    readonly allExternalMaterialsProvided?: boolean;
}

export const orderResourceType = new ResourceType<Order>(nameof<Order>());

export const orderResources = {
    find: new Resource<Order, Order[]>({
        resourceType: orderResourceType,
        url: '/order'
    }),
    findOne: new Resource<Order>({
        resourceType: orderResourceType,
        url: '/order/:id',
    }),
    create: new Resource<Order>({
        resourceType: orderResourceType,
        url: '/order',
        method: 'POST',
        innerMapping: {
            orderDetails: (orderDetail, store) => {
                const orderDetailResourceType = store.getRegisteredResourceType(nameof<OrderDetail>());
                store.dataMapping(orderDetailResourceType, orderDetail);
            }
        }
    }),
    update: new Resource<Order>({
        resourceType: orderResourceType,
        url: '/order/:id/:field',
        method: 'PUT',
        getDefaultParams: getDefaultParamsForUpdate
    }),
    updateStatus: new Resource<Order>({
        resourceType: orderResourceType,
        url: '/order/status/:id/:status',
        method: 'PUT'
    }),
    lock: new Resource<Order>({
        resourceType: orderResourceType,
        url: '/order/lock/:id',
        method: 'PUT',
        getDefaultParams: getDefaultParamsForUpdate
    }),
    delete: new Resource<Order>({
        resourceType: orderResourceType,
        url: '/order/:id',
        method: 'DELETE'
    })
};