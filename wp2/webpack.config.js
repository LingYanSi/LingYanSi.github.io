let webpack = require('webpack')

module.exports = {
    entry: {
        'main': ['./src/main.js'],
        'app': ['./src/app.js']
    },
    output: {
        path: './dist/',
        filename: '[name].[chunkHash:9].js'
    },
    watch: true
}
