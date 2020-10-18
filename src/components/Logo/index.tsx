import React, { FC } from "react";
import { LogoAppName, LogoSlogan, LogoWrapper } from "./styled";

const Logo: FC = () => {
  return (
    <LogoWrapper>
      <LogoAppName>
        <span>C</span>LENGAN
      </LogoAppName>
      <LogoSlogan>Your Financial Assistant</LogoSlogan>
    </LogoWrapper>
  );
};

export default Logo;
