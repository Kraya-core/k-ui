import { IRHFArrayField } from "@/typings/ui-kit/forms/form.typings";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import RHFInput from "./RHFInput";
import { Button } from "@/components/ui/button";

function RHFArrayField<T = unknown>({
  label,
  name,
  appendObj,
  renderChildren,
}: IRHFArrayField<T>) {
  const { control } = useFormContext();
  const { append, fields, remove } = useFieldArray({ control, name });
  return (
    <div>
      <div>
        <Button onClick={() => append(appendObj)}>Add Element</Button>
      </div>
      <div className="flex flex-col gap-3">
        {fields.map((field, index) =>
          renderChildren({ field, index, remove, baseName: name })
        )}
      </div>
    </div>
  );
}

export default RHFArrayField;
