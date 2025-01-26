"use client";
import React from "react";
import { Loader2Icon } from "lucide-react";
import { ILoaderProps } from "@/typings/ui-kit/loader/loader.typings";
import { Icon } from "@iconify-icon/react";

export function Loader({ className }: ILoaderProps) {
  return (
    <Icon
      icon="line-md:loading-twotone-loop"
      width="24"
      height="24"
      className={`text-light-secondary ${className}`}
    />
  );
}
