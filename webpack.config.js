const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');
const { TurnedIn } = require("@mui/icons-material");

module.exports = {
  entry: "./client/index.js",
  mode: process.env.NODE_ENV,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000/',
        secure: false,
      },
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
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ], 
  },  
  plugins: [
    new HTMLWebpackPlugin({
      title: 'Development',
      template: 'index.html'
    }),
    new ESLintPlugin()
  ]
}