"use client";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";

import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IRHFForm } from "@/typings/ui-kit/forms/form.typings";
import { FormSchemaProvider } from "@/components/wrapper/FormSchemaProvider";

function RHFForm<T>({
  defaultValues,
  onSubmit,
  validationSchema,
  children,
  className = "flex flex-col gap-2",
}: IRHFForm<T>) {
  type TValidationSchema = z.infer<typeof validationSchema>;

  const form = useForm<TValidationSchema>({
    defaultValues,
    resolver: zodResolver(validationSchema),
  });

  const {
    handleSubmit,
    watch,
    formState: { errors },
  } = form;
  const values = watch();
  // console.log({ errors, values });

  return (
    <FormSchemaProvider schema={validationSchema}>
      <Form {...form}>
        <form className={className} onSubmit={handleSubmit(onSubmit)}>
          {children}
        </form>
      </Form>
    </FormSchemaProvider>
  );
}

export default RHFForm;
