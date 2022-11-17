const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); //css를 압축해주는 설정
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  entry: "./src/js/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
    clean: true,
  },
  devtool: 'source-map',
  mode: "development",
  devServer: {
    host: "localhost",
    port: 4200,
    open: true,
    watchFiles: 'index.html',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "keyboard", //브라우저 탭 타이틀
      template: "./index.html", //빌드를 할때 사용할 템플릿 파일, 최상위 루트에 있는 상대경로 파일, 이렇게 설정하면 HTML파일안에서 로데쉬 문법을 사용할 수 있게 해준다.
      inject: "body",
      favicon: "./favicon.ico"
    }),
    //HTML에 CSS를 inject[주입] 해주기 위해 사용한다.
    new MiniCssExtractPlugin({ filename: "style.css" }), //filename : 어떤 파일이름으로 HTML에 inject가 될건지 명시
  ],
  module: {
    rules: [
      {
        test: /\.css$/, //css파일을 이런 loader를 사용해서 읽어들이도록하겠다.
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin() //minimizer 속성 안에서 초기화 해준다.
    ]
  },
};