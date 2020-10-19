import React from 'react';
import { BiWallet } from 'react-icons/bi';
import { GrPlan } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import { APP_URL } from '../../constants';
import {
  BottomNavigationItemIcon,
  BottomNavigationItemName,
  BottomNavigationWrapper,
} from './styled';

const BottomNavigation = () => {
  return (
    <BottomNavigationWrapper>
      <Link className="bottom-nav-item" to={APP_URL.CASHFLOW}>
        <BottomNavigationItemIcon>
          <BiWallet />
        </BottomNavigationItemIcon>
        <BottomNavigationItemName>Transaction</BottomNavigationItemName>
      </Link>
      <Link
        className="bottom-nav-item center"
        to={APP_URL.NEW_CASHFLOW.replace(':type', 'expense')}
      >
        +
      </Link>
      <Link className="bottom-nav-item" to={APP_URL.BUDGET}>
        <BottomNavigationItemIcon>
          <GrPlan />
        </BottomNavigationItemIcon>
        <BottomNavigationItemName>Budget</BottomNavigationItemName>
      </Link>
    </BottomNavigationWrapper>
  );
};

export default BottomNavigation;
