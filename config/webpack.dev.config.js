var path = require('path');
var glob = require('glob')
var webpack = require('webpack');
const Utils = require('./lib/utils');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


const AUTOPREFIXER_BROWSERS = [
  'Android 2.3',
  'Android >= 4',
  'Chrome >= 35',
  'Firefox >= 31',
  'Explorer >= 9',
  'iOS >= 6',
  'Opera >= 12',
  'Safari >= 7.1'
];
/**
 * 取 entry name 规则
 * @REIVEW: url-loader 不支持 webpack entry 为目录层级
 * e.g.
 * name = /Demo/index.js => Demo
 * name = /Transfer/AAA/app.js  => Transfer-AAA-app
 */
var renameEntryName = function (name) {
  name = name.slice(0, 1) === '/' ? name.slice(1) : name
  name = name.replace(/\//g, '-')
  name = name.replace(/-(index.js|index)$/g, '')

  return name
}
var getEntries = function (path) {
  var files = glob.sync(path)
  var entryList = {};
  files.length > 0 && files.forEach(function (filepath) {
    var name = filepath.replace('src/pages', '')
    name = name.match('.js') ? name.split('.js')[0] : name
    var entryName = renameEntryName(name)

    entryList[entryName] = './' + filepath
  })
  return entryList;
}
var entryList = getEntries('src/pages/**/!(js)/app.js');
console.log('entryList', entryList);

var htmlPlugins = [];
Object.keys(entryList).forEach((entry) => {
  htmlPlugins.push(
    new HtmlWebpackPlugin({
      template: './template.html',  // HTML 模版文件所在的文件路径
      filename: `index.html`,    // 输出的 HTML 的文件名称
      chunk: [entry],
      title: '后台管理系统',
    })
  );
});

// const cesiumSource = 'node_modules/cesium/Source';

module.exports = {
  entry:  entryList,
  output: {
    path: path.resolve(__dirname, '../build/'),
    filename: '[name].js',
    chunkFilename: '[name].bundle.[chunkHash:6].js',
    publicPath: ''
  },
  devServer: {
    inline: true,
    port: 3001,
    publicPath: 'http://localhost:3001/',
  },
  module: {
    // 解决问题：Critical dependency: require function is used in a way 
    // in which dependencies cannot be statically extracted
    unknownContextCritical: false,
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 50000,
              outputPath: './asset/images',
              name: '[name].[hash: 5].[ext]',
              pulbicPath: './build/asset/images'
            }
          }
        ]
      },
      {
        test: /\.(eot|ttf|wav|mp3|mp4|svg|woff|woff2)$/,
        use: `${require.resolve(
          'file-loader'
        )}?name=fonts/[name].[hash:6].[ext]`
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
              }
            },
            {
              loader: require.resolve('postcss-loader'),
              options: {
                plugins: () => [
                  require('postcss-mixins')(),
                  require('postcss-nested')(),
                  require('postcss-cssnext')({
                    browsers: AUTOPREFIXER_BROWSERS
                  })
                ]
              }
            }
          ]
        })
      }
    ],
  },
  resolve: {
    // alias: {
    //   // Cesium模块名称
    //   cesium: path.resolve(__dirname, `../${cesiumSource}`)
    // }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // for cesium.js
    // new CopyWebpackPlugin([{ from: path.join(cesiumSource, cesiumWorkers), to: 'Workers' }]),
    // new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'Assets'), to: 'Assets' }]),
    // new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'Widgets'), to: 'Widgets' }]),
    // new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'ThirdParty/Workers'), to: 'ThirdParty/Workers' }]),
    new webpack.DefinePlugin({
      // Define relative base path in cesium for loading assets
      CESIUM_BASE_URL: JSON.stringify('')
    }),
    new ExtractTextPlugin({ filename: '[name].css', allChunks: true }),
    ...htmlPlugins,
  ]
}