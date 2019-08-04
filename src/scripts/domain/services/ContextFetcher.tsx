import {
    agencyResources,
    orderDetailResources,
    productTypeGroupResources,
    request
} from '@/restful';

import { BaseComponent } from '../base';

interface ContextFetcherState {
    readonly allowLoad: boolean;
}

export class ContextFetcher extends BaseComponent<{}, ContextFetcherState> {
    public static readonly defaultProps = {
        children: null
    };

    constructor(props: {}) {
        super(props);

        this.state = {
            allowLoad: false
        };
    }

    private readonly fetchContext = async () => {
        const { currentUser, setContext } = this.context;
        if (!currentUser) {
            this.setState({
                allowLoad: true
            });

            return;
        }

        const [currentAgency, allProductTypeGroup, cartOrderDetails] = await Promise.all([
            request(agencyResources.findOneByUser, { type: 'path', parameter: 'userId', value: currentUser.id }),
            request(productTypeGroupResources.find),
            request(orderDetailResources.find)
        ]);

        setContext({
            cuurentAgency: currentAgency,
            allProductTypeGroup: allProductTypeGroup,
            cartOrderDetails: cartOrderDetails
        });

        this.setState({
            allowLoad: true
        });
    }

    public componentWillMount() {
        this.fetchContext();
    }

    public render() {
        if (!this.state.allowLoad) {
            return null;
        }

        return this.props.children;
    }
}