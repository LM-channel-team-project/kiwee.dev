import { useState, useEffect } from 'react';

function useDebounce<ValueType = unknown>(value: ValueType, delay: number): ValueType {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(typeof value === 'function' ? value() : value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debounceValue;
}

export default useDebounce;
