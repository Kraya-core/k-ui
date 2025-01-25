import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip";
function TextTruncate({ className = "", align = "left", text = "", limit = 30, }) {
    return (text === null || text === void 0 ? void 0 : text.length) > limit ? (_jsx(TooltipProvider, { children: _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, type: "button", className: `text-${align}`, children: _jsx("span", { className: className, children: `${text.substring(0, limit)}...` }) }), _jsx(TooltipContent, { children: text })] }) })) : (_jsx("span", { className: className, children: text }));
}
export default TextTruncate;
