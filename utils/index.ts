export const sleep = (ms: number = 0) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export const debounce = (fn: (...args: any[]) => void, delay: number) => {
  let timer: NodeJS.Timeout;

  return function (this: unknown, ...args: any[]) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}