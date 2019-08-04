import Headroom from 'headroom.js';
import { UnregisterCallback } from 'history';
import React from 'react';
import { Link } from 'react-router-dom';
import {
    Collapse,
    Container,
    Nav,
    Navbar,
    NavbarBrand,
    UncontrolledTooltip
} from 'reactstrap';

import { HOME_URL } from '@/configs';
import { BaseComponent } from '@/domain';

import { HeaderCartBtn, HeaderCatalogMenu } from './page-header';

interface PageHeaderProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
    readonly title: string;
}

interface PageHeaderState {
    readonly collapseOpen: boolean;
    readonly bodyClick: boolean;
}

export class PageHeader extends BaseComponent<PageHeaderProps, PageHeaderState> {
    public _isUnmouting = false;
    public _unregisterListen: UnregisterCallback;

    constructor(props: PageHeaderProps) {
        super(props);

        this.state = {
            bodyClick: false,
            collapseOpen: false
        };
    }

    public componentDidMount() {
        const { history } = this.context;
        this._unregisterListen = history.listen(() => {
            if (this._isUnmouting) {
                return;
            }

            this.setState({
                collapseOpen: false
            });
        });

        const headroom = new Headroom(document.getElementById('mainNav'));
        headroom.init();
    }

    public componentWillUnmount() {
        this._isUnmouting = true;
        this._unregisterListen();
    }

    public componentDidUpdate(prevProps: PageHeaderProps, prevState: PageHeaderState) {
        if (prevState.collapseOpen !== this.state.collapseOpen) {
            document.documentElement.classList.toggle('nav-open');
        }
    }

    public render() {
        const { title } = this.props;
        const { collapseOpen, bodyClick } = this.state;

        return (
            <>
                {
                    bodyClick && (
                        <div
                            id="bodyClick"
                            onClick={() => {
                                this.setState({
                                    bodyClick: false,
                                    collapseOpen: false
                                });
                            }}
                        />
                    )
                }
                <Navbar id="mainNav" className="fixed-top" expand="lg" >
                    <Container>
                        <div className="navbar-translate">
                            <NavbarBrand id="navbar-brand" className="pl-lg-0" to={HOME_URL} tag={Link}>
                                {title}
                            </NavbarBrand>
                            <UncontrolledTooltip placement="bottom" target="navbar-brand">
                                {title}
                            </UncontrolledTooltip>
                            <button
                                className="navbar-toggler"
                                id="navigation"
                                type="button"
                                onClick={() => {
                                    this.setState({
                                        bodyClick: true,
                                        collapseOpen: true
                                    });
                                }}
                            >
                                <span className="navbar-toggler-bar bar1" />
                                <span className="navbar-toggler-bar bar2" />
                                <span className="navbar-toggler-bar bar3" />
                            </button>
                        </div>
                        <Collapse navbar={true} isOpen={collapseOpen}>
                            <Nav className="ml-auto" navbar={true}>
                                <HeaderCatalogMenu />
                                <HeaderCartBtn />
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </>
        );
    }
}