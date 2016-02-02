

'use strict'

var md5 = require('blueimp-md5')
var fs = require('fs')
var path = require('path')

function rename(filenames){
    var JSPATH = './static/'
    var filenames = filenames

    // 使用promise
    Promise.all( filenames.map((item)=>{
        return new Promise( (resolve)=>{
            let oldname = JSPATH+item
            if( !fs.existsSync(oldname) ) resolve({})
            let md5Str = md5( fs.readFileSync(oldname).toString() )
            let newname = `${oldname}.${md5Str}.js`
            fs.rename(oldname, newname,()=>{
                resolve({
                    oldname: oldname,
                    newname: newname
                })
            })
        })
    }) ).then( (data)=>{

        // 然后读取map文件，重新生成一个map文件

        let JSMAPPATH = './fileMap.json'
        if( !fs.existsSync(JSMAPPATH) ){
            console.log('file is not exists')
            return
        }

        var jsonData = JSON.parse( fs.readFileSync(JSMAPPATH).toString() )

        data.forEach((item)=>{
            jsonData[item.oldname] = item.newname
        })

        fs.writeFile(JSMAPPATH, JSON.stringify( jsonData) , ()=>{
            console.log( '数据更新成功', data )
        })
    })

}

// module.exports rename

// 更关键的应该是文件cdn化
rename(['js/home/a.js','js/home/b.js'])

// 需要一个接口，文件上传后，{oldname:'.js/css 静态文件', newname: oldname+md5} 设置缓存时间30天
