import { FormikProps } from 'formik';
import * as React from 'react';
import { Button, Col, Form, FormGroup, Input, Row } from 'reactstrap';

import { Agency } from '@/restful';

export type AgencyFormValues = Partial<Agency>;

export interface AgencyFormProps extends FormikProps<AgencyFormValues> {
}

interface AgencyFormForm {
}

export class AgencyForm extends React.PureComponent<
    AgencyFormProps,
    AgencyFormForm
    > {

    constructor(props: AgencyFormProps) {
        super(props);

        this.state = {
        };
    }

    public render() {
        const {
            handleSubmit,
            handleChange,
            isSubmitting,
            dirty,
            values
        } = this.props;

        return (
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md="6" sm="6">
                        <FormGroup>
                            <label>Điện thoại</label>
                            <Input
                                className="border-input"
                                placeholder="Nhập số điện thoại"
                                type="tel"
                                name={nameof<AgencyFormValues>(o => o.phone)}
                                value={values.phone}
                                onChange={handleChange}
                                required={true}
                            />
                        </FormGroup>
                    </Col>
                    <Col md="6" sm="6">
                        <FormGroup>
                            <label>Email</label>
                            <Input
                                className="border-input"
                                placeholder="Nhập email"
                                type="email"
                                name={nameof<AgencyFormValues>(o => o.email)}
                                value={values.email}
                                onChange={handleChange}
                                required={true}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <FormGroup>
                    <label>Tên cửa hàng</label>
                    <Input
                        className="border-input"
                        placeholder="Nhập tên cửa hàng"
                        type="text"
                        name={nameof<AgencyFormValues>(o => o.name)}
                        value={values.name}
                        onChange={handleChange}
                        required={true}
                    />
                </FormGroup>
                <FormGroup >
                    <label>Địa chỉ</label>
                    <Input
                        placeholder="Nhập đầy đủ địa chỉ cửa hàng"
                        className="textarea-limited"
                        type="textarea"
                        maxLength={150}
                        rows="3"
                        name={nameof<AgencyFormValues>(o => o.address)}
                        value={values.address}
                        onChange={handleChange}
                        required={true}
                    />
                </FormGroup>
                <Button
                    type="submit"
                    className="btn-round"
                    color="danger"
                    disabled={!dirty || isSubmitting}
                >
                    Lưu thông tin
                </Button>
            </Form>
        );
    }
}