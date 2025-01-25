import React from "react";
import Button from "../components/Button";
import { toLoweercase } from "../utils/toLowercase";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import TextTruncate from "@/components/common/TextTruncate";

function App() {
  return (
    <div className="p-5">
      <h1 className="p-5 text-[7rem] bg-light-bg">Hello 2</h1>
      <Button>Heyy</Button>
      <p className="text-red-200">{toLoweercase("HHELLO")}</p>
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
