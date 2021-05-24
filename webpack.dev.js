const path = require("path"); // node modulis dirbti su keliais iki failu

module.exports = {
  mode: "development",
  entry: {
    // kuri faila paims webpackas kaip pagrindini
    main: path.resolve(__dirname, "./src/app.js"), //main: path.resolve(__dirname, - gaunam kelia musu kompiuteri nuo pat pradzios kur yra musu failas. Galima butu ir rankiniu budu nurodyt. PAgal nutylejima imtu webpack.config.js faila, jei toki turetume sukure ir nesplitine i dev ir build
  },
  output: {},
  module: {},
  plugins: [],
};
