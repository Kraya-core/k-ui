import { ButtonProps } from "@/components/ui/button";

export interface IAsyncButtonProps extends ButtonProps {
  onClick: (...args: any) => Promise<any> | any;
}
