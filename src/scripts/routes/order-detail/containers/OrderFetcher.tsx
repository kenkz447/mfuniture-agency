import * as React from 'react';
import { RestfulRender } from 'react-restful';

import { Loading } from '@/components';
import { BaseHistoryListenComponent } from '@/domain';
import { orderResources } from '@/restful';

import { OrderDetails } from './order-fetcher';

export interface OrderFetcherProps {
    readonly orderId: string;
}

export class OrderFetcher extends BaseHistoryListenComponent<OrderFetcherProps> {
    constructor(props: OrderFetcherProps) {
        super(props);

        this.state = {
            params: [{
                type: 'path',
                parameter: 'id',
                value: props.orderId
            }]
        };
    }

    public render() {
        const { params } = this.state;

        return (
            <RestfulRender
                resource={orderResources.findOne}
                parameters={params}
            >
                {(render) => {
                    const { data, fetching } = render;
                    if (!data && fetching) {
                        return <Loading />;
                    }

                    return (
                        <OrderDetails order={data!}/>
                    );
                }}
            </RestfulRender>
        );
    }
}
