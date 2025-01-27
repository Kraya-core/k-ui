export function parseReqString(
  base: string,
  filters?: Record<string, any>
): string {
  if (!filters) return base;
  return Object.entries(filters).reduce((prev, curr, index) => {
    if (curr[1]) {
      if (Array.isArray(curr[1])) {
        const reqArrayParams = curr[1].reduce(
          (previous, current, index) => `${previous}${curr[0]}=${current}&`,
          ""
        );
        return `${prev}${index === 0 ? "?" : ""}${reqArrayParams}`;
      }
      return `${prev.includes("?") ? prev : `${prev}?`}${curr[0]}=${curr[1]}&`;
    }
    return prev;
  }, base);
}
