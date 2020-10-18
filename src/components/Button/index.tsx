import React, { FC } from "react";
import { Link } from "react-router-dom";

interface IButton {
  onClick?: () => void;
  color?: string;
  className?: string;
  url?: string;
}

const ButtonComponent: FC<IButton> = ({
  onClick,
  color,
  children,
  className,
  url,
}) => {
  if (url) {
    return (
      <Link to={url} className={className} color={color} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <div className={className} color={color} onClick={onClick}>
      {children}
    </div>
  );
};

export default ButtonComponent;
