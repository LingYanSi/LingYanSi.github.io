let fs = require('fs')
const EventEmitter = require('events')

function fuck(){
    class Handle extends EventEmitter {
        constructor() {
            super()
        }
    }

    let handle = new Handle()
    var Readable = new require('stream').Readable() ;

    handle.on('pipe', function(...arr){
        // console.log('数据接收中===》',...arguments);
        console.log(arr.length);
        console.log('data receiving------')
    })
    handle.write = function(xx) {
        console.log(xx);
        Readable.push(xx)
    }
    handle.end = function() {
        console.log('__END__')
        Readable.push(null)
    }
    Readable.pipe(process.stdout)

    return handle
}

let ss = fs.createReadStream('./../../javascripts/library/jquery-2.1.4.min.js')

ss.pipe( fuck())
