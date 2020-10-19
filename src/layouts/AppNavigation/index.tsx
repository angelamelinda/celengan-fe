import React, { FC } from 'react';
import BottomNavigation from '../../components/BottomNavigation';
import Navigation from '../../components/Navigation';
import { AppNavigationWrapper } from './styled';

interface IAppNavigation {
  title: string;
  onClickNavigation?: () => void;
  onClickAdd?: () => void;
  onLogout?: () => void;
  username?: string;
  bottomNavigation?: boolean;
}

const AppNavigation: FC<IAppNavigation> = ({
  children,
  title,
  onClickNavigation,
  onClickAdd,
  onLogout,
  username,
  bottomNavigation,
}) => {
  return (
    <AppNavigationWrapper className={bottomNavigation ? 'has-bottom' : ''}>
      <Navigation
        title={title}
        onClickAdd={onClickAdd}
        onClickNavigation={onClickNavigation}
        onLogout={onLogout}
        username={username}
      />
      {children}
      {bottomNavigation && <BottomNavigation />}
    </AppNavigationWrapper>
  );
};

export default AppNavigation;
