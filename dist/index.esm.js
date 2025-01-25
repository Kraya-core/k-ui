import React from 'react';
import { ClassValue } from 'clsx';

interface IProps {
    children: React.ReactNode;
}

interface ITextTruncateProps {
    className?: string;
    align?: string;
    text: string;
    limit?: number;
}

declare function cn(...inputs: ClassValue[]): string;

export { type IProps, type ITextTruncateProps, cn };
//# sourceMappingURL=index.esm.js.map
