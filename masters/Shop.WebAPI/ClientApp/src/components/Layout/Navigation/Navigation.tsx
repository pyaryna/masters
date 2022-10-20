import { memo, FC } from "react";
import { useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { Row, Col } from "antd";

import NavigationTab from "./NavigationTab";
import LanguageChanger from "./LanguageChanger";

import "./Navigation.css";

const Navigation: FC = memo(() => {
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <div className="navigation">
      <Row justify="space-between" align="bottom">
        <Col>
          <Row justify="space-between">
            <Col>
              <Row justify="start" align="bottom">
                <Col className="nav-item">
                  <NavigationTab
                    title={t("navigation.about")}
                    url="/about-us"
                    isActive={location && location.pathname === "/about-us"}
                  />
                </Col>
                <Col className="nav-item">
                  <NavigationTab
                    title={t("navigation.book-shop")}
                    url="/"
                    isActive={location && location.pathname === "/"}
                  />
                </Col>
                <Col className="nav-item">
                  <NavigationTab
                    title={t("navigation.collaborative")}
                    url="/collab-recom"
                    isActive={location && location.pathname === "/collab-recom"}
                  />
                </Col>
                <Col className="nav-item">
                  <NavigationTab
                    title={t("navigation.content")}
                    url="/content-recom"
                    isActive={location && location.pathname === "/content-recom"}
                  />
                </Col>
                <Col className="nav-item">
                  <NavigationTab
                    title={t("navigation.contacts")}
                    url="/contacts"
                    isActive={location && location.pathname === "/contacts"}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col>
          <LanguageChanger />
        </Col>
      </Row>
    </div>
  );
});

export default Navigation;
