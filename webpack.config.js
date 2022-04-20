const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./client/index.js",
  mode: process.env.NODE_ENV,
  devServer: {
    proxy: {
      '/login': 'http://localhost:3000',
      '/callback': 'http://localhost:3000'
    },
    static: {
      directory: path.join(__dirname, 'dist'),
      publicPath: '/dist',
    },
    compress: true,
    port: 8080,

  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },
  module: {
    rules:[
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env','@babel/preset-react']
          }
        }
      },
      // {
      //   test: /\.html$/,
      //   use: "html-loader"
      // },
      /*Choose only one of the following two: if you're using 
      plain CSS, use the first one, and if you're using a
      preprocessor, in this case SASS, use the second one*/
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      // {
      //   test: /\.scss?/,
      //   use:[
      //     "style-loader",
      //     "css-loader",
      //     "sass-loader"
      //   ],
      // },
    ], 
  },  
  plugins: [
    new HTMLWebpackPlugin({
      title: 'Development',
      template: 'index.html'
    }),
  ]
}