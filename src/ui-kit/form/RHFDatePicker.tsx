"use client";
import React, { useMemo, useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Icon } from "@iconify-icon/react";
import { useFormContext } from "react-hook-form";
import { format } from "date-fns";
import { IRHFDatePicker } from "@/typings/ui-kit/forms/form.typings";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { useFormSchema } from "@/components/wrapper/FormSchemaProvider";

function RHFDatePicker({
  name,
  label,
  disabled = false,
  className = "",
  type = "text",
  ...props
}: IRHFDatePicker) {
  const { control } = useFormContext();

  const [openModal, setOpenModal] = useState(false);

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
        <FormItem className="flex flex-col justify-start items-start w-[100%]">
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
          <Popover open={openModal} onOpenChange={setOpenModal}>
            <PopoverTrigger disabled={disabled} asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    className,
                    "h-10 pl-3 text-left font-normal dark:bg-dark_bg2 border flex justify-between",
                    !field.value && "text-muted-foreground "
                  )}
                >
                  {field.value ? (
                    format(field.value, "dd MMMM yyyy")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <Icon
                    icon="solar:calendar-minimalistic-linear"
                    width="0.8rem"
                    height="0.8rem"
                    className="text-light-secondary dark:text-dark_text_primary 2xl:scale-110"
                  />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                {...props}
                selected={field.value}
                onSelect={(e) => {
                  field.onChange(e ? e.toISOString() : undefined);
                  setOpenModal(false);
                }}
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default RHFDatePicker;
