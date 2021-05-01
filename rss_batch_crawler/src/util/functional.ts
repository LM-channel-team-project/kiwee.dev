export async function asyncMap<T, R>(
  fn: ((item: T) => R) | undefined,
  asyncFn: ((item: T) => Promise<R>) | undefined,
  iter: Iterable<T> | AsyncGenerator<T>
): Promise<R[]> {
  const ret: R[] = [];
  for await (const item of iter) {
    if (fn) ret.push(fn(item));
    else if (asyncFn) ret.push(await asyncFn(item));
  }
  return ret;
}
export async function* filter<T>(
  fn: (item: T, comp: any) => {},
  iter: Iterable<T | Promise<T>>,
  comp: any
): AsyncGenerator<T> {
  for (const item of iter) {
    if (item instanceof Promise) {
      fn(await item, comp) ? yield item : '';
    } else {
      fn(item, comp) ? yield item : '';
    }
  }
}

export async function asyncForEach<T>(fn: (item: T) => {}, iter: Iterable<T>) {
  for await (const item of iter) {
    item instanceof Promise ? item.then(fn) : fn(item);
  }
}
