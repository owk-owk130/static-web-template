const { EnvironmentPlugin, SourceMapDevToolPlugin } = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const RemoveEmptyScriptsPlugin = require("webpack-remove-empty-scripts");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const HtmlWebpackHarddiskPlugin = require("html-webpack-harddisk-plugin");
const path = require("path");
const { glob } = require("glob");
const { SRC, STATIC, DIST, BASE_DIR, PAGES_DIR, HOST, PORT } = require("./webpack.constants");

const getHtmlTemplates = async () => {
  const dir = path.normalize(path.join(PAGES_DIR));
  const files = await glob(path.join(dir, "/**/*.tsx"));

  return files.map(
    file =>
      new HtmlWebpackPlugin({
        filename: `.${file.replace(dir, "").replace("tsx", "html")}`,
        template: file,
        inject: false,
        minify: false
      })
  );
};

const getEntryFiles = async () => {
  const cssFiles = await glob(path.join(PAGES_DIR, "/**/*.scss"));
  const jsFiles = await glob(path.join(PAGES_DIR, "/**/*.ts"));
  const dir = path.normalize(path.join(PAGES_DIR));
  const entries = [...cssFiles, ...jsFiles].reduce((acc, file) => {
    let key;
    if (file.endsWith(".ts")) {
      key = file.replace(dir, "").replace(".ts", "");
      acc[key] = file;
    }
    if (file.endsWith(".scss")) {
      key = file.replace(dir, "").replace(".scss", "");
      acc[key] = file;
    }
    const value = file.replace("src", "./src");

    acc[key] = value;

    return acc;
  }, {});
  return entries;
};

/** @return {import('webpack').Configuration} */
module.exports = async (env, argv) => ({
  // エントリーファイル
  entry: await getEntryFiles(),
  // 出力するディレクトリ・ファイル名などの設定
  output: {
    path: path.resolve(__dirname, DIST + BASE_DIR),
    filename: "[name].js"
  },
  module: {
    // 各ファイル形式ごとのビルド設定
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        loader: "babel-loader",
        exclude: /(node_modules)/,
        options: {
          compact: true
        }
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: false,
              importLoaders: 2
            }
          },
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                includePaths: [PAGES_DIR]
              }
            }
          }
        ]
      }
    ]
  },
  // ソースマップの設定
  devtool: false,
  // webpack-dev-serverの設定
  devServer: {
    host: HOST,
    port: PORT,
    hot: true,
    open: true,
    watchFiles: [
      path.join(SRC, "/**/*.scss"),
      path.join(SRC, "/**/*.ts"),
      path.join(SRC, "/**/*.tsx")
    ]
  },
  // キャシュ有効化
  cache: false,
  resolve: {
    // 拡張子省略の設定
    extensions: [".js", ".ts", ".tsx", ".*"],
    // alias設定
    alias: {
      "~": path.join(__dirname, SRC)
    },
    fallback: {
      path: require.resolve("path-browserify"),
      querystring: require.resolve("querystring-es3")
    }
  },
  optimization: {
    chunkIds: "named",
    minimizer: [
      new TerserWebpackPlugin({
        extractComments: false
      })
    ]
  },
  plugins: [
    ...(argv.mode === "production"
      ? [
          // DISTをまっさらに
          new CleanWebpackPlugin()
        ]
      : [
          // ソースマップを設定
          new SourceMapDevToolPlugin({})
        ]),
    // 環境変数を設定
    new EnvironmentPlugin({
      NODE_ENV: argv.mode
    }),
    // MiniCssExtractPluginが残したゴミの除去
    new RemoveEmptyScriptsPlugin(),
    // 静的アセットをDISTにコピー
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "**/*",
          to: ".",
          context: STATIC
        }
      ]
    }),
    // 複数のHTMLファイルを出力
    ...(await getHtmlTemplates(env, argv)),
    new HtmlWebpackHarddiskPlugin(),
    // style.cssを出力
    new MiniCssExtractPlugin({
      filename: "[name].css"
    })
  ]
});
