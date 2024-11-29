import { useCallback, useRef, useState } from "react";

export const useDebounce = (
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  fn: (...args: any[]) => void,
  wait = 500,
) => {
  const timeout = useRef<NodeJS.Timeout | null>(null);
  const [isPending, setIsPending] = useState(false);

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const debouncedFunction = useCallback(
    (...args: any[]) => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }

      setIsPending(true);

      setTimeout(() => {
        setIsPending(false);
        fn(...args);
        timeout.current = null;
      }, wait);
    },
    [fn, wait],
  );

  const cancel = useCallback(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
      timeout.current = null;
      setIsPending(false);
    }
  }, []);

  return [debouncedFunction, { isPending, cancel }] as const;
};
