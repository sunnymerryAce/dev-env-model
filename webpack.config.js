// プラグインを利用するためにwebpackを読み込んでおく
const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const enableSourceMap = process.env.NODE_ENV === 'development';

module.exports = {
  mode: process.env.NODE_ENV,
  // エントリーポイントの指定 キーはコンパイルするjsの名前(下部の[name])になる
  entry: {
    // Polyfillがあればエントリーポイントの前に読み込むこと
    index: [path.resolve(__dirname, 'src/webpack/index.js')],
  },
  output: {
    path: path.resolve(__dirname, 'dist/js'),
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
        test: /\.scss/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: enableSourceMap,
              // 0 => no loaders (default);
              // 1 => postcss-loader;
              // 2 => postcss-loader, sass-loader
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: enableSourceMap,
              plugins: enableSourceMap
                ? []
                : // Productionビルドのときのみ
                [
                  // CSS圧縮有効化
                  require('cssnano')({
                    preset: 'default',
                  }),
                  // Autoprefixer有効化
                  require('autoprefixer')({
                    browsers: ['last 2 versions', 'ie >= 11', 'Android >= 4.4', 'safari >= 9'],
                    // グリッドレイアウト有効化
                    grid: true,
                  }),
                ],
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: enableSourceMap,
              // 共通箇所の読み込み
              // data: '@import "_common.scss";',
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
    // bundleサイズの表示
    // new BundleAnalyzerPlugin(),
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
