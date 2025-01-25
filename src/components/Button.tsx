import React from "react";

export interface IProps {
  children: React.ReactNode;
}

function Button({ children }: IProps) {
  return <button type="button">{children}</button>;
}

export default Button;
