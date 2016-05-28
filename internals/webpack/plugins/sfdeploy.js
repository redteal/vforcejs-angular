const async = require('async');
const logger = require('../../logger');
const SalesforceDeploy = require('../../scripts/sfdc');
const { apexPrefix } = require('../../../.config.json');

const conf = {};
let sfdc;
let conn;

module.exports = class SalesforceDeployPlugin {
  constructor({ bundle, page } = { bundle: true, page: true }) {
    conf.bundle = bundle == null || bundle;
    conf.page = page == null || page;
    sfdc = new SalesforceDeploy(logger);
    conn = sfdc.connect();
  }

  apply(compiler) {
    compiler.plugin('emit', this.onEmit);
  }

  onEmit(compilation, done) {
    const pageAsset = compilation.assets[`${apexPrefix}.page`];
    const tasks = [];
    if (conf.bundle) {
      tasks.push((done) => sfdc.bundle(compilation, conn, done));
    }
    if (conf.page && pageAsset) {
      tasks.push((done) => sfdc.page(conn, pageAsset, done));
    }
    if (!conn.userInfo && tasks.length) {
      tasks.unshift((done) => sfdc.login(conn, done));
    }
    async.series(tasks, done);
  }
};
