import * as React from 'react';

interface DelayRenderProps {
    readonly timeout: number;
}

interface DelayRenderState {
    readonly canRender: boolean;
}

export class DelayRender extends React.PureComponent<DelayRenderProps, DelayRenderState> {
    public readonly state = {
        canRender: false
    };

    public componentWillMount() {
        setTimeout(
            () => {
                this.setState({
                    canRender: true
                });
            },
            this.props.timeout
        );
    }

    public render() {
        if (!this.state.canRender) {
            return null;
        }

        return this.props.children;
    }
}