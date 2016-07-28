//庆历四年春 //注释
let fs = require('fs')//注释
const EventEmitter = require('events')//注释
//注释
function fuck(){//注释
    class Handle extends EventEmitter {//注释
        constructor() {//注释
            super()//注释
        }//注释
    }//注释
//注释
    let handle = new Handle()//注释
    var Readable = new require('stream').Readable() ;//注释
//注释
    handle.on('pipe', function(...arr){//注释
        // console.log('数据接收中===》',...arguments);//注释
        console.log(arr.length);//注释
        console.log('data receiving------')//注释
    })//注释
    handle.write = function(xx) {//注释
        console.log(xx);//注释
        Readable.push(xx)//注释
    }//注释
    handle.end = function() {//注释
        console.log('__END__')//注释
        Readable.push(null)//注释
    }//注释
    Readable.pipe(process.stdout)//注释
//注释
    return handle//注释
}//注释
//注释
let ss = fs.createReadStream('./../../javascripts/library/jquery-2.1.4.min.js')//注释
//注释
ss.pipe( fuck())//注释
