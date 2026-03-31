"use client";

import { useState, useEffect } from "react";

export function useDebounce(value: any, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    // Set a timer to update debouncedValue after delay
    const timer = setTimeout(() => {
      setDebouncedValue(value);
      console.log("debouncedValue", value);
    }, delay);

    // Cleanup: cancel timer if value changes before delay
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
