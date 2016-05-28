// Important modules this config uses
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const SalesforceDeployPlugin = require('./plugins/sfdeploy');

// PostCSS plugins
const cssnext = require('postcss-cssnext');
const postcssFocus = require('postcss-focus');
const postcssReporter = require('postcss-reporter');

const { appTitle, apexPrefix } = require('../../.config.json');

const cssLoaderOpts = {
  importLoaders: true,
  discardComments: {
    removeAll: true,
  },
  sourceMap: true,
};

module.exports = require('./webpack.base.babel')({
  entry: [
    path.join(process.cwd(), 'src/app/app.js'),
  ],

  // Utilize long-term caching by adding content hashes (not compilation hashes) to compiled assets
  output: {
    filename: 'js/[name].[chunkhash].js',
    chunkFilename: 'js/[name].chunk.[chunkhash].js',
  },

  // We use ExtractTextPlugin so we get a seperate CSS file instead
  // of the CSS being in the JS and injected as a style tag
  cssLoaders: ExtractTextPlugin.extract(
    'style', `css?${JSON.stringify(cssLoaderOpts)}!postcss!sass`
  ),
  devtool: 'source-map',

  postcssPlugins: [
    postcssFocus(),
    cssnext({
      browsers: ['last 2 versions', 'IE > 10'],
    }),
    postcssReporter({
      clearMessages: true,
    }),
  ],
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
      template: 'src/templates/angular.page.jade',
      inject: false,
      title: appTitle,
      apexPrefix,
      baseHref: '{!$Site.Prefix}/',
    }),

    // Extract the CSS into a seperate file
    new ExtractTextPlugin('css/[name].[chunkhash].css'),

    new SalesforceDeployPlugin(),
  ],
});
