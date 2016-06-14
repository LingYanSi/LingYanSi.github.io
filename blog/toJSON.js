'use strict'

var fs = require('fs')
var exec = require('child_process').exec

// 获取命令行的输出，输出是异步的，因此就用了个promise
function getStdout(command){
    return new Promise(function(resolve, reject){
        exec(command, function(err, stdout, stderr){
            resolve(stdout)
        })
    })
}

getStdout('git status --porcelain').then(function(stdout){
    console.log('------------------------fuck you---------------------');
    console.log(stdout);

    toJSON(stdout)
})

// 读取文件然后解析文件
// var list_str = fs.readFileSync('./file_list.txt','utf-8')
// toJSON(list_str)
// 上下两种方法的优异
// 1. 使用bash的话，还需要把output存储到一个中转文件里，显示是不合时宜的
// 2. 通过child_process.exec方便的执行shell命令，并拿到了输出，但输出却是异步的
// 3. 对于shell命令比较少的情况，可直接使用node，多的话就用bash吧

function toJSON(str){
    // 根据换行符
    var lines_arr = str.split(/\n/g)
    // 获取【新增、修改、删除】的文件，然后可以对这些文件进行处理，【一般上传到cdn】
    var change_file = lines_arr.filter(item => item)
            .map(item => {
                let arr = item.trim().split(/\s+/)
                return {
                    type: arr[0] ,
                    file: arr[1]
                }
            })
            .filter(item => item.type != 'D' && !item.file.endsWith('file_list.txt'))

    console.log(change_file);

    return change_file
}
