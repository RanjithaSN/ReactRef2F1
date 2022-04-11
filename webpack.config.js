const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { GitRevisionPlugin } = require('git-revision-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const localConfig = require('./src/config/config.local.json');
const devConfig = require('./src/config/config.dev.json');
const sbxConfig = require('./src/config/config.sbx.json');
const prodConfig = require('./src/config/config.prod.json');
const path = require('path');
const webpack = require('webpack');

const buildDirectory = 'build/react';
let mode = 'development';
let target = 'web';
let config = devConfig;
let publicPath = '';
const timestamp = new Date();
const formattedTimestamp = timestamp.toLocaleString('en-US');
const gitRevisionPlugin = new GitRevisionPlugin({
  commithashCommand: 'rev-parse --short HEAD',
  versionCommand: `describe --tags | sed 's/\\(.*\\)-.*/\\1/'`,
});
// Config Setup
if (process.env.BUILD_ENV === 'prod') {
  config = prodConfig;
} else if (process.env.BUILD_ENV === 'sbx') {
  config = sbxConfig;
} else if (process.env.BUILD_ENV === 'dev') {
  config = devConfig;
} else if (process.env.BUILD_ENV === 'local') {
  config = localConfig;
}

const plugins = [
  new MiniCssExtractPlugin(),
  new HtmlWebpackPlugin({
    template: './src/public/index.ejs',
    inject: false,
    files: {
      publicPath: publicPath,
    },
    scripts: [
      {
        src: 'ascendon-web-project.js',
        type: 'module',
      },
    ],
  }),
  new webpack.DefinePlugin({
    ASCENDON_BUILD_VERSION: JSON.stringify(gitRevisionPlugin.version()),
    ASCENDON_BUILD_HASH: JSON.stringify(gitRevisionPlugin.commithash()),
    ASCENDON_BUILD_TIMESTAMP: JSON.stringify(formattedTimestamp),
    ASCENDON_BUILD_BRANCH: JSON.stringify(gitRevisionPlugin.branch()),
    ASCENDON_CONFIG: JSON.stringify(config),
    ASCENDON_PUBLIC_PATH: JSON.stringify(publicPath),
  }),
  new CopyPlugin({
    patterns: [
      {
        from: 'index.html',
        to: path.resolve(__dirname, 'build'),
      },
      {
        from: 'ascendonController.js',
        to: path.resolve(__dirname, 'build'),
      },
      {
        from: 'src/config/password_config.json',
        to: path.resolve(__dirname, 'build/react'),
      },
    ],
  }),
];

// Env specific webpack properties
if (process.env.NODE_ENV === 'production') {
  mode = 'production';
  target = 'browserslist';
} else {
  // Example: You can push any dev only plugins here
  // plugins.push();
}

module.exports = {
  mode: mode,
  target: target,
  output: {
    clean: true,
    assetModuleFilename: 'assets/[hash][ext][query]',
    path: path.resolve(__dirname, buildDirectory),
    filename: 'ascendon-web-project.js',
  },
  entry: './src/index.js',
  devServer:
    process.env.BUILD_ENV === 'local'
      ? {
          historyApiFallback: true,
          contentBase: `./${buildDirectory}`,
          hot: true,
          port: 9000,
          open: true,
        }
      : {},
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        type: 'asset/resource',
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.s?css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
  plugins: plugins,
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
