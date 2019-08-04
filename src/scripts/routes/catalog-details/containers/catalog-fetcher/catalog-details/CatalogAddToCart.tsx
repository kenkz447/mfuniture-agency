import * as React from 'react';
import { Link } from 'react-router-dom';

import { getUploadedFileSrc } from '@/business/uploaded-file';
import { CART_URL } from '@/configs';
import { BaseComponent } from '@/domain';
import { AddToCartFromBusiness } from '@/forms/order-detail-create';
import { Catalog } from '@/restful';
import { getObjectId } from '@/restful/base';

interface CatalogAddToCartProps {
    readonly catalog: Catalog;
}

interface CatalogAddToState {
    readonly addedToCart: boolean;
}

export class CatalogAddToCart extends BaseComponent<CatalogAddToCartProps, CatalogAddToState> {

    constructor(props: CatalogAddToCartProps) {
        super(props);

        this.state = {
            addedToCart: false
        };
    }

    private readonly isProductInCart = () => {
        const { addedToCart } = this.state;
        if (addedToCart) {
            return true;
        }

        const { cartOrderDetails } = this.context;
        const { catalog } = this.props;

        return !!cartOrderDetails.find(o => getObjectId(o.catalog) === catalog.id);
    }

    public render() {
        const { catalog } = this.props;

        return (
            <div>
                <p className="text-black-50 mb-3">Chọn mua sản phẩm này</p>
                {
                    this.isProductInCart()
                        ? (
                            <p>
                                {/* tslint:disable-next-line:max-line-length */}
                                <i className="nc-icon nc-check-2 text-success d-inline-block vertical-align-middle mr-2" />
                                <span className="d-inline-block vertical-align-middle mr-2" >
                                    Sản phẩm đã ở trong
                                </span>
                                <Link
                                    className="d-inline-block vertical-align-middle"
                                    to={CART_URL}
                                >
                                    giỏ hàng
                                </Link>
                            </p>
                        )
                        : (
                            <AddToCartFromBusiness
                                onSuccess={() => {
                                    this.setState({
                                        addedToCart: true
                                    });
                                }}
                                initialValue={{
                                    previewImg: getUploadedFileSrc({
                                        uploadedFile: catalog.thumbnail,
                                        size: 'img256x256'
                                    }),
                                    catalog: catalog.id,
                                    productDesign: catalog.design,
                                    productModulesCode: catalog.moduleCodes,
                                    product_type: catalog.productType,
                                    totalPrice: 0
                                }}
                            />
                        )
                }
            </div>
        );
    }
}
