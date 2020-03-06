const HTMLWebpackPlugin = require("html-webpack-plugin");

const path = require("path");

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, "public"),
    port: 8080
  },
  entry: "./src/index.ts",
  mode: process.env.NODE_ENV === "development" ? "development" : "production",
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        loader: "ts-loader",
        test: /\.tsx?$/
      }
    ]
  },
  optimization: {
    // https://medium.com/hackernoon/the-100-correct-way-to-split-your-chunks-with-webpack-f8a9df5b7758
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm.${packageName.replace("@", "")}`;
          },
        },
      },
    }
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    new HTMLWebpackPlugin({
      filename: "index.html",
      inject: true,
      template: path.join(__dirname, "src/index.html")
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    },
    extensions: [".js", ".ts"]
  }
};
