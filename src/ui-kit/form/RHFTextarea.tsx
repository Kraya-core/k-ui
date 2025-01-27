"use client";
import React, { useMemo } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { IRHFInput, IRHFTextarea } from "@/typings/ui-kit/forms/form.typings";
import { Textarea } from "@/components/ui/textarea";
import { useFormSchema } from "@/components/wrapper/FormSchemaProvider";

function RHFTextarea({
  name,
  label,
  value,
  rows = 5,
  disabled = false,
  className = "",
  type = "text",
  ...props
}: IRHFTextarea) {
  const { control } = useFormContext();
  const schema = useFormSchema();

  const isRequired = useMemo(() => {
    if (!schema) return false;
    return !(
      (schema._def as any)?.shape()?.[name]?.safeParse(undefined)?.success ||
      (schema._def as any)?.shape()?.[name]?.safeParse(null)?.success
    );
  }, [schema]);

  return (
    <FormField
      name={name as string}
      control={control}
      render={({ field }) => (
        <FormItem className="w-full h-full flex flex-col justify-start items-start">
          {label && (
            <FormLabel
              className={`text-[0.7rem] 2xl:text-[0.8rem] -mb-1 font-medium ${
                disabled
                  ? "text-light-secondary"
                  : "text-light-primary dark:text-dark_text_tertiary"
              }`}
            >
              {label}
              {isRequired && "*"}
            </FormLabel>
          )}
          <FormControl>
            <Textarea
              rows={rows}
              className={className}
              {...field}
              {...props}
              value={value || field.value || ""}
              disabled={disabled}
              onChange={(e) =>
                field.onChange(
                  type === "number" ? Number(e.target.value) : e.target.value
                )
              }
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default RHFTextarea;
