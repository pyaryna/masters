import { memo, FC } from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";

interface INavigationTabProps {
  title: string;
  url: string;
  isActive: boolean;
}

const NavigationTab: FC<INavigationTabProps> = memo(
  ({ title, url, isActive }: INavigationTabProps) => {
    return (
      <Link to={url}>
        <Button className={isActive ? "active-nav-item" : ""}>{title}</Button>
      </Link>
    );
  }
);

export default NavigationTab;
