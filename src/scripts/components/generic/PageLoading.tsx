import * as React from 'react';
import styled from 'styled-components';

import { colorPrimary } from '@/configs';

const PageLoadingWrapper = styled.div`
    height: 100%;
    width:100%;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    i {
        font-size: 20px;
        margin-bottom: 20px;
        color: ${colorPrimary};
    }
`;

export interface PageLoadingProps {
    readonly delayMS?: number;
}

export function PageLoading(props: PageLoadingProps) {
    const { delayMS } = props;

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
        <PageLoadingWrapper>
            <span>Đang tải trang, đợi xíu...</span>
        </PageLoadingWrapper>
    );
}

PageLoading.defaultProps = {
    delayMS: 500
};