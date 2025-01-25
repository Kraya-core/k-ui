export interface ITextTruncateProps {
    className?: string;
    align?: string;
    text: string;
    limit?: number;
}
declare function TextTruncate({ className, align, text, limit, }: ITextTruncateProps): import("react/jsx-runtime").JSX.Element;
export default TextTruncate;
