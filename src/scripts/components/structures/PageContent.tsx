import * as React from 'react';
import styled from 'styled-components';

const PageContentWrapper = styled.main`
    min-height: inherit;
    margin-top: 94px;
`;

interface PageContentProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
}

export class PageContent extends React.PureComponent<PageContentProps> {
    public static readonly defaultProps = {
        id: 'pageContent'
    };

    public render() {
        const { ...rest } = this.props;

        return (
            <PageContentWrapper
                {...rest}
            >
                {this.props.children}
            </PageContentWrapper>
        );
    }
}