import { events } from 'qoobee';
import * as React from 'react';
import {
    DefaultToast,
    ToastProvider,
    withToastManager
} from 'react-toast-notifications';
import styled from 'styled-components';

interface NotificationsProps {
    // tslint:disable-next-line:no-any
    readonly toastManager: any;
}

class Notifications extends React.PureComponent<NotificationsProps> {

    private readonly onShowNotification = ({ type, content }) => {
        const { toastManager } = this.props;
        if (!toastManager) {
            return;
        }

        toastManager.add(content, {
            appearance: type,
            autoDismiss: true,
            pauseOnHover: true,
        });
    }

    public componentDidMount() {
        events.addListener('SHOW_NOTIFICATION', this.onShowNotification);
    }

    public render() {
        return null;
    }
}

const ToastManager = withToastManager(Notifications);

const ToastElementWrapper = styled.div`
    > :first-child {
        margin: 4px;
    }

    [class*="ToastElement"] {
        min-height: 48px;
        max-width: 336px;
    }
`;

const MyCustomToast = (props) => {
    return (
        <ToastElementWrapper>
            <DefaultToast {...props} />
        </ToastElementWrapper>
    );
};

export default () => (
    <ToastProvider components={{ Toast: MyCustomToast }}>
        <ToastManager />
    </ToastProvider>
);