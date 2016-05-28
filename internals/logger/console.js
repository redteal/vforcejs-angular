/* eslint-disable no-console */
/**
 * Overrides console methods to use winston instead
 */
const logger = require('./');

console.debug = (...args) => logger.debug.apply(logger, args);
console.log = (...args) => logger.debug.apply(logger, args);
console.dir = (...args) => logger.debug.apply(logger, args);
console.info = (...args) => logger.info.apply(logger, args);
console.warn = (...args) => logger.warn.apply(logger, args);
console.error = (...args) => logger.error.apply(logger, args);
