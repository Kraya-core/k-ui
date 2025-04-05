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
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify-icon/react";

function RHFPasswordInput<IValues>({
  name,
  label,
  value,
  disabled = false,
  className = "",
  type = "password",
  ...props
}: IRHFInput) {
  const { control } = useFormContext();
  const schema = useFormSchema();
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

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
            <div className="w-full flex h-10 2xl:h-12 bg-background bg-white ring-offset-background file:border-0 file:bg-transparent file:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 placeholder:font-normal placeholder:opacity-[0.6] text-light-primary dark:text-white font-normal rounded-md px-2 py-3 outline-none text-[0.7rem] placeholder:text-[0.7rem] 2xl:placeholder:text-[0.8rem] border placeholder:text-light-secondary md:py-4 lg:py-3 dark:bg-dark_bg2 dark:border-dark_border dark:placeholder:text-dark_text_secondary dark:text-dark_text_primary 2xl:text-[0.8rem] justify-start items-center border-[#E5E5E5]/60">
              <Input
                className="bg-transparent border-none w-[90%] p-0 rounded-md py-3 outline-none text-[0.8rem]  placeholder:text-[0.8rem] placeholder:text-black md:py-4 md:text-[0.9rem] md:placeholder:text-[0.9rem]  lg:text-[0.8rem] lg:placeholder:text-[0.8rem] shadow-none"
                type={showPassword ? "text" : "password"}
                {...field}
                {...props}
                value={value || field.value || ""}
                defaultValue={undefined}
                style={{
                  opacity: disabled ? 0.5 : 1,
                  pointerEvents: disabled ? "none" : "all",
                }}
                onChange={(e) => {
                  if (type === "number") {
                    field.onChange(Number(e.target.value));
                  } else {
                    field.onChange(e.target.value);
                  }
                }}
              />
              <Button
                variant={"ghost"}
                type="button"
                size={"icon"}
                onClick={handleShowPassword}
                className="p-1 hover:bg-white h-8 w-[10%] flex justify-end items-center hover:h-8"
              >
                <Icon
                  icon={
                    showPassword ? "mdi:eye-outline" : "mdi:eye-off-outline"
                  }
                  width={"0.9rem"}
                  height={"0.9rem"}
                  className="text-light-primary"
                />
              </Button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default RHFPasswordInput;
