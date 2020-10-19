import React, { FC } from 'react';
import {
  NavigationAdd,
  NavigationBack,
  NavigationLogout,
  NavigationLogoutProfile,
  NavigationTitle,
  NavigationWrapper,
} from './styled';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { IoIosAdd } from 'react-icons/io';
import { FiLogOut } from 'react-icons/fi';

interface INavigation {
  title: string;
  onClickNavigation?: () => void;
  onClickAdd?: () => void;
  onLogout?: () => void;
  username?: string;
}

const Navigation: FC<INavigation> = ({
  title,
  onClickNavigation,
  onClickAdd,
  onLogout,
  username,
}) => {
  return (
    <NavigationWrapper>
      {onClickNavigation && (
        <NavigationBack onClick={onClickNavigation}>
          <MdKeyboardArrowLeft />
        </NavigationBack>
      )}
      <NavigationTitle>{title}</NavigationTitle>
      {onClickAdd && (
        <NavigationAdd onClick={onClickAdd}>
          <IoIosAdd />
        </NavigationAdd>
      )}
      {onLogout && (
        <NavigationLogoutProfile>
          {username && `Hi, ${username} `}
          <NavigationLogout onClick={onLogout}>
            <FiLogOut />
          </NavigationLogout>
        </NavigationLogoutProfile>
      )}
    </NavigationWrapper>
  );
};

export default Navigation;
