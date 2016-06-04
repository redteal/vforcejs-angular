const async = require('async');
const jsforce = require('jsforce');
const streamBuffers = require('stream-buffers');
const archiver = require('archiver');
const appConfig = require('../../.jsforce.config.json');
const { apexPrefix } = require('../../.config.json');

let logger;

module.exports = class SalesforceDeploy {
  constructor(_logger) {
    logger = _logger;
  }

  connect() {
    return new jsforce.Connection({
      loginUrl: appConfig.loginUrl,
    });
  }

  login(conn, done) {
    const { username, password, token } = appConfig;
    logger.info(`Logging in as ${username}... `, { newline: false });
    conn.login(username, password + token, (err, res) => {
      logger.status(err);
      done(err, res);
    });
  }

  bundle(compilation, conn, done) {
    async.autoInject({
      bundle: (done) => {
        logger.info('Bundling static resources... ', { newline: false });
        const output = new streamBuffers.WritableStreamBuffer({
          initialSize: (100 * 1024),    // start at 100 kilobytes.
          incrementAmount: (10 * 1024), // grow by 10 kilobytes each time buffer overflows.);
        });
        const archive = archiver('zip');
        archive.on('end', () => {
          logger.ok();
          done(null, output);
        });
        archive.on('error', (err) => {
          logger.fail();
          done(err);
        });
        archive.pipe(output);
        for (const [p, asset] of Object.entries(compilation.assets)) {
          if (!p.endsWith('.page')) {
            archive.append(asset.source(), { name: p });
          }
        }
        archive.finalize();
      },
      deploy: (bundle, done) => {
        const metadata = {
          fullName: apexPrefix,
          contentType: 'application/zip',
          cacheControl: 'Public',
          content: bundle.getContentsAsString('base64'),
        };
        logger.info(`Deploying bundle as ${apexPrefix}.resource... `, { newline: false });
        conn.metadata.upsert('StaticResource', metadata, (err, res) => {
          logger.status(err);
          done(err, res);
        });
      },
    }, done);
  }

  page(conn, asset, done) {
    logger.info(`Deploying ${apexPrefix}.page... `, { newline: false });
    conn.metadata.upsert('ApexPage', {
      fullName: apexPrefix,
      label: apexPrefix,
      description: `${apexPrefix} SPA`,
      apiVersion: '34.0',
      availableInTouch: true,
      confirmationTokenRequired: false,
      content: new Buffer(asset.source()).toString('base64'),
    }, (err, res) => {
      logger.status(err);
      done(err, res);
    });
  }
};
