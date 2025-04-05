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
import { IRHFInput } from "@/typings/ui-kit/forms/form.typings";
// import useToasts from "@/hooks/use-toast";
import { useFormSchema } from "@/components/wrapper/FormSchemaProvider";

export const NUMBER_REGEX = /^[0-9.-]+$/;

function RHFNumericInput<IValues>({
  name,
  label,
  value,
  disabled = false,
  className = "",
  ...props
}: IRHFInput) {
  // const { tWarning } = useToasts();
  const { control, setError } = useFormContext();

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
        <FormItem className="w-full flex flex-col justify-start items-start">
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
              className={className}
              type={"text"}
              {...field}
              {...props}
              value={value || field.value || ""}
              style={{
                opacity: disabled ? 0.5 : 1,
                pointerEvents: disabled ? "none" : "all",
              }}
              onChange={(e) => {
                if (e.target.value !== "" && !NUMBER_REGEX.test(e.target.value))
                  return;
                field.onChange(e.target.value);
              }}
              onBlur={(e) => {
                if (isNaN(Number(e.target.value))) {
                  field.onChange(0);
                  setError(name, { message: "Invalid input" });
                  // return tWarning("Invalid input");
                }
                field.onChange(Number(e.target.value));
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default RHFNumericInput;
