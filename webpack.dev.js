const path = require("path"); // node modulis dirbti su keliais iki failu
const HtmlWebpackPlugin = require("html-webpack-plugin"); // iskvieciam plugina html generuoti automatiskai kad butu galima
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

// css mimimizer:
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  optimization: {
    // [...]
    minimize: true,
  },
  mode: "development",
  devtool: "source-map", // galima matyti is kurio failo koks kodas atejo(consol.log'e tarkim, kad nerodytu kad atejo is main js)
  entry: {
    // kuri faila paims webpackas kaip pagrindini
    main: path.resolve(__dirname, "./src/app.js"), //main: path.resolve(__dirname, - gaunam kelia musu kompiuteri nuo pat pradzios kur yra musu failas. Galima butu ir rankiniu budu nurodyt. PAgal nutylejima imtu webpack.config.js faila, jei toki turetume sukure ir nesplitine i dev ir build
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    assetModuleFilename: "images/[name][ext]", // nurodom paveiksleliu talpinimo vieta
  }, // clean isvalo pries tai buvusia direktorija
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 8080,
    hot: true, // css reload nereloadinant html. pas mane veikia ir be to
  },
  module: {
    rules: [
      // imgages
      {
        test: /\.(png|svg|jpe?g|gif)$/i,
        type: "asset/resource",
      },
      //css loader
      {
        test: /.s?css$/, //pritaikkm.css failams
        use: [MiniCssExtractPlugin.loader, "css-loader"], // uzkraunam css
      },
      // babel loader
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "/src/html/template.html", // nurodom kelia is kur pasiimt template pagal kuri kurs html faila dist foldery
      templateParameters: {
        title: "We now know Webpack", // ka irasysim cia atsivaizduos index html ten kur busim ideja <%= title%> template.html faile
      },
      minify: {
        removeComments: true, // sugeneruotam index.html nerodys komentaru musu parasytu template.html faile
        collapseWhitespace: false,
      },
    }),
    new MiniCssExtractPlugin(),
  ],
};
