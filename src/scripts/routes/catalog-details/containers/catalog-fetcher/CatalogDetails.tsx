import * as React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'reactstrap';

import { getUploadedFileSrc } from '@/business/uploaded-file';
import { CALALOG_URL, CART_URL } from '@/configs';
import { BaseComponent } from '@/domain';
import { AddToCartFromBusiness } from '@/forms/order-detail-create';
import { Catalog } from '@/restful';
import { getObjectId } from '@/restful/base';
import { formatCurrency, replaceRoutePath } from '@/utilities';

import { CatalogAddToCart, CatalogCarousel } from './catalog-details';

interface CatalogDetailsProps {
    readonly catalog: Catalog;
}

interface CatalogDetailsState {
    readonly addedToCart: boolean;
}

export class CatalogDetails extends BaseComponent<CatalogDetailsProps, CatalogDetailsState> {

    public render() {
        const { catalog } = this.props;

        return (
            <div>
                <h2 className="h5 mb-3 mb-lg-5">
                    Thông tin sản phẩm
                </h2>
                <Row>
                    <Col md="7" sm="6">
                        <CatalogCarousel catalog={catalog} />
                    </Col>
                    <Col md="5" sm="6">
                        <div className="mb-4">
                            {/* tslint:disable-next-line:max-line-length */}
                            <Link to={replaceRoutePath(CALALOG_URL, { productTypeGroupId: catalog.productTypeGroup.id })}>
                                {catalog.productTypeGroup.name}
                            </Link>
                        </div>
                        <div className="mb-5">
                            <h1 className="h3 mb-2">{catalog.name}</h1>
                            <strong className="text-danger h5">
                                {formatCurrency(catalog.recommendedPrice)}
                            </strong>
                        </div>
                        <CatalogAddToCart catalog={catalog} />
                    </Col>
                </Row>
            </div>
        );
    }
}
