const path = require("path"); // node modulis dirbti su keliais iki failu
const HtmlWebpackPlugin = require("html-webpack-plugin"); // iskvieciam plugina html generuoti automatiskai kad butu galima

module.exports = {
  mode: "development",
  entry: {
    // kuri faila paims webpackas kaip pagrindini
    main: path.resolve(__dirname, "./src/app.js"), //main: path.resolve(__dirname, - gaunam kelia musu kompiuteri nuo pat pradzios kur yra musu failas. Galima butu ir rankiniu budu nurodyt. PAgal nutylejima imtu webpack.config.js faila, jei toki turetume sukure ir nesplitine i dev ir build
  },
  output: {},
  module: {},
  plugins: [
    new HtmlWebpackPlugin({
      template: "/src/html/template.html", // nurodom kelia is kur pasiimt template pagal kuri kurs html faila dist foldery
    }),
  ],
};
