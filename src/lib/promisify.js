export default ($window, fn) => (...args) =>
  new Promise((resolve, reject) => {
    args.push((res, event) => {
      try {
        if (!event.status) {
          reject(event);
          return;
        }
        resolve(res);
      } catch (e) {
        reject(e);
      }
    });
    fn.apply($window, args);
  });
