import { FC, memo } from "react";
import { Layout as AntLayout, Row, Col, Select } from "antd";

import { PhoneOutlined, MailOutlined, FacebookFilled } from "@ant-design/icons";

import "./Contacts.css";

const { Header } = AntLayout;
const { Option } = Select;

const Contacts: FC = memo(() => {
    return (
        <div>
            <Row align="middle">
                <Col>
                    <PhoneOutlined className="contacts-icon" />
                </Col>
                <Col>
                    <Row className="contacts">(032) 292-00-00</Row>
                    <Row className="contacts">(032) 255-00-00</Row>
                </Col>
            </Row>

            <Col span={4}>
                <Row className="contacts">
                    <MailOutlined className="contacts-icon" />
                    <a href="mailto:p.yaryna@gmail.com">Write us</a>
                </Row>
                <Row className="contacts">
                    <FacebookFilled className="contacts-icon" />
                    <a href="https://www.facebook.com/profile.php?id=100008201021812"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Facebook
                    </a>
                </Row>
            </Col>
        </div>
    );
});

export default Contacts;
