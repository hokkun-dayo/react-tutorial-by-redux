module.exports={
  entry: ["./src/app.js"],
  output: {
    path: __dirname+"/dist/public",
    filename: "app.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  }
}
