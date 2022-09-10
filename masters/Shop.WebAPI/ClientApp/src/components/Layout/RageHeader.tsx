import { FC, memo, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Layout as AntLayout, Row, Col, Select } from "antd";

import { IUser } from "../../types/IUser";

import { PhoneOutlined, MailOutlined, FacebookFilled } from "@ant-design/icons";

import "./Layout.css";

const { Header } = AntLayout;
const { Option } = Select;

const RageHeader: FC = memo(() => {
  const [users, setUsers] = useState<IUser>();

  const fetchUsers = useCallback(() => {

  }, [setUsers])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  return (
    <AntLayout className="layout">
      <Header className="header">
        <Row className="page-header-row" justify="space-between" align="middle">
          <Col span={6}>
            <Link className="logo" to="/">
              White books
            </Link>
          </Col>
          <Col span={6} >
            User
            <Select >

            </Select>
          </Col>
          {/* <Col span={4}>
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
          <Col span={4}>
            <Row className="auth-control">
              <Link to="/">Log in</Link>
            </Row>
            <Row className="auth-control">
              <Link to="/">Sign up</Link>
            </Row>
          </Col> */}
        </Row>
      </Header>
    </AntLayout>
  );
});

export default RageHeader;
