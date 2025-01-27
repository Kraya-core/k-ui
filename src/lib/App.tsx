import React from "react";
import { toLoweercase } from "../utils/toLowercase";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import TextTruncate from "@/components/common/TextTruncate";
import { Button } from "@/components/ui/button";

function App() {
  return (
    <div className="p-5">
      <h1 className="p-5 text-[7rem]">Hello 2</h1>
      <p className="">{toLoweercase("HHELLO")}</p>
      <Button variant="destructive">Cancel</Button>
      <TextTruncate
        text={
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, ullam?"
        }
        limit={10}
      />

      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default App;
