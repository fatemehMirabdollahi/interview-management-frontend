const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");

module.exports = {
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
