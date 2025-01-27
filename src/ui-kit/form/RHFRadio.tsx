"use client";
import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { IRHFRadio } from "@/typings/ui-kit/forms/form.typings";
import { RadioGroup } from "@/components/ui/radio-group";

function RHFRadio<IValues>({
  name,
  disabled = false,
  className = "",
  type = "radio",
  children,
  defaultValue,
  ...props
}: IRHFRadio) {
  const { control } = useFormContext();
  return (
    <FormField
      name={name as string}
      disabled={disabled}
      control={control}
      render={({ field }) => (
        <FormItem className="w-full flex flex-col justify-start items-start">
          <FormControl>
            <RadioGroup
              defaultValue={defaultValue}
              className="flex justify-start items-center gap-6"
              {...field}
              onValueChange={field.onChange}
            >
              {children}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default RHFRadio;
