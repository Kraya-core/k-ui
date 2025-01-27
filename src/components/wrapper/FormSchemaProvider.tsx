"use client";
import React, { createContext, useContext } from "react";
import { z } from "zod";

export const FormSchemaContext = createContext<z.ZodTypeAny | null>(null);

export const FormSchemaProvider = <T extends z.ZodTypeAny>({
  schema,
  children,
}: {
  schema: T;
  children: React.ReactNode;
}) => (
  <FormSchemaContext.Provider value={schema}>
    {children}
    <></>
  </FormSchemaContext.Provider>
);

export const useFormSchema = () => {
  const schema = useContext(FormSchemaContext);
  if (!schema) {
    throw new Error("useFormSchema must be used within a FormSchemaProvider");
  }
  return schema;
};
