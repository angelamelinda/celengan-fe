import React, { FC } from 'react';
import {
  NavigationAdd,
  NavigationBack,
  NavigationLogout,
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
}

const Navigation: FC<INavigation> = ({
  title,
  onClickNavigation,
  onClickAdd,
  onLogout,
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
        <NavigationLogout onClick={onLogout}>
          <FiLogOut />
        </NavigationLogout>
      )}
    </NavigationWrapper>
  );
};

export default Navigation;
