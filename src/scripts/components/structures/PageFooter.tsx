import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';

import { LOGIN_URL, ORDERS_URL } from '@/configs';
import { BaseComponent } from '@/domain';

interface PageFooterProps {
}

export class PageFooter extends BaseComponent<PageFooterProps> {
    public render() {
        const { authClient } = this.context;

        return (
            <footer className="footer footer-black footer-white">
                <Container>
                    <Row>
                        <Col>
                            <nav className="footer-nav">
                                <ul className="text-center text-lg-left">
                                    <li>
                                        <Link
                                            to="/"
                                            className="mr-1"
                                        >
                                            Trang chủ
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to={ORDERS_URL}
                                            className="mr-1"
                                        >
                                            Đơn hàng
                                        </Link>
                                    </li>
                                    <li>
                                        <a
                                            href={LOGIN_URL}
                                            className="mr-1"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                authClient.logout();
                                            }}
                                        >
                                            <i className="fa fa-sign-out" aria-hidden="true"/> Đăng xuất
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </Col>
                    </Row>
                </Container>
            </footer>
        );
    }
}
