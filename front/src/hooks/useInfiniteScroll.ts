import { useState, useEffect, useRef } from 'react';

interface PropTypes {
  callbackFn?: IntersectionObserverCallback;
  (entries: IntersectionObserverEntry[], observer: IntersectionObserver): void;
}

function useInfiniteScroll(callbackFn: PropTypes) {
  const [target, setTarget] = useState<HTMLElement | null>(null);
  const io = useRef<IntersectionObserver | null>(null);

  const options = {
    root: null,
    rootMargin: '0px 0px 0px 0px',
    threshold: 0,
  };

  useEffect(() => {
    if (!target) return;

    io.current = new IntersectionObserver(callbackFn, options);
    io.current.observe(target);

    return () => {
      io.current && io.current.disconnect();
    };
  }, [target]);

  const onInfiniteScrollUpdate = (target: HTMLElement | null) => {
    if (target) {
      setTarget(target);
    }
  };

  const onInfiniteScrollDisconnect = () => {
    return io.current && io.current.disconnect();
  };
  return [onInfiniteScrollUpdate, onInfiniteScrollDisconnect];
}

export default useInfiniteScroll;
