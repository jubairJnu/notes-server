export const catchAsync =
  (fn: Function) =>
  (...args: any[]) =>
    fn(...args).catch((err: any) => {
      throw err;
    });
