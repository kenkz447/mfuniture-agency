import { AppCoreContext, Role } from 'qoobee';
import { WithContextProps } from 'react-context-service';
import { RouteComponentProps } from 'react-router';
import { ModalProps } from 'reactstrap';

import { Agency, ProductTypeGroup, User } from '@/restful';

import { AuthClient } from './AuthClient';

interface GlobalModalModalProps extends ModalProps {
    readonly onOk: () => void;
    readonly okLabel: string;
}

interface IdentyContext {
    readonly currentRole: Role;
}

interface DataContext {
    readonly cuurentAgency: Agency;
    readonly allProductTypeGroup: ProductTypeGroup[];
}

interface DomainContext extends IdentyContext, DataContext, AppCoreContext<User> {
    readonly authClient: AuthClient<{}>;
    readonly globalModal?: GlobalModalModalProps;
    readonly globalModalProgressing?: boolean;
    readonly globalModalVisibled?: boolean;
    // tslint:disable-next-line:no-any
    readonly routeParams: any;
}

export type WithDomainContext = WithContextProps<DomainContext, {}>;

export type AppPageProps<T = {}> =
    RouteComponentProps<T> &
    WithDomainContext;