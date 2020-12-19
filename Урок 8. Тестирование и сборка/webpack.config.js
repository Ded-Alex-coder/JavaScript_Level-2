const path = require('path');

module.exports = {
   mode: 'development',
   entry: './src/js/main',

   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: "./build.Ded-Alex.js"
   },

   // module: {
   //    rules: [
   //       {
   //          test: /\.js$/,
   //          use: [{ loader: 'babel-loader' }],
   //       }
   //    ]
   // }
}
