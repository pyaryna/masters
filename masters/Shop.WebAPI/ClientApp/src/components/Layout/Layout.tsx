import { FC, memo, ReactNode } from "react";
import { Layout as AntLayout } from "antd";

import RageHeader from "./RageHeader";
import Navigation from "./Navigation/Navigation";

import "./Layout.css";

const { Content, Footer } = AntLayout;

interface ILayoutProps {
  children: ReactNode;
}

const Layout: FC<ILayoutProps> = memo(({ children }: ILayoutProps) => {
  return (
    <AntLayout>
      <RageHeader />

      <Navigation />

      <Content>{children}</Content>

      <Footer>© White books, 2022</Footer>
    </AntLayout>
  );
});

export default Layout;
