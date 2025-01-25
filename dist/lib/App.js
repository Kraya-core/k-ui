import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Button from "../components/Button";
import { toLoweercase } from "../utils/toLowercase";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "@/components/ui/accordion";
import TextTruncate from "@/components/common/TextTruncate";
function App() {
    return (_jsxs("div", { className: "p-5", children: [_jsx("h1", { className: "p-5 text-[7rem] bg-light-bg", children: "Hello 2" }), _jsx(Button, { children: "Heyy" }), _jsx("p", { className: "text-red-200", children: toLoweercase("HHELLO") }), _jsx(TextTruncate, { text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, ullam?", limit: 10 }), _jsx(Accordion, { type: "single", collapsible: true, children: _jsxs(AccordionItem, { value: "item-1", children: [_jsx(AccordionTrigger, { children: "Is it accessible?" }), _jsx(AccordionContent, { children: "Yes. It adheres to the WAI-ARIA design pattern." })] }) })] }));
}
export default App;
