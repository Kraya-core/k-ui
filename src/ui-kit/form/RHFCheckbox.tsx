import React, { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { IRHFCheckbox } from "@/typings/ui-kit/forms/form.typings";
import { Checkbox } from "@/components/ui/checkbox";
import { useFormSchema } from "@/components/wrapper/FormSchemaProvider";

function RHFCheckbox({ label, name, className, disabled }: IRHFCheckbox) {
  const { control, setValue } = useFormContext();

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
      control={control}
      name={name}
      disabled={disabled}
      render={({ field }) => (
        <FormItem>
          <div
            className={
              className || "w-full flex gap-1 justify-start items-center"
            }
          >
            <FormControl>
              <Checkbox
                onCheckedChange={(newVal) => setValue(name, newVal)}
                checked={field.value}
              />
            </FormControl>
            {label && (
              <FormLabel
                className={`text-[0.7rem] 2xl:text-[0.8rem] -mb-1 font-medium ${
                  disabled
                    ? "text-input_disabled"
                    : "text-light-primary dark:text-dark_text_tertiary"
                }`}
              >
                {label}
                {isRequired && "*"}
              </FormLabel>
            )}
          </div>
        </FormItem>
      )}
    />
  );
}

export default RHFCheckbox;
