import React, { FC } from "react";
import { COLOR } from "../../constants";
import { LoaderContainer } from "./styled";

const Loader: FC = () => {
  return (
    <LoaderContainer>
      <svg width="34" height="12" viewBox="-1 0 33 12">
        <circle
          className="stardust-spinner"
          cx="4"
          cy="6"
          r="4"
          fill={`${COLOR.PRIMARY}`}
        />
        <circle
          className="stardust-spinner"
          cx="16"
          cy="6"
          r="4"
          fill={`${COLOR.PRIMARY}`}
        />
        <circle
          className="stardust-spinner"
          cx="28"
          cy="6"
          r="4"
          fill={`${COLOR.PRIMARY}`}
        />
      </svg>
    </LoaderContainer>
  );
};

export default Loader;
