const nodeExternals = require("webpack-node-externals");
const path = require("path");

module.exports = {
  target: "node",
  // target: 'web',
  mode: "production",
  entry: {
    app: ["./src/index.js"]
  },
  output: {
    path: path.resolve(__dirname, "dist/"),
    filename: "index.js",
    library: "resolveLnk",
    libraryTarget: "umd"
  }
};

// todo - create a web enabled bundle.
