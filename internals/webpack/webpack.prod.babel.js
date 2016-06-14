/**
 * PRODUCTION WEBPACK CONFIGURATION
 */
const path = require('path');
const slash = require('slash');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const SalesforceDeployPlugin = require('./plugins/sfdeploy');

// postCSS plugins
const cssnext = require('postcss-cssnext');
const postcssFocus = require('postcss-focus');
const postcssReporter = require('postcss-reporter');

const { sitePrefix, appTitle, apexPrefix, cdn } = require('../../.config.json');
const pkg = require('../../package.json');

const cssLoaderOpts = {
  importLoaders: true,
  discardComments: {
    removeAll: true,
  },
  sourceMap: true,
};

// register external (cdn) dependencies
const externals = {};
if (pkg.cdnDependencies && pkg.cdnDependencies.js) {
  Object.keys(pkg.cdnDependencies.js).forEach((name) => {
    const jsconf = pkg.cdnDependencies.js[name];
    externals[name] = jsconf.variable;
  });
}

module.exports = require('./webpack.base.babel')({
  entry: [
    'babel-polyfill',
    path.join(process.cwd(), 'src/app/app.js'),
  ],

  // Utilize long-term caching by adding content hashes (not compilation hashes) to compiled assets
  output: {
    publicPath: slash(path.join('/', sitePrefix, 'resource', apexPrefix, '/')),
    filename: 'js/[name].[chunkhash].js',
    chunkFilename: 'js/[name].chunk.[chunkhash].js',
  },

  // We use ExtractTextPlugin so we get a seperate CSS file instead
  // of the CSS being in the JS and injected as a style tag
  cssLoaders: ExtractTextPlugin.extract(
    'style', `css?${JSON.stringify(cssLoaderOpts)}!postcss!sass`
  ),

  postcssPlugins: [
    postcssFocus(),
    cssnext({
      browsers: ['last 2 versions', 'IE > 10'],
    }),
    postcssReporter({
      clearMessages: true,
    }),
  ],

  providePlugin: {
    // make fetch and angular available globally
    fetch: 'exports?self.fetch!whatwg-fetch',
  },

  plugins: [
    // OccurrenceOrderPlugin is needed for long-term caching to work properly.
    // See http://mxs.is/googmv
    new webpack.optimize.OccurrenceOrderPlugin(true),

    // Merge all duplicate modules
    new webpack.optimize.DedupePlugin(),

    // Minify and optimize the JavaScript
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false, // ...but do not show warnings in the console (there is a lot of them)
      },
      comments: false,
    }),

    // Minify and optimize the index.html
    new HtmlWebpackPlugin({
      filename: `${apexPrefix}.page`,
      template: 'src/templates/Visualforce.page.jade',
      inject: false,
      title: appTitle,
      apexPrefix,
      baseHref: '{!$Site.Prefix}/',
      cdn: cdn || {},
    }),

    // Extract the CSS into a seperate file
    new ExtractTextPlugin('css/[name].[chunkhash].css'),

    // Deploy assets to the configured Salesforce org
    new SalesforceDeployPlugin(),
  ],
  externals,
  devtool: 'source-map',
});
