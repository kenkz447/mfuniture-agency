import * as React from 'react';
import styled from 'styled-components';

const NoContentWrapper = styled.div`
    min-height: 200px;
    height: 100%;
    text-align: center;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    border-radius: 6px;
    .no-content-icon {
        font-size: 60px;
        height: 90px;
        width: 90px;
        border-radius: 50%;
    }
    .no-content-title {
        font-weight: bold;
        color: black;
        font-size: 20px;
        line-height: 1.8;
    }
    .no-content-description {
        color: gray;
        text-align: center;
        max-width: 300px;
    }
`;

interface NoContentProps {
    readonly description: string;
    readonly title?: string;
    readonly icon?: React.ReactNode;
    readonly children?: React.ReactNode;
}

export function NoContent(props: NoContentProps) {
    const { icon, children, description } = props;

    return (
        <NoContentWrapper className="no-content">
            NULL
        </NoContentWrapper>
    );
}

NoContent.defaultProps = {
    description: 'Không tìm thấy dữ liệu!'
};