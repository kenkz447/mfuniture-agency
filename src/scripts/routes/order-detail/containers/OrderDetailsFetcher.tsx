import * as React from 'react';
import { RestfulRender } from 'react-restful';

import { Loading } from '@/components';
import { BaseHistoryListenComponent } from '@/domain';
import { orderDetailResources } from '@/restful';

import { OrderDetailsTable } from './order-details-fetcher';

export interface OrderDetailsFetcherProps {
    readonly orderId: string;
}

export class OrderDetailsFetcher extends BaseHistoryListenComponent<OrderDetailsFetcherProps> {
    constructor(props: OrderDetailsFetcherProps) {
        super(props);

        this.state = {
            params: [{
                type: 'query',
                parameter: 'order',
                value: props.orderId
            }]
        };
    }

    public render() {
        const { params } = this.state;

        return (
            <RestfulRender
                resource={orderDetailResources.find}
                parameters={params}
            >
                {(render) => {
                    const { data, fetching } = render;
                    if (!data && fetching) {
                        return <Loading />;
                    }

                    return (
                        <OrderDetailsTable orderDetails={data!}/>
                    );
                }}
            </RestfulRender>
        );
    }
}
