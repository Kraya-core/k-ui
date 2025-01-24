import React from "react";
import Button from "../components/Button";
import { toLoweercase } from "../utils/toLowercase";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";

function App() {
  return (
    <div>
      <h1 className="p-5 text-[7rem] bg-light-bg">Hello 2</h1>
      <Button>Heyy</Button>
      <p>{toLoweercase("HHELLO")}</p>
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
