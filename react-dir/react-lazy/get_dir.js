'use strict'

let fs = require('fs')
let path = require('path')
let exec = require('child_process').exec

const dir = 'pages/'

// 查找文件夹内所有对的view.js
// 我们需要一个动态的router,还需要，每次打包出来的js文件是不一样的
// 本地环境，router动态更新，js文件动态更新

let entry = {}

function readdir(p){
    let arr = fs.readdirSync(p)

    arr.map(item => {
        let P = `${p}/${item}`
        let stat = fs.statSync(P)

        if(stat.isDirectory()){
            readdir(P)
        } else {
            if(item == 'view.js'){
                let key = p.replace(/\/+/g, '/')
                entry[key] = path.resolve(P)
            }
        }
    })
}

// exec(`rm -r dist/`, ()=>{})
readdir(dir)

module.exports = entry
