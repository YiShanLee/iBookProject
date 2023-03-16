const path = require("path");

module.exports = () => {
  const { NODE_ENV } = process.env;

  return {
    entry: "./src/app.js",
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "bundle.js",
      publicPath: "/build/"
    },
    mode: NODE_ENV,
    devtool: NODE_ENV === "development" ? "eval-source-map" : "none",
    module: {
      rules: [
        {
          test: /\.js$/,
          use: "babel-loader",
          exclude: /node_modules/
        }
      ]
    },
    devServer: {
      overlay: true,
      port: 9000,
      open: true,
      contentBase: path.resolve(__dirname, "dist")
    }
  };
};
