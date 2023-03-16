const path = require("path");
const webpack = require('webpack');
const TerserPlugin = require("terser-webpack-plugin");


/**
 * @type {object} - The initial webpack configuration object with properties that are the same for all configurations
 */
var config = {
      entry: "./src/app.js",
      output: {
          path: path.resolve(__dirname, "build"),
          filename: "bundle.js"
      },
      mode: "",
      devServer: {},
      plugins:[ ],
      optimization: {},
      module:{
        rules: [{
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ["@babel/preset-env",{
                  targets:  [
                      "> 0.5% in DE",
                      "ie >= 10"
                    ]
                  }
                ]
              ]
            }
          }
        }]
      }
  };
 

   /**
     * Adds different behaviour to the webpack configuration depending on the environment variable
     * that is passed on by the npm script.
     * 
     * @param {string} env - The environment variable
     * @return {object} The configuration object 
     */
  module.exports = env => {
    /**
     * Passing on development as environment variable creates the best possible developer experience.
     */
    if (env.development === true) { 
      config.devtool = 'source-map',
      config.devServer.port = '8080',
      config.devServer.publicPath = '/build/',
      config.devServer.contentBase = 'dist',
      config.devServer.watchContentBase = true
      config.mode = "development";
    }
    /**
     * Passing on production as environment variable creates the best possible bundle for productive use.
     */
    if (env.production === true) {
      config.optimization.minimize = true,
      config.optimization.minimizer = [new TerserPlugin()],
      config.optimization.removeAvailableModules = false,
      config.optimization.emitOnErrors = false,
      config.optimization.mergeDuplicateChunks = true,
      config.optimization.flagIncludedChunks = true,
      config.optimization.removeEmptyChunks = true
      config.mode = "production";
    }
      return config;
}
