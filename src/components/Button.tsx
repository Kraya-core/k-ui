import React from "react";

interface IProps {
  children: React.ReactNode;
}

function Button({ children }: IProps) {
  return (
    <button type="button" style={{ background: "blue" }}>
      {children}
    </button>
  );
}

export default Button;
