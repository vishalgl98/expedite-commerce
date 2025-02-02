const slsw = require('serverless-webpack');
const path = require('path');

module.exports = {
  entry: slsw.lib.entries,
  mode: 'development',
  target: 'node20',
  optimization: {
    minimize: true,
  },
  devtool: 'source-map',
  resolve: {
    alias: {
      common: path.resolve(__dirname, 'common/'),
    },
  },
  experiments: {
    outputModule: true,
  },
  externalsType: 'module',
  externals: [
    { '@aws-sdk/client-dynamodb': '@aws-sdk/client-dynamodb' },
    { '@aws-sdk/client-lambda': '@aws-sdk/client-lambda' },
    { '@aws-sdk/lib-dynamodb': '@aws-sdk/lib-dynamodb' },
    { axios: 'axios' },
    { uuid: 'uuid' },
  ],
  output: {
    path: path.join(__dirname, './out'),
    filename: '[name].mjs',
    libraryTarget: 'module',
  },
};
