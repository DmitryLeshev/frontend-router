import { useCallback, useState } from 'react';

interface Child {
  id: number;
}

interface Props<T> {
  initialArray: Array<T & Child>;
}

export default <T>(props: Props<T>) => {
  const { initialArray } = props;
  const [array, setArray] = useState(initialArray);

  return {
    array,
    setArray,
    addFirst: useCallback((child) => setArray((arr) => [child, ...arr]), []),
    addLast: useCallback((child) => setArray((arr) => [...arr, child]), []),
    clear: useCallback(() => setArray(() => []), []),
    removeById: useCallback((id: number) => {
      setArray((arr) => arr.filter((child) => child && child.id !== id));
    }, []),
    removeIndex: useCallback((index: number) => {
      setArray((arr) => {
        return [...arr.slice(0, index), ...arr.slice(index + 1)];
      });
    }, []),
    removeLastChild: useCallback(() => {
      setArray((arr) => arr.filter((_child, idx) => idx + 1 !== arr.length));
    }, []),
  };
};
