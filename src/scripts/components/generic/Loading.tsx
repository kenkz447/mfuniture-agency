import * as React from 'react';
import { Spinner } from 'reactstrap';
import styled from 'styled-components';

const LoadingWrapper = styled.div`
    display: flex;
    justify-content: left;
    align-items: center;
`;

export interface LoadingProps {
    readonly style?: React.CSSProperties;
    readonly delayMS?: number;
}

export function Loading(props: LoadingProps) {
    const { style, delayMS } = props;

    const [canRender, setCanRender] = React.useState(false);

    React.useEffect(() => {
        const setCanRenderTimeOut = setTimeout(
            () => {
                setCanRender(true);
            },
            delayMS
        );

        return () => clearTimeout(setCanRenderTimeOut);
    });

    if (!canRender) {
        return null;
    }

    return (
        <LoadingWrapper style={style}>
            <Spinner type="grow" color="primary" /> Loading...
        </LoadingWrapper>
    );
}

Loading.defaultProps = {
    delayMS: 1000
};