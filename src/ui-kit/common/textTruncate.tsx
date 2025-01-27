import React from "react";
import { ITextTruncateProps } from "@/typings/ui-kit/text/textTruncate.typings";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function TextTruncate({
  className = "",
  align = "left",
  text = "",
  limit = 30,
}: ITextTruncateProps) {
  return text?.length > limit ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild type="button" className={`text-${align}`}>
          <span className={className}>{`${text.substring(0, limit)}...`}</span>
        </TooltipTrigger>
        <TooltipContent>{text}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    <span className={className}>{text}</span>
  );
}

export default TextTruncate;
