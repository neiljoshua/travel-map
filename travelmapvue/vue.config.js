const path = require("path");
const webpack = require('webpack');

module.exports = {
  devServer: {
      disableHostCheck: true
  },
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "scss",
      patterns: [path.resolve(__dirname, "./src/assets/scss/index.scss")]
    }
  },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        mapboxgl: 'mapbox-gl',
      }),
    ],
  }
};
