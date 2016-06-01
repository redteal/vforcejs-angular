/**
 * COMMON WEBPACK CONFIGURATION
 */
require('babel-polyfill');

const path = require('path');
const webpack = require('webpack');
const SplitByPathPlugin = require('webpack-split-by-path');

module.exports = (options) => ({
  entry: options.entry,
  output: Object.assign({ // Compile into js/build.js
    path: path.resolve(process.cwd(), 'build'),
  }, options.output), // Merge with env dependent settings
  module: {
    loaders: [{
      test: /\.js$/, // Transform all .js files required somewhere with Babel
      loader: 'ng-annotate!babel',
      exclude: /node_modules/,
    }, {
      // Transform our own .s?css files with PostCSS and CSS-modules
      test: /\.s?css$/,
      exclude: /node_modules/,
      loader: options.cssLoaders,
    }, {
      // Do not transform vendor's CSS with CSS-modules
      // The point is that they remain in global scope.
      // Since we require these CSS files in our JS or CSS files,
      // they will be a part of our compilation either way.
      // So, no need for ExtractTextPlugin here.
      test: /\.s?css$/,
      include: /node_modules/,
      loader: 'style!css?sourceMap!sass',
    }, {
      test: /\.jpe?g$|\.gif$|\.png$/i,
      loader: 'url?limit=10000&name=img/[name].[hash].[ext]',
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&name=svg/[name].[hash].[ext]&mimetype=image/svg+xml',
    }, {
      test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&name=fonts/[name].[hash].[ext]&mimetype=application/font-woff',
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&name=fonts/[name].[hash].[ext]&mimetype=application/octet-stream',
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file?name=fonts/[name].[hash].[ext]',
    }, {
      test: /\.html$/,
      loader: 'html',
    }, {
      test: /\.json$/,
      loader: 'json',
    }, {
      test: /\.jade$/,
      loader: 'jade?pretty=true',
    }],
  },
  plugins: options.plugins.concat([
    // Splits vendor modules (that are imported in the app) into its own "vendor" chunk
    new SplitByPathPlugin([{
      name: 'vendor',
      path: path.join(process.cwd(), 'node_modules'),
    }]),
    new webpack.ProvidePlugin(options.providePlugin),

    // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
    // inside your code for any environment checks; UglifyJS will automatically
    // drop any unreachable code.
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ]),
  postcss: () => options.postcssPlugins,
  resolve: {
    root: process.cwd(),
    modules: ['src/app', 'node_modules'],
    modulesDirectories: ['src/app', 'node_modules'],
    extensions: ['', '.js'],
  },
  node: {
    // fs: 'empty',
    // net: 'empty',
  },
  devServer: {
    contentBase: './',
    stats: 'minimal',
  },
  devtool: options.devtool,
  target: 'web', // Make web variables accessible to webpack, e.g. window
  stats: false, // Don't show stats in the console
  progress: true,
});
