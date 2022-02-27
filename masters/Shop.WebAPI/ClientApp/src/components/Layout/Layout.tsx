import { FC, memo, ReactNode, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout as AntLayout, Row, Col } from "antd";
import { useHistory } from "react-router";

// import Navigation from "./Navigation/Navigation";

import "./Layout.css";
import RageHeader from "./RageHeader";

const { Header, Content, Footer } = AntLayout;

interface ILayoutProps {
  children: ReactNode;
}

const Layout: FC<ILayoutProps> = memo(({ children }: ILayoutProps) => {
  const history = useHistory();

  return (
    <AntLayout>
      <RageHeader/>

       {/* <Navigation /> */}

      <Content>{children}
      dfgyhijkl</Content>

      <Footer>© White books, 2022</Footer>
    </AntLayout>
  );
});

export default Layout;
