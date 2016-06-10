const async = require('async');
const fs = require('fs');
const path = require('path');
const jsforce = require('jsforce');
const streamBuffers = require('stream-buffers');
const archiver = require('archiver');
const Mustache = require('mustache');
const appConfig = require('../../.jsforce.config.json');
const { apiVersion, apexPrefix, appTitle } = require('../../.config.json');

let logger;

module.exports = class SalesforceDeploy {
  constructor(_logger) {
    logger = _logger;
    this.rootPath = process.cwd();
  }

  connect() {
    return new jsforce.Connection({
      loginUrl: appConfig.loginUrl,
      version: apiVersion,
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

  classes(conn, metadata, done) {
    conn.metadata.list({ type: 'ApexClass' }, (err, res) => {
      let names = new Set(res.map(md => md.fullName));
      const data = metadata.filter(md => !names.has(md.name));
      names = data.map(md => md.name);
      const content = data.map(md => ({ body: md.body }));
      if (data.length) {
        logger.info(`Creating Apex classes: ${names.join(', ')}...`, { newline: false });
        conn.tooling.sobject('ApexClass').create(content, (err, res) => {
          logger.status(err);
          done(err, res);
        });
      } else {
        done();
      }
    });
  }

  getUrlRewriterMetadata() {
    const p = path.join(this.rootPath, 'src', 'templates', 'VForceJSUrlRewriter.cls');
    const body = fs.readFileSync(p, { encoding: 'utf-8' });
    return { name: 'VForceJSUrlRewriter', body };
  }

  getControllerMetadata() {
    const p = path.join(this.rootPath, 'src', 'templates', 'Controller.cls.mustache');
    let body = fs.readFileSync(p, { encoding: 'utf-8' });
    body = Mustache.render(body, { apexPrefix });
    return { name: `${apexPrefix}Controller`, body };
  }

  page(conn, asset, done) {
    logger.info(`Deploying ${apexPrefix}.page... `, { newline: false });
    conn.metadata.upsert('ApexPage', {
      fullName: apexPrefix,
      label: apexPrefix,
      description: appTitle,
      apiVersion,
      availableInTouch: true,
      confirmationTokenRequired: false,
      content: new Buffer(asset.source()).toString('base64'),
    }, (err, res) => {
      logger.status(err);
      done(err, res);
    });
  }
};
