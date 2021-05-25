const path = require('path'); // node modulis dirbti su keliais iki failu
const HtmlWebpackPlugin = require('html-webpack-plugin'); // iskvieciam plugina html generuoti automatiskai kad butu galima
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
// css mimimizer:
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  optimization: {
    // [...]
    minimize: true,
  },
  mode: 'production',
  devtool: false, // galima matyti is kurio failo koks kodas atejo(consol.log'e tarkim, kad nerodytu kad atejo is main js)
  entry: {
    // kuri faila paims webpackas kaip pagrindini
    main: path.resolve(__dirname, './src/app.js'), // main: path.resolve(__dirname, - gaunam kelia musu kompiuteri nuo pat pradzios kur yra musu failas. Galima butu ir rankiniu budu nurodyt. PAgal nutylejima imtu webpack.config.js faila, jei toki turetume sukure ir nesplitine i dev ir build
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    assetModuleFilename: 'images/[hash][ext]', // nurodom paveiksleliu talpinimo vieta//hash - pakeis paveiksleliu vardus i random
  }, // clean isvalo pries tai buvusia direktorija

  module: {
    rules: [
      // imgages
      {
        test: /\.(png|svg|jpe?g|gif)$/i,
        type: 'asset/resource',
      },
      // css loader
      {
        test: /.s?css$/, // pritaikkm.css failams
        use: [MiniCssExtractPlugin.loader, 'css-loader'], // uzkraunam css
      },
      // babel loader
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },

  plugins: [
    new ImageMinimizerPlugin({
      minimizerOptions: {
        // Lossless optimization with custom option
        // Feel free to experiment with options for better result for you
        plugins: [
          ['gifsicle', { quality: true }],
          ['mozjpeg', { quality: 50 }],
          ['pngquant', { quality: [0.5, 0.7] }],
          ['svgo'],
        ],
      },
    }),

    new HtmlWebpackPlugin({
      template: '/src/html/template.html', // nurodom kelia is kur pasiimt template pagal kuri kurs html faila dist foldery
      templateParameters: {
        title: 'We now know Webpack', // ka irasysim cia atsivaizduos index html ten kur busim ideja <%= title%> template.html faile
      },
      minify: {
        removeComments: true, // sugeneruotam index.html nerodys komentaru musu parasytu template.html faile
        collapseWhitespace: false,
      },
    }),
    new MiniCssExtractPlugin(),
  ],
  optimization: {
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      // `...`,
      new CssMinimizerPlugin(),
    ],
  },
};
