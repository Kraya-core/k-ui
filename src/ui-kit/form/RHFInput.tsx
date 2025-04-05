"use client";
import React, { useContext, useMemo } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { IRHFInput } from "@/typings/ui-kit/forms/form.typings";
import {
  FormSchemaContext,
  useFormSchema,
} from "@/components/wrapper/FormSchemaProvider";

function RHFInput<IValues>({
  name,
  label,
  value,
  disabled = false,
  className = "",
  type = "text",
  ...props
}: IRHFInput) {
  const { control } = useFormContext();
  const schema = useFormSchema();

  const isRequired = useMemo(() => {
    if (!schema) return false;
    return !(
      (schema._def as any)?.shape?.()?.[name]?.safeParse(undefined)?.success ||
      (schema._def as any)?.shape?.()?.[name]?.safeParse(null)?.success
    );
  }, [schema]);

  return (
    <FormField
      name={name as string}
      control={control}
      render={({ field }) => (
        <FormItem
          className={`w-full flex flex-col justify-start items-start ${
            disabled ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
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
            <Input
              type={type}
              {...field}
              {...props}
              value={value || field.value || ""}
              defaultValue={undefined}
              style={{
                opacity: disabled ? 0.8 : 1,
                pointerEvents: disabled ? "none" : "all",
              }}
              onChange={(e) => {
                field.onChange(e.target.value);
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default RHFInput;
