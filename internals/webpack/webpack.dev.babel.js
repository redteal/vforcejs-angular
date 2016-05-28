/**
 * DEVELOPMENT WEBPACK CONFIGURATION
 */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SalesforceDeployPlugin = require('./plugins/sfdeploy');

// PostCSS plugins
const cssnext = require('postcss-cssnext');
const postcssFocus = require('postcss-focus');
const postcssReporter = require('postcss-reporter');

const { appTitle, apexPrefix } = require('../../.config.json');

module.exports = (url) => require('./webpack.base.babel')({
  // Add hot reloading in development
  entry: [
    'eventsource-polyfill', // Necessary for hot reloading with IE
    `webpack-hot-middleware/client?path=${url}/__webpack_hmr&timeout=20000&reload=true`,
    path.join(process.cwd(), 'src/app/app.js'), // Start with app/app.js
  ],
  output: {
    publicPath: `${url}/`,
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },

  // Load the CSS in a style tag in development
  cssLoaders: 'style!css?importLoaders=1&sourceMap!postcss!sass',

  // Process the CSS with PostCSS
  postcssPlugins: [
    postcssFocus(), // Add a :focus to every :hover
    cssnext({ // Allow future CSS features to be used, also auto-prefixes the CSS...
      browsers: ['last 2 versions', 'IE > 10'], // ...based on this browser list
    }),
    postcssReporter({ // Posts messages from plugins to the terminal
      clearMessages: true,
    }),
  ],

  plugins: [
    new webpack.HotModuleReplacementPlugin(), // Tell webpack we want hot reloading
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/templates/angular.page.jade',
      inject: false,
      title: appTitle,
      apexPrefix,
      ngrokurl: `${url}/`,
      appMountId: 'root',
      dev: true,
    }),
    new HtmlWebpackPlugin({
      filename: `${apexPrefix}.page`,
      template: 'src/templates/angular.page.jade',
      inject: false,
      title: appTitle,
      apexPrefix,
      baseHref: '{!$Site.Prefix}/',
      dev: true,
    }),
    new SalesforceDeployPlugin({
      bundle: false,
    }),
  ],

  // Emit a source map for easier debugging
  devtool: 'source-map',
});
