import { AppCoreContext, Role } from 'qoobee';
import { WithContextProps } from 'react-context-service';
import { RouteComponentProps } from 'react-router';
import { ModalProps } from 'reactstrap';

import { Agency, OrderDetail, ProductTypeGroup, User } from '@/restful';

import { AuthClient } from './AuthClient';

interface GlobalModalModalProps extends Partial<ModalProps> {
    readonly onOk: () => void;
    readonly okLabel: string;
}

interface IdentyContext {
    readonly currentRole: Role;
}

interface DataContext {
    readonly curentAgency: Agency;
    readonly allProductTypeGroup: ProductTypeGroup[];
    readonly cartOrderDetails: OrderDetail[];
}

interface DomainContext extends IdentyContext, DataContext, AppCoreContext<User> {
    readonly authClient: AuthClient<{}>;
    readonly globalModal?: GlobalModalModalProps | null;
    readonly globalModalProgressing?: boolean;
    readonly globalModalVisibled?: boolean;
    // tslint:disable-next-line:no-any
    readonly routeParams: any;
}

export type WithDomainContext = WithContextProps<DomainContext, {}>;

export type AppPageProps<T = {}> =
    RouteComponentProps<T> &
    WithDomainContext;