import { Resource } from 'react-restful';

export interface StatisticsProfileOverviewResponse {
    readonly totalTransactionMoney: number;
    readonly orderCount: number;
    readonly totalProduct: number;
    readonly totalDiscount: number;
}

export const statisticsResources = {
    profileOverview: new Resource<{}, StatisticsProfileOverviewResponse>({
        url: '/statistics/profile-overview'
    })
};