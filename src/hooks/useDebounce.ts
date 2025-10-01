import { useEffect, useState } from 'react';

export const useDebounce = <T>(value: T, delay: number = 300): T => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const debounceHandler = setTimeout(() => setDebounceValue(value), delay);

    return () => clearTimeout(debounceHandler);
  }, [value, delay]);

  return debounceValue;
};
