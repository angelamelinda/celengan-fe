import React, { FC } from "react";
import Navigation from "../../components/Navigation";

interface IAppNavigation {
  title: string;
  onClickNavigation?: () => void;
  onClickAdd?: () => void;
}

const AppNavigation: FC<IAppNavigation> = ({
  children,
  title,
  onClickNavigation,
  onClickAdd,
}) => {
  return (
    <>
      <Navigation
        title={title}
        onClickAdd={onClickAdd}
        onClickNavigation={onClickNavigation}
      />
      {children}
    </>
  );
};

export default AppNavigation;
