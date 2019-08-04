import * as React from 'react';
import styled from 'styled-components';

const PageContentWrapper = styled.main`
    margin-top: 94px;
    flex-grow: 1;
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
                className="mb-5"
                {...rest}
            >
                {this.props.children}
            </PageContentWrapper>
        );
    }
}