// 清空文件，然后复制文件

var fs = require('fs')
var child_process = require('child_process')

child_process.exec('rm -r ./js/')
child_process.exec('cp -r ./koa/static/js/ ./js/')

child_process.exec('rm -r ./database/')
child_process.exec('cp -r ./koa/static/database/ ./database/')
