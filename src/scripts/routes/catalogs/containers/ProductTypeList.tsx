import * as React from 'react';
import { getParamsValue } from 'react-restful';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import styled from 'styled-components';

import { BaseHistoryListenComponent } from '@/domain';
import { ProductTypeGroup } from '@/restful';
import { getUrlSearchParam } from '@/utilities';

const ProductTypeListWrapper = styled.div`
    margin-left: -15px;
    margin-right: -15px;
    .horizontal-scroll {
        padding-left: 15px;
        padding-right: 15px;
    }
`;

interface ProductTypeListProps {
    readonly productTypeGroup: ProductTypeGroup;
}

export class ProductTypeList extends BaseHistoryListenComponent<ProductTypeListProps> {
    constructor(props: ProductTypeListProps) {
        super(props);

        const { productTypeGroup } = props;

        this.state = {
            params: [],
            defaultParams: {
                productType: getUrlSearchParam('productType') || productTypeGroup.productTypes[0].id
            }
        };
    }

    public render() {
        const { productTypeGroup } = this.props;
        const { params } = this.state;

        const productType = getParamsValue(params, 'query', 'productType');

        return (
            <ProductTypeListWrapper>
                <div className="horizontal-scroll">
                    {productTypeGroup.productTypes.map(o => {
                        return (
                            <Button
                                key={o.id}
                                className="mr-2 btn-round"
                                outline={productType !== o.id}
                                color="danger"
                                tag={Link}
                                to={`${location.pathname}?productType=${o.id}`}
                            >
                                {o.name}
                            </Button>
                        );
                    })}
                </div>
            </ProductTypeListWrapper>
        );
    }
}
