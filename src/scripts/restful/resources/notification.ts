import { Resource } from 'react-restful';

export interface Notification {
    readonly id: string;
    readonly createdAt: string;
    readonly type: 'PROMOTION';
    readonly value: number | string;
    readonly userId: string;
    readonly message: string;
    readonly url: string;
    readonly viewed: boolean;
}

export const notificationResources = {
    setViewed: new Resource<Notification>({
        url: '/notifications/viewed/:id',
        method: 'PUT'
    })
};