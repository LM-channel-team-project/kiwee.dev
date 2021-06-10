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

  const onInfiniteScrollInit = (target: HTMLElement | null) => {
    setTarget(target);
  };
  const onInfiniteScrollUpdate = () => {
    return io.current && io.current.observe(target as HTMLElement);
  };

  const onInfiniteScrollDisconnect = () => {
    console.log('disco');
    return io.current && io.current.disconnect();
  };

  return [onInfiniteScrollInit, onInfiniteScrollUpdate, onInfiniteScrollDisconnect];
}

export default useInfiniteScroll;
