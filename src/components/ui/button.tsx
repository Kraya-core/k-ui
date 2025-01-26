import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Loader } from "@/ui-kit/loader/Loader";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-[0.7rem] 2xl:text-[0.8rem] font-medium ring-offset-background transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary dark:bg-primary/80 text-primary-foreground",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 ",
        outline:
          "border border-input bg-white dark:text-dark_text_tertiary dark:hover:bg-dark_bg2  hover:bg-accent hover:text-accent-foreground dark:border-dark_border",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground  dark:hover:bg-dark_bg3 dark:text-dark_text_secondary hover:dark:text-dark_text_primary",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-8 px-2 py-0",
        sm: "h-8 rounded-md px-2",
        lg: "h-8 rounded-md 2xl:h-9 px-2 py-0",
        icon: "h-8 w-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & { loading?: boolean; disabled?: boolean }
>(
  (
    {
      className,
      variant,
      size,
      loading = false,
      disabled = false,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? <Loader /> : props.children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
