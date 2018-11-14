// プラグインを利用するためにwebpackを読み込んでおく
const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  // ソースマップの有無を指定
  devtool:
    process.env.NODE_ENV === 'production' ? '#cheap-module-source-map' : false,
  // エントリーポイントの指定 キーはコンパイルするjsの名前(下部の[name])になる
  entry: {
    // babel-polyfillをエントリーポイントの前に読み込む
    index: [path.resolve(__dirname, 'src/webpack/index.js')],
  },
  // アウトプットの場所の指定
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    // jsファイル名の指定
    filename: '[name].bundle.js',
  },
  // vagrantでlinuxを立てその中でwebpackを実行する場合、以下を指定しないとwatchされない
  watchOptions: {
    poll: true,
  },
  optimization: {
    // 共通モジュールのバンドル
    splitChunks: {
      name: 'vendor',
      chunks: 'initial',
    },
    minimizer: [
      new UglifyJSPlugin({
        uglifyOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
        exclude: /node_modules/,
      },

      {
        test: /\.pug$/,
        loader: 'pug-plain-loader',
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              minimize: true,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              minimize: true,
            },
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
            // 共通箇所の読み込み
            options: {
              data: '@import "_common.scss";',
              includePaths: [path.resolve(__dirname, './src/scss/')],
            },
          },
        ],
      },
    ],
  },
  resolve: {
    modules: ['node_modules', path.resolve(__dirname, 'src')],
    // ビルド対象に含めたいファイルの拡張子を Array で指定
    extensions: ['*', '.js', '.vue', '.json'], // デフォルトでは ['.wasm', '.mjs', '.js', '.json']
  },
  plugins: [
    // JS内の'process.env.NODE_ENV'が'development'か'production'に置き換わる
    new webpack.EnvironmentPlugin({ NODE_ENV: 'development' }),
    // 共通プラグインを利用するときはこれを書いておけばインポート不要
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      velocity: 'velocity-animate',
    }),
  ],
};
