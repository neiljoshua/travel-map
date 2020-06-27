const path = require("path");

module.exports = {
  devServer: {
      disableHostCheck: true
  },
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "scss",
      patterns: [path.resolve(__dirname, "./src/assets/scss/index.scss")]
    }
  }
};
