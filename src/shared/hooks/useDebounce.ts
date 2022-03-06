import { useCallback, useRef } from 'react';

interface Props {
  callback: (...args: any) => any;
  delay: number;
}

export default (props: Props) => {
  const { callback, delay } = props;
  const timer = useRef<any>(null);

  const debouncedCallback = useCallback(
    (...args) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }

      timer.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );

  return debouncedCallback;
};
