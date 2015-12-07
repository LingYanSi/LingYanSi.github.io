module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: 'webpack',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            // {pattern: 'src/*.less', included: false},

            // 'test/alertTest.js',
            'test/buttonTest.js',
            // 'app/button.js',
        ],


        // list of files to exclude
        exclude: [

        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'test/*.js': ['webpack','coverage']
        },


        webpack: {
            devtool: 'inline-source-map', //just do inline source maps instead of the default
            module: {
                loaders: [
                    {test: /\.js$/, loader: 'babel'},
                    {test: /\.less$/, loader: "style!css!less"}
                ]
            },
            babel: {
                presets: ['es2015','react']
            }
        },

        webpackMiddleware: {
            // webpack-dev-middleware configuration
            // i. e.
            noInfo: true,
            devtool: "#inline-source-map"
        },

        plugins: [
            require("karma-webpack"),
            require('karma-jasmine'),
            require('karma-coverage'),
            require('karma-chrome-launcher'),
        ],



        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'coverage'],
        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,


        // 单元测试
        // optionally, configure the reporter
        coverageReporter: {
            type: 'html',
            dir: 'coverage/'
        }
    });
};
