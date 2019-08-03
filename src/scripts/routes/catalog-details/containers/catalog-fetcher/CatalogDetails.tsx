import * as React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'reactstrap';

import { getUploadedFileSrc } from '@/business/uploaded-file';
import { CALALOG_URL } from '@/configs';
import { AddToCartFromBusiness } from '@/forms/order-detail-create';
import { Catalog } from '@/restful';
import { formatCurrency, replaceRoutePath } from '@/utilities';

import { CatalogCarousel } from './catalog-details';

interface CatalogDetailsProps {
    readonly catalog: Catalog;
}

export class CatalogDetails extends React.PureComponent<CatalogDetailsProps> {
    public render() {
        const { catalog } = this.props;

        return (
            <div>
                <h2 className="h5 mb-5 ml-3">Thông tin sản phẩm</h2>
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
                        <div>
                            <p className="text-black-50 mb-3">Chọn mua sản phẩm này</p>
                            <AddToCartFromBusiness
                                modulesCode=""
                                initialValue={{
                                    previewImg: getUploadedFileSrc({
                                        uploadedFile: catalog.thumbnail,
                                        size: 'img256x256'
                                    }),
                                    catalogId: catalog.id,
                                    productDesign: catalog.design,
                                    productModulesCode: catalog.moduleCodes,
                                    product_type: catalog.productType,
                                    totalPrice: 0
                                }}
                            />
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}
