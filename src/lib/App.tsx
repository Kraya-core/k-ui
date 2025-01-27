import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { z } from "zod";
import { RHFForm, RHFInput, RHFPasswordInput } from "@/ui-kit";
import { Button } from "@/components/ui/button";

function App() {
  const defaultValues = {
    name: "",
    password: "",
  };

  const validationSchema = z.object({
    name: z.string().min(1, { message: "This is a required field" }),
    password: z.string().min(1, { message: "This is a required field" }),
  });

  const onSubmit = (values: typeof defaultValues) => {
    console.log({ values });
  };

  return (
    <div className="p-5">
      <h1 className="p-5 text-[7rem] bg-light-bg">Hello 2</h1>
      <div>
        <RHFForm
          defaultValues={defaultValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <RHFInput label="Name" name="name" />
          <RHFPasswordInput label="Password" name="password" />
          <Button type="submit">Submit</Button>
        </RHFForm>
      </div>
    </div>
  );
}

export default App;
