function debounce<Params extends unknown[]>(func: (...args: Params) => unknown, delay: number) {
  let timeout: NodeJS.Timeout | null = null;
  return function (...args: Params) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      timeout = null;
      func(...args);
    }, delay);
  };
}

export default debounce;
