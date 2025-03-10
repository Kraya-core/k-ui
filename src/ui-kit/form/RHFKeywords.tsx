"use client";
import React, { useContext, useMemo, useState } from "react";
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
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
// import useToasts from "@/hooks/use-toast";

function RHFKeywords({
  name,
  label,
  value,
  disabled = false,
  className = "",
  type = "text",
  ...props
}: IRHFInput) {
  // const { tWarning } = useToasts();
  const { control, setValue, setError } = useFormContext();
  const schema = useFormSchema();

  const [inputVal, setInputVal] = useState<string | null>(null);

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
        <FormItem className="w-full flex flex-col justify-start items-start">
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
          <FormControl>
            <div className="w-full">
              <Input
                className={className}
                type={type}
                {...field}
                {...props}
                value={inputVal || ""}
                style={{
                  opacity: disabled ? 0.5 : 1,
                  pointerEvents: disabled ? "none" : "all",
                }}
                onChange={(e) => {
                  if (!Array.isArray(field.value)) return;
                  if (e.target.value.includes(",")) {
                    const keyword = e.target.value.replace(",", "");
                    if (field.value.includes(keyword)) {
                      // tWarning("Entry already exists!");
                      setError(name, { message: "Value already exists" });
                    } else {
                      setValue(name, [...field.value, keyword]);
                    }

                    setInputVal(null);
                  } else {
                    setInputVal(e.target.value);
                  }
                }}
              />
              {Array.isArray(field.value) && field.value.length >= 1 && (
                <div className="flex flex-wrap max-h-[25%] gap-2 justify-start items-start mt-2 p-2 border border-secondary rounded-sm">
                  {field.value.map((text, index) => (
                    <KeywordChip
                      key={text + index}
                      text={text}
                      onRemove={(text: string) => {
                        setValue(
                          name,
                          field.value.filter((ele: string) => ele !== text)
                        );
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default RHFKeywords;

interface IProps {
  text: string;
  onRemove?: (text: string) => void;
}

export function KeywordChip({ onRemove, text }: IProps) {
  return (
    <div className="p-1 border border-secondary rounded-sm flex gap-1 justify-between items-center">
      <p className="text-[0.6rem]">{text}</p>
      <Button
        type="button"
        variant={"ghost"}
        size={"icon"}
        onClick={() => (onRemove ? onRemove(text) : null)}
        className="w-fit h-fit"
      >
        <X className="w-[0.75rem] h-[0.75rem]" />
      </Button>
    </div>
  );
}
