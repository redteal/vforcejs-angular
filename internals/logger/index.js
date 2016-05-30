const winston = require('winston');
const chalk = require('chalk');
const os = require('os');

winston.emitErrs = true;
winston.cli();

const consoleTransport = new winston.transports.Console({
  level: 'debug',
  handleExceptions: true,
  humanReadableUnhandledException: true,
  colorize: true,
  timestamp: false,
});

const logger = new winston.Logger({
  transports: [consoleTransport],
  exitOnError: true,
});

logger.cli();
logger.setLevels({ error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 });

// override info method for newline toggling
const _info = logger.info;
logger.info = (...args) => {
  const opts = args[args.length - 1];
  if (opts && opts.newline === false) {
    consoleTransport.eol = '\u200B';
    args.pop();
  }
  _info.apply(logger, args);
  consoleTransport.eol = os.EOL;
};

// helpers to log status indicators
logger.append = (msg) => process.stdout.write(msg);
logger.ok = () => logger.append(chalk.green(` ✓${os.EOL}`));
logger.fail = () => logger.append(chalk.red(` ✘${os.EOL}`));
logger.status = (err) => (err ? logger.fail() : logger.ok());

module.exports = logger;

require('./console');
