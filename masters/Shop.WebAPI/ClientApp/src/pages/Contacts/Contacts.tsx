import { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import { Row, Col, Form, Input, Button } from "antd";

import { PhoneOutlined, MailOutlined, FacebookFilled } from "@ant-design/icons";

import "./Contacts.css";

const Contacts: FC = memo(() => {
    const [form] = Form.useForm();
    const { t } = useTranslation();

    return (
        <div className="contacts">
            <Row justify="space-around">
                <Col span={8}>
                    <Row align="middle">
                        <Col>
                            <PhoneOutlined className="contacts-icon" />
                        </Col>
                        <Col>
                            <Row className="phone">(032) 292-00-00</Row>
                            <Row className="phone">(032) 255-00-00</Row>
                        </Col>
                    </Row>
                    <Row align="middle" className="email">
                        <MailOutlined className="contacts-icon" />
                        <a href="mailto:p.yaryna@gmail.com">{t("contact.write-us")}</a>
                    </Row>
                    <Row align="middle" className="social-networks">
                        <FacebookFilled className="contacts-icon" />
                        <a href="https://www.facebook.com/profile.php?id=100008201021812"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Facebook
                        </a>
                    </Row>
                </Col>
                <Col span={8}>
                    <h2>
                        {t("contact.contact-us")}
                    </h2>
                    <Form
                        form={form}
                        name="contacts"
                    >
                        <Form.Item
                            name="name"
                            rules={[
                                { required: true, message: "Please write your name!" },
                            ]}
                        >
                            <Input
                                placeholder={`${t("contact.name")}...`}
                                className="contacts-input"
                            />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            rules={[
                                { required: true, message: "Please write your email!" },
                            ]}
                        >
                            <Input
                                placeholder="Email..."
                                className="contacts-input"
                            />
                        </Form.Item>
                        <Form.Item
                            name="message"
                            rules={[
                                { required: true, message: "Please write your message!" },
                            ]}
                        >
                            <Input.TextArea
                                placeholder={`${t("contact.message")}...`}
                                className="contacts-text-area"
                            />
                        </Form.Item>
                        <Form.Item
                        >
                            <Button
                                htmlType="submit"
                                className="contacts-submit-btn"
                            >
                                {t("contact.submit")}
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    );
});

export default Contacts;
