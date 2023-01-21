const path = require("path");
const webpack = require('webpack');

module.exports = {
  devServer: {
      disableHostCheck: true
  },
  css: {
    loaderOptions: {
      // pass options to sass-loader
      sass: {
        // @/ is an alias to src/
        // so this assumes you have a file named `src/variables.scss`
        prependData: `
          @import "@/assets/scss/globals/_variables.scss";
          @import "@/assets/scss/globals/_mixins.scss";
        `
      }
    }
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
