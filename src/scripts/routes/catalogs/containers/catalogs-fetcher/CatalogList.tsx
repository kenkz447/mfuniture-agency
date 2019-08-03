import * as React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardTitle, Col, Row } from 'reactstrap';

import { PRODUCT_URL } from '@/configs';
import { Img } from '@/domain/components';
import { Catalog } from '@/restful';
import { formatCurrency, replaceRoutePath } from '@/utilities';

interface CatalogListProps {
    readonly catalogs: Catalog[];
}

export class CatalogList extends React.PureComponent<CatalogListProps> {
    public render() {
        const { catalogs } = this.props;

        if (!catalogs.length) {
            return <p>Không tìm thấy thông tin sản phẩm!</p>;
        }

        return (
            <Row>
                {
                    catalogs.map(catalog => {
                        const to = replaceRoutePath(PRODUCT_URL, { catalogId: catalog.id });

                        return (
                            <Col key={catalog.id} md="6" lg="4">
                                <Card className="card-product card-plain">
                                    <div className="card-image">
                                        <Link to={to}>
                                            <Img
                                                className="img-rounded img-responsive"
                                                file={catalog.thumbnail}
                                            />
                                        </Link>
                                        <CardBody>
                                            <div className="card-description">
                                                <CardTitle tag="h5">{catalog.name}</CardTitle>
                                                <p className="card-description">
                                                    {catalog.design.name}
                                                </p>
                                            </div>
                                            <div className="price">
                                                <span className="text-danger">
                                                    {formatCurrency(catalog.recommendedPrice)}
                                                </span>
                                            </div>
                                        </CardBody>
                                    </div>
                                </Card>
                            </Col>
                        );
                    })
                }
            </Row>
        );
    }
}
