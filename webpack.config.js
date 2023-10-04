const webpack = require('webpack')

module.exports = {
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'sass-loader',
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            // Requires >= sass-loader@^8.0.0
            options: {
              implementation: require('sass'),
              sassOptions: {
                indentedSyntax: true // optional
              },
            },
          },
        ],

      },

    ],
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jquery: 'jquery',
      'window.jQuery': 'jquery',
      jQuery: 'jquery'
    })
  ]
};
