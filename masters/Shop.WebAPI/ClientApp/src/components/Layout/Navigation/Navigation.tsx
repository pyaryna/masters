import { memo, FC } from "react";
import { useLocation } from "react-router";
import { Row, Col } from "antd";

import NavigationTab from "./NavigationTab";

import "./Navigation.css";

const Navigation: FC = memo(() => {
  const location = useLocation();

  return (
    <div className="navigation">
      <Row justify="space-between">
        <Col>
          <Row justify="start" align="bottom">
            <Col className="nav-item">
              <NavigationTab
                title="About us"
                url="/about-us"
                isActive={location && location.pathname === "/about-us"}
              />
            </Col>
            <Col className="nav-item">
              <NavigationTab
                title="Book shop"
                url="/"
                isActive={location && location.pathname === "/"}
              />
            </Col>
            <Col className="nav-item">
              <NavigationTab
                title="Contacts"
                url="/contacts"
                isActive={location && location.pathname === "/contacts"}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
});

export default Navigation;
