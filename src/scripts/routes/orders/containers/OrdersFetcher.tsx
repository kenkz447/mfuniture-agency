import * as React from 'react';
import { RestfulRender } from 'react-restful';

import { Loading } from '@/components';
import { BaseHistoryListenComponent } from '@/domain';
import { orderResources } from '@/restful';

import { OrderTable } from './orders-fetcher';

export interface OrdersFetcherProps {
}

export class OrdersFetcher extends BaseHistoryListenComponent<OrdersFetcherProps> {
    constructor(props: OrdersFetcherProps) {
        super(props);

        this.state = {
            params: []
        };
    }

    public render() {
        const { params } = this.state;

        return (
            <RestfulRender
                resource={orderResources.find}
                parameters={params}
            >
                {(render) => {
                    const { data, fetching } = render;
                    if (!data && fetching) {
                        return <Loading />;
                    }

                    return (
                        <OrderTable orders={data!}/>
                    );
                }}
            </RestfulRender>
        );
    }
}
