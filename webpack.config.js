const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => ({
  mode: 'development',
  entry: [
    './src/main.ts'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true
  },
  devtool: argv.mode === 'production'? 'none' : 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(ts|js)$/,
        enforce: 'pre',
        use: [
          { loader: 'source-map-loader' },
          { loader: 'template-url-webpack' },
          { loader: 'style-url-webpack' }
        ],
        include: [path.resolve(__dirname, 'src')]
      },
      {
        test: /\.html$/,
        use: [
          { 
            loader: 'raw-loader',
            options: {
              esModule: false,
            },
          }
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader:'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  require('precss'),
                  require('autoprefixer')
                ];
              }
            }
          },
          { loader: 'sass-loader' }
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name:'[name].[ext]',
          outputPath:'assets'
        }
      }
    ]
  },
  resolve: {
      extensions: ['.tsx', '.ts', '.js']
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new HtmlWebpackPlugin({
      title: 'Output Management',
      template: 'src/index.html'
    }),
    new CleanWebpackPlugin(['dist']),
    new CopyPlugin({
      patterns: [
        { from: 'src/img', to: 'src/img' },
        {
          context: 'node_modules/@webcomponents/webcomponentsjs',
          from: '**/*.js',
          to: 'webcomponents'
        },
      ],
    }),
  ]
});