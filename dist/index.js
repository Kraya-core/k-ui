import * as react_jsx_runtime from 'react/jsx-runtime';
import React from 'react';
import { ClassValue } from 'clsx';

interface IProps {
    children: React.ReactNode;
}
declare function Button({ children }: IProps): react_jsx_runtime.JSX.Element;

interface ITextTruncateProps {
    className?: string;
    align?: string;
    text: string;
    limit?: number;
}
declare function TextTruncate({ className, align, text, limit, }: ITextTruncateProps): react_jsx_runtime.JSX.Element;

declare function cn(...inputs: ClassValue[]): string;

export { Button, TextTruncate, cn };
//# sourceMappingURL=index.js.map
