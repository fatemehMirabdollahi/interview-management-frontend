const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const stylesPath = "@/assets/scss";

module.exports = {
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@use "sass:math"; @use "${stylesPath}/prepend.scss" as *;`,
      },
    },
  },
  configureWebpack: {
    plugins: [new FixStyleOnlyEntriesPlugin()],
    entry: {
      _app: "@/assets/scss/styles.scss",
    },
  },
  devServer: {
    proxy: "http://127.0.0.1:3002",
  },
};
