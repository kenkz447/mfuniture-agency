import * as React from 'react';
import styled from 'styled-components';

const PageWrapperElement = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`;

interface PageWrapperProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
}

export class PageWrapper extends React.PureComponent<PageWrapperProps> {
    public static readonly defaultProps = {
        id: 'pageWrapper'
    };

    public componentDidMount() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }

    public render() {
        const { ...rest } = this.props;

        return (
            <PageWrapperElement
                {...rest}
            >
                {this.props.children}
            </PageWrapperElement>
        );
    }
}