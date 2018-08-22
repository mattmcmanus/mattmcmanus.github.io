const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')

module.exports = {
  entry: './index.js',
  output: {
    filename: '_generated_loader_css.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { importLoaders: 1 } },
            'postcss-loader'
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('tailwind.css')
  ]
}
