import { events } from 'qoobee';
import * as React from 'react';
import { Button } from 'reactstrap';

export const showSuccess = (message: string) => {
    events.emit(
        'SHOW_NOTIFICATION',
        {
            type: 'success',
            content: message
        }
    );
};

export const showError = (message: string) => {
    events.emit(
        'SHOW_NOTIFICATION',
        {
            type: 'error',
            content: message
        }
    );
};

export const showWarning = (message: string) => {
    events.emit(
        'SHOW_NOTIFICATION',
        {
            type: 'warning',
            content: message
        }
    );
};

export const showAction = (
    props: {
        readonly message: string,
        readonly actionLabel: string,
        readonly onClick: () => void,
    }
) => {
    const {
        message,
        actionLabel,
        onClick
    } = props;

    events.emit(
        'SHOW_NOTIFICATION',
        {
            type: 'info',
            content: (
                <div>
                    <p>{message}</p>
                    <Button onClick={onClick}>{actionLabel}</Button>
                </div>
            )
        }
    );
};