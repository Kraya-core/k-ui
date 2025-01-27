import React, { useEffect, useState } from "react";

function useDebounce<T>(value: T, delay = 5000) {
  const [debouncedvalue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedvalue;
}

export default useDebounce;
