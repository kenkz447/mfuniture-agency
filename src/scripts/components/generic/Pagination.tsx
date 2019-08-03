import * as classNames from 'classnames';
import * as React from 'react';
import { Link } from 'react-router-dom';
import {
    Pagination as BootstrapPagination,
    PaginationItem,
    PaginationLink
} from 'reactstrap';
import styled from 'styled-components';

const PaginationWrapper = styled.div`
    &.vertical {
        .pagination {
            display: inline-block;
        }
        .page-item {
            margin-bottom: 5px;
        }
    }
`;

interface PaginationProps {
    readonly className?: string;
    readonly start: number;
    readonly limit: number;
    readonly totalItem?: number;
    readonly getPagerUrl: (pageIndex: number) => void;
    readonly vetical?: boolean;
    readonly loading: boolean;
}

export class Pagination extends React.PureComponent<PaginationProps> {

    public static readonly defaultProps = {
        totalItem: 0
    };

    private readonly generatePageRange = (currentPage: number, lastPage: number, delta = 2) => {
        // creates array with base 1 index
        const range = Array(lastPage)
            .fill(1)
            .map((_, index) => index + 1);

        return range.reduce(
            (pages, page) => {
                // allow adding of first and last pages
                if (page === 1 || page === lastPage) {
                    return [...pages, page];
                }

                // if within delta range add page
                if (page - delta <= currentPage && page + delta >= currentPage) {
                    return [...pages, page];
                }

                // otherwise add 'gap if gap was not the last item added.
                if (pages[pages.length - 1] !== '...') {
                    return [...pages, '...'];
                }

                return pages;
            },
            []
        );
    }

    private readonly getPager = () => {
        const { getPagerUrl, totalItem, limit, start, loading } = this.props;
        const totalPage = Math.ceil(totalItem! / limit);

        if (totalPage <= 0) {
            return null;
        }

        const currentPageIndex = start / limit;

        const pageItems = this.generatePageRange(currentPageIndex, totalPage);

        const pagers: React.ReactElement[] = [];

        for (const pageItem of pageItems) {

            const isPageNumber = typeof pageItem === 'number';
            const page = pageItem as number - 1;

            pagers.push(
                <PaginationItem
                    active={currentPageIndex === page}
                    disabled={!isPageNumber || loading}
                >
                    <PaginationLink
                        tag={Link}
                        to={isPageNumber && getPagerUrl(page)}
                        replace={true}
                    >
                        {pageItem}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        return pagers;
    }

    public render() {
        const { className, vetical } = this.props;

        const pagers = this.getPager();

        return (
            <PaginationWrapper className={classNames(className, { 'vertical': vetical === true })}>
                <BootstrapPagination >
                    {pagers}
                </BootstrapPagination>
            </PaginationWrapper>
        );
    }
}