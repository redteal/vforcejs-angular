export default ($window, $q, fn) => (...args) =>
  $q((resolve, reject) => {
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
