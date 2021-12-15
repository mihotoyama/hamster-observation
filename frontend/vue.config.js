module.exports = {
  outputDir: 'dist',
  assetsDir: './',
  publicPath: './',
  devServer: {
    proxy: {
        '/backend': {
            target: 'http://localhost:3000'
        }
    },
  },
}