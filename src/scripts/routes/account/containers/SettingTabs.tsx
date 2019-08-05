import * as React from 'react';
import {
    Col,
    Nav,
    NavItem,
    NavLink,
    Row,
    TabContent,
    TabPane
} from 'reactstrap';

import { BaseComponent } from '@/domain';
import { AgencyFromBusiness } from '@/forms/agency/AgencyFromBusiness';

interface SettingTabsProps {
}

interface SettingTabsState {
    readonly activeTab: 'account' | 'other';
}

export class SettingTabs extends BaseComponent<SettingTabsProps, SettingTabsState> {
    constructor(props: SettingTabsProps) {
        super(props);

        this.state = {
            activeTab: 'account'
        };
    }

    private readonly setActiveTab = (tab: SettingTabsState['activeTab']) => {
        this.setState({
            activeTab: tab
        });
    }

    public render() {
        const { setContext } = this.context;
        const { activeTab } = this.state;

        return (
            <div>
                <div className="nav-tabs-navigation">
                    <div className="nav-tabs-wrapper ml-0">
                        <Nav id="tabs" role="tablist" tabs={true}>
                            <NavItem>
                                <NavLink
                                    className={this.classNames('pl-0', { active: activeTab === 'account' })}
                                    onClick={() => {
                                        this.setActiveTab('account');
                                    }}
                                >
                                    Thông tin cửa hàng
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={activeTab === 'other' ? 'active' : ''}
                                    onClick={() => {
                                        this.setActiveTab('other');
                                    }}
                                >
                                    Khác
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </div>
                </div>
                <TabContent activeTab={activeTab}>
                    <TabPane tabId="account">
                        <Row>
                            <Col lg={6}>
                                <AgencyFromBusiness
                                    initialValues={this.context.curentAgency}
                                    onSuccess={(updatedAgency) => {
                                        setContext({
                                            curentAgency: updatedAgency
                                        });
                                    }}
                                />
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="other">
                        <p>Thông tin đang được cập nhật</p>
                    </TabPane>
                </TabContent>
            </div>
        );
    }
}
