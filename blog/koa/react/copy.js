var fs = require('fs')
var child_process = require('child_process')

fs.watch('./../static/js/app.js', function(){
    console.log('文件发生了变化');
    console.log('开始复制文件');
    child_process.exec('cp ./../static/js/app.js ./js/app.js')
    console.log('文件复制完毕')
})
