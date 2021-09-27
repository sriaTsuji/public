module.exports = {
  mode: 'development',
  entry: {
    main: `./src/ts/main.ts`
  },
  output: {
    filename: '[name].js',
    path: `${__dirname}/dist/assets/js`
  },
  module: {
    rules: [{
      test: /\.ts$/,
      use: 'ts-loader',
    }],
  },
  resolve: {
    extensions: [
      '.ts', '.js',
    ],
  },
};