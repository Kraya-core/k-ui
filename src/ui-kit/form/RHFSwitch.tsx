import { IRHFSwitch } from "@/typings/ui-kit/forms/form.typings";
import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

function RHFSwitch({ label, name, className, disabled }: IRHFSwitch) {
  const { control, setValue } = useFormContext();

  return (
    <FormField
      name={name}
      disabled={disabled}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className="flex items-center space-x-2">
              <Switch
                id={name}
                checked={field.value}
                onCheckedChange={(newVal) => setValue(name, newVal)}
              />
              {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default RHFSwitch;
