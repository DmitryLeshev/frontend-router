import React, { useEffect, useRef } from "react";

export interface IProps {
  parentRef: HTMLElement;
  childRef: HTMLElement;
  callback: () => any;
}

export default function useScroll({ parentRef, childRef, callback }: IProps) {
  const observer = useRef<any>(null);

  useEffect(() => {
    if (!parentRef || !childRef) return;
    const options = {
      root: parentRef,
      rootMargin: "160px",
      threshold: 0,
    };

    observer.current = new IntersectionObserver(([target]) => {
      if (target.isIntersecting) {
        callback();
      }
    }, options);

    observer.current.observe(childRef);

    return () => {
      // eslint-disable-next-line
      observer.current.unobserve(childRef);
    };

    // eslint-disable-next-line
  }, [parentRef, childRef, callback]);
}
