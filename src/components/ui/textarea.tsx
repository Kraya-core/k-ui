import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex bg-background bg-white ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-80  placeholder:font-normal placeholder:opacity-[0.6] text-light-primary dark:text-white font-normal rounded-md w-full px-2 py-3 outline-none text-[0.7rem] placeholder:text-[0.7rem] 2xl:placeholder:text-[0.8rem]  border placeholder:text-light-secondary md:py-4 border-light-border lg:py-3 dark:bg-dark_bg2 dark:border-dark_border dark:placeholder:text-dark_text_secondary dark:text-dark_text_primary",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };