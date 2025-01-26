import { Button } from "@/components/ui/button";
import { IAsyncButtonProps } from "@/typings/ui-kit/buttons/asyncButton.typings";
import React, { useState } from "react";

function AsyncButton({ onClick, children, ...props }: IAsyncButtonProps) {
  const [loading, setLoading] = useState(false);
  const handleClick = async () => {
    try {
      setLoading(true);
      await onClick();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleClick} loading={loading} {...props}>
      {children}
    </Button>
  );
}

export default AsyncButton;
