import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button/styled';
import Logo from '../../components/Logo';
import { APP_URL } from '../../constants';
import {
  SplashscreenBottom,
  SplashscreenLoginLink,
  SplashscreenRegisterButton,
  SplashscreenTop,
  SplashscreenWrapper,
} from './styled';

const Splashscreen: FC = () => {
  return (
    <SplashscreenWrapper>
      <SplashscreenTop>
        <Logo />
      </SplashscreenTop>
      <SplashscreenBottom>
        <SplashscreenRegisterButton>
          <Button url={APP_URL.REGISTER}>REGISTER</Button>
        </SplashscreenRegisterButton>
        <SplashscreenLoginLink>
          Already have an account? <Link to={APP_URL.LOGIN}>LOG IN</Link>
        </SplashscreenLoginLink>
      </SplashscreenBottom>
    </SplashscreenWrapper>
  );
};

export default Splashscreen;
