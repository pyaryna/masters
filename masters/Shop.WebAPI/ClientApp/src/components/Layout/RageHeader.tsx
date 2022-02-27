import { FC, memo } from "react";
import { Link } from "react-router-dom";
import { Layout as AntLayout, Row, Col } from "antd";

import { PhoneOutlined, MailOutlined, FacebookFilled } from "@ant-design/icons";

import "./Layout.css";

const { Header } = AntLayout;

const RageHeader: FC = memo(() => {
  return (
    <AntLayout className="layout">
      <Header className="header">
        <Row className="page-header-row" justify="space-around" align="middle">
          <Col span={5}>
            <Link className="logo" to="/">
              White books
            </Link>
          </Col>
          <Col span={4}>
            <Row align="middle">
              <Col>
                <PhoneOutlined className="contacts-icon" />
              </Col>
              <Col>
                <Row className="contacts">(032) 292-00-00</Row>
                <Row className="contacts">(032) 255-00-00</Row>
              </Col>
            </Row>
          </Col>
          <Col span={4}>
            <Row className="contacts">
              <MailOutlined className="contacts-icon" />
              <Link to="mailto:p.yaryna@gmail.com">Write us</Link>
            </Row>
            <Row className="contacts">
              <FacebookFilled className="contacts-icon" />
              <Link to="https://www.facebook.com/profile.php?id=100008201021812">
                Facebook
              </Link>
            </Row>
          </Col>
          <Col span={4}>
            <Row className="auth-control">
              <Link to="/">Log in</Link>
            </Row>
            <Row className="auth-control">
              <Link to="/">Sign up</Link>
            </Row>
          </Col>
        </Row>
      </Header>
    </AntLayout>
  );
});

export default RageHeader;
