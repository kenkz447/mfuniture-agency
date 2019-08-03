import { Resource, ResourceType } from 'react-restful';

import { getDefaultParamsForUpdate } from '../base';
import { Order } from './order';
import { UploadedFile } from './uploadedFile';

export interface OrderTransaction {
    readonly id?: string;
    readonly name: string;
    readonly type: 'deposit' | 'payment' | 'refund';
    readonly note: string;
    readonly date: string;
    readonly order: Partial<Order> | string;
    readonly money: number;
    readonly code: string;
    readonly confirmed?: boolean;
    readonly attachment?: UploadedFile;
    readonly rejected?: boolean;
    readonly rejectReason?: string;
}

export const orderTransactionResourceType = new ResourceType<OrderTransaction>(nameof<OrderTransaction>());

export const orderTransactionResources = {
    find: new Resource<OrderTransaction, OrderTransaction[]>({
        resourceType: orderTransactionResourceType,
        url: '/orderTransaction',
    }),
    create: new Resource<OrderTransaction>({
        resourceType: orderTransactionResourceType,
        url: '/orderTransaction',
        method: 'POST'
    }),
    update: new Resource<OrderTransaction>({
        resourceType: orderTransactionResourceType,
        url: '/orderTransaction/:id',
        method: 'PUT',
        getDefaultParams: getDefaultParamsForUpdate
    }),
    confirm: new Resource<OrderTransaction>({
        resourceType: orderTransactionResourceType,
        url: '/orderTransaction/confirm/:id',
        method: 'PUT',
        getDefaultParams: getDefaultParamsForUpdate
    }),
    reject: new Resource<OrderTransaction>({
        resourceType: orderTransactionResourceType,
        url: '/orderTransaction/reject/:id',
        method: 'PUT',
        getDefaultParams: getDefaultParamsForUpdate
    }),
    delete: new Resource<OrderTransaction>({
        resourceType: orderTransactionResourceType,
        url: '/orderTransaction/:id',
        method: 'DELETE'
    })
};