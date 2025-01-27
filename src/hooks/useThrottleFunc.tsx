import { useRef, useCallback } from "react";

function useThrottleFunc<T extends (...args: any[]) => void>(
  func: T,
  delay: number = 10000
): T {
  const lastExecuted = useRef<number>(0);

  const throttledFunction = useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      if (now - lastExecuted.current >= delay) {
        lastExecuted.current = now;
        func(...args);
      }
    },
    [func, delay]
  );

  return throttledFunction as T;
}

export default useThrottleFunc;
