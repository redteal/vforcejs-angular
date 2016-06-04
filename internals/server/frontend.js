const express = require('express');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const logger = require('../logger');

/**
 * Front-end middleware
 */
module.exports = (options) => {
  const compiler = webpack(options);
  const middleware = webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: options.output.publicPath,
  });

  const app = express();
  logger.info('Starting Webpack server... ', { newline: false });
  app.listen((err) => {
    if (err) {
      logger.error(err);
      return;
    }
    app.use(middleware);
    app.use(webpackHotMiddleware(compiler, {
      path: '/__webpack_hmr',
      heartbeat: 10 * 1000,
    }));

    // Since webpack-dev-middleware uses memory-fs internally to store build
    // artifacts, we use it instead of node's fs
    const fs = middleware.fileSystem;

    app.get('*', (req, res) => {
      const file = fs.readFileSync(path.join(compiler.outputPath, 'index.html'));
      res.send(file.toString());
    });
    logger.status(err);
  });

  return app;
};
