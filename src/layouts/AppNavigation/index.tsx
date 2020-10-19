import React, { FC } from 'react';
import Navigation from '../../components/Navigation';

interface IAppNavigation {
  title: string;
  onClickNavigation?: () => void;
  onClickAdd?: () => void;
  onLogout?: () => void;
}

const AppNavigation: FC<IAppNavigation> = ({
  children,
  title,
  onClickNavigation,
  onClickAdd,
  onLogout,
}) => {
  return (
    <>
      <Navigation
        title={title}
        onClickAdd={onClickAdd}
        onClickNavigation={onClickNavigation}
        onLogout={onLogout}
      />
      {children}
    </>
  );
};

export default AppNavigation;
