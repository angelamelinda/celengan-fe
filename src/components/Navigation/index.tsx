import React, { FC } from 'react';
import {
  NavigationAdd,
  NavigationBack,
  NavigationTitle,
  NavigationWrapper,
} from './styled';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { IoIosAdd } from 'react-icons/io';

interface INavigation {
  title: string;
  onClickNavigation?: () => void;
  onClickAdd?: () => void;
}

const Navigation: FC<INavigation> = ({
  title,
  onClickNavigation,
  onClickAdd,
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
    </NavigationWrapper>
  );
};

export default Navigation;
