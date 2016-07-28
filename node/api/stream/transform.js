const Transform = require('stream').Transform;

// traansform既可以读也可写
class Mytransfrom extends Transform {
    constructor(transform) {
        super({
                objectMode: true,
                highWaterMark: 16,
                transform
            })
    }
}

    // fs.createReadStream('./stream.js').pipe(process.stdout)
function addPre(option){

    return new Mytransfrom(function(file, enc, cb) {

        let str = `//庆历四年春 \n` + file.toString()
        // str = str.replace(/([^\n]+)\n/g, '$1/* -----这是注释---- */\n')
        console.log(str.match(/([^\n]+)\n/g));
        str = str.replace(/([^\n]+)\n/g,  '$1//注释\n')
        file = new Buffer(str)
        cb(null, file)
    })
}

function logger(option){

    return new Mytransfrom(function(file, enc, cb) {

        console.log(file.toString())
        cb(null, file)
    })
}


// 如此便通过一个中间件完成了对文件的处理
const fs = require('fs')
fs.createReadStream('./stream.js')
    .pipe(
        addPre()
    )
    .pipe( logger() )
    .pipe( fs.createWriteStream('./fuck.js'))
