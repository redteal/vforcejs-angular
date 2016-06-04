const express = require('express');
const chalk = require('chalk');
const ip = require('ip');
const ngrok = require('ngrok');
const logger = require('../logger');
const frontend = require('./frontend');

const app = express();
const port = process.env.PORT || 3000;

const logAccessUrls = (port, url) => {
  const localhost = chalk.magenta(`http://localhost:${port}`);
  const lan = chalk.magenta(`http://${ip.address()}:${port}`);
  const divider = chalk.gray('-----------------------------------');
  logger.info();
  logger.info(chalk.bold('Access URLs:'));
  logger.info(divider);
  logger.info(`Localhost: ${localhost}`);
  logger.info(`      LAN: ${lan}`);
  if (url) {
    logger.info(`    Proxy: ${chalk.magenta(url)}`);
  }
  logger.info(divider);
  logger.info(chalk.blue(`Press ${chalk.italic('CTRL-C')} to stop`));
  logger.info();
};

logger.info('Starting proxy server... ', { newline: false });
app.listen(port, (err) => {
  logger.status(err);
  if (err) {
    logger.error(err);
    return;
  }
  // Connect to ngrok
  logger.info('Initializing tunnel... ', { newline: false });
  ngrok.connect(port, (err, url) => {
    logger.status(err);
    if (err) {
      logger.error(err);
      return;
    }
    logAccessUrls(port, url);
    const webpackConfig = require('../webpack/webpack.dev.babel')(url);
    app.use(frontend(webpackConfig));
  });
});
