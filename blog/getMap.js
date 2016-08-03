'use strict'
let fs = require('fs')
let path = require('path')
let PRO = process.argv.slice(2)[0] == 'production'

// 获取文件名，然后去生成map app_sth.js
let obj = {}
const STATIC = PRO ? './static' : ''
const PARENT = PRO ? './static' : './koa/static'

fuck(`${PARENT}/js`, '/js/', PRO)
fuck(`${PARENT}/css`, '/css/', PRO)
fuck(`${PARENT}/lib/js`, '/lib/js/', PRO)
fuck(`${PARENT}/lib/css`, '/lib/css/', PRO)

function fuck(dirpath, PRE, MIN) {
    const dir = fs.readdirSync(dirpath)

    // 获取压缩文件夹路径
    let min_dir = []
    const MIN_PATH = path.resolve(dirpath, 'min')
    if (fs.existsSync(MIN_PATH)) {
        min_dir = fs.readdirSync(MIN_PATH)
        // console.log(min_dir);
    }

    dir.forEach(item => {
        let stat = fs.statSync(path.resolve(dirpath, item))
        if (stat.isFile()) {
            const pre_path = PRE + item
            obj[pre_path] = STATIC + pre_path
                // 去min文件夹找对应压缩文件，压缩文件的约定为 minfilename.startsWith(filename+.min)
            MIN && min_dir.some(ele => {
                // 去后缀
                let __item = item.slice(0, item.lastIndexOf('.'))
                if (ele.startsWith(`${__item}.min`)) {
                    obj[pre_path] = `${STATIC}${PRE}min/${ele}`
                }
            })
        }
    })

}

console.log(obj);
var str = `module.exports=${JSON.stringify(obj)}`
fs.writeFileSync('./router_config.js', str)
