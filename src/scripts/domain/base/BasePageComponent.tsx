import { RootContext, RoutePage } from 'qoobee';

import { AppPageProps, WithDomainContext } from './Types';

export class BasePageComponent<P extends AppPageProps> extends RoutePage<P> {

    public static readonly contextType = RootContext;
    public readonly context!: WithDomainContext;

    public componentWillMount() {
        const { setContext } = this.context;

        setContext({
            routeParams: this.props.match.params
        });
    }

    public componentWillUnmount() {
        const { setContext } = this.context;

        setContext({
            routeParams: null
        });
    }

}
