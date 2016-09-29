let path = require('path')

module.exports = {
    // 是否缓存
    cache: true,
    // 是否监听文件变化
    watch: true,
    // 是否在每次打包之前将之前的打包文件
    // 删除
    clearBeforeBuild: true,
    // 入口配置
    entry: {
        'index': './app.js',
    },
    // 输出配置
    output: {
        // 输出路径
        path: './',
        filename: "[name].js",
        // 块文件名称？
        chunkFilename: "[name].js",
    },
    module: {
        // 用来处理文件
        loaders: [
            // 对js/jsx文件的处理
            {
                test: /\.(js|jsx)$/,
                loader: 'babel'
            }
        ]
    },
    babel: {
        presets: ['es2015', 'stage-0'],
        plugins: ['transform-object-rest-spread']
    },
    resolve: {
        alias: {
            'redux': path.resolve('./redux/index.js'),
            'action': path.resolve('./action/'),
            'middleware': path.resolve('./middleware/'),
        },
        unsafeCache: true,
        // extensions: ['','js','jsx']
    }
}
