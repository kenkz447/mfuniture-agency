import * as React from 'react';
import { Link } from 'react-router-dom';
import {
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    UncontrolledDropdown
} from 'reactstrap';

import { CALALOG_URL } from '@/configs';
import { BaseComponent } from '@/domain';
import { replaceRoutePath } from '@/utilities';

interface HeaderCatalogMenuProps {
}

export class HeaderCatalogMenu extends BaseComponent<HeaderCatalogMenuProps> {

    private readonly renderCatalogMenu = () => {
        const { allProductTypeGroup } = this.context;

        return allProductTypeGroup.map(o => {
            const to = replaceRoutePath(CALALOG_URL, { productTypeGroupId: o.id });

            const { productTypes } = o;

            return (
                <DropdownItem
                    key={o.id}
                    to={to + `?productType=${productTypes[0].id}`}
                    tag={Link}
                >
                    {o.name}
                </DropdownItem>
            );
        });
    }

    public render() {
        let dropdownExtraProps = {};

        if (this.isSmallDevice) {
            dropdownExtraProps = {
                isOpen: true
            };
        }

        return (
            <UncontrolledDropdown
                nav={true}
                inNavbar={true}
                {...dropdownExtraProps}
            >
                <DropdownToggle className="mr-2" color="default" caret={true} nav={true}>
                    Danh mục sản phẩm
                </DropdownToggle>
                <DropdownMenu
                    className="dropdown-danger"
                    right={true}
                >
                    {this.renderCatalogMenu()}
                </DropdownMenu>
            </UncontrolledDropdown>
        );
    }
}