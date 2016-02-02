
'use strict'
var fs = require('fs')

function upload(arr, callback){
    Promise.all(
        arr.map((item)=>{
            return new Promise((resolve)=>{
                let a1 = item.split('\r\n\r\n')
                let value = a1[1].slice(0,-2)

                let a1Arr = a1[0].split('\r\n')
                let key = a1Arr[0].split(';')[1].split('=')[1].slice(1,-1);

                // 文件名
                let filename = a1Arr[0].split(';')[2]
                    filename = filename && filename.split('=')[1].slice(1,-1)
                    // 把binary字符串 -》 buffer => utf-8字符串
                    filename = filename && new Buffer(filename,'binary').toString()
                // 文件类型
                let fileType = filename? a1Arr[1].split(':')[1] : ''

                console.log(key,filename  )

                // 如果存在文件
                if(filename && fileType){
                    let oldname = filename
                    filename = new Date().getTime()+(filename.match(/\.[^\.]+$/)[0]||'')
                    console.log( '文件名',filename )
                    // 写入文件
                    fs.writeFile(filename, new Buffer(value,'binary'),(error)=>{
                        if(error) throw error

                        fs.exists('./'+filename,(exists)=>{
                            // 移动文件到指定文件夹
                            exists ? fs.rename('./'+filename,'./uploads/'+filename,()=>{
                                resolve({
                                    [key]: filename? filename : value ,
                                    oldname: oldname ,
                                    fileType: fileType
                                })
                            }) : ''
                        })
                    } )
                }else{
                    resolve({
                        [key]: filename? filename : value
                    })
                }
            })
        })
    ).then((data)=>{
        console.log( data );
        // 回调函数
        callback && callback( data )
    })

}
//
// '------WebKitFormBoundaryVpI6dxkl5xqqriFE',
//   'Content-Disposition: form-data; name="age"',
//   '',
//   'dsfasdfas',

module.exports = upload
