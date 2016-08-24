let http = require('http')

let server = http.Server((req, res) => {
    let ctx = {req, res}

    if (!app.reversed) {
        app.mds.reverse()
        app.reversed = true
        let pre
        let add = function(item, pre){
            // 绑定作用于域，以及参数
            return item.bind(ctx, pre)
        }
        app.mds.forEach(item => {
            pre = add(item, pre)
        })

        app.fn = pre
    }

    // 自动执行Generator函数
    co(app.fn)
})

server.listen(10240, () => {
    console.log(new Date().toString(), 'listen 10240 port');
})

let app = {
    use(fn) {
        this.mds.push(fn)
    },
    mds: []
}

app.use(function *(next) {
    this.user = {name: 11}
    console.log('第一层', this.user );

    let hello = yield next
    console.log('回到--》第一层:', hello);

    hello += yield new Promise(res => {
        setTimeout(()=>{
            res('哈哈哈哈');
        }, 5000)
    })
    this.res.setHeader('status', 200)
    this.res.end(hello)
})

app.use(function *(next) {
    console.log('第二层');
    let he = yield next
    console.log('回到-->第二层', he);

    return '孙小飞'
})

app.use(function *(next) {
    console.log('第三层');
    return '你好吗'
})

//  需要把所有的Generator函数转成一个，然后把函数交给co执行
// 函数转换，是通过剥洋葱的形式，把后面函数的执行结果当作参数传递给前一个函数
// 这个如何实现呢？

// 可以yield promise Generator 其他一般数据



var co = function(fn) {
    let gen = fn()
    let result = {}
    console.log(gen);

    return new Promise((resolve, reject) => {
        function next() {
            if (!result.done) {
                // console.log('进来了吗', result.value, result.value instanceof Promise, Object.prototype.toString(result.value) == "[object GeneratorFunction]");
                // 如果是Promise
                if(result.value instanceof Promise){
                    // 如果是Promise，把结果交给next
                    result.value.then(res => {
                        result = gen.next(res)
                        next()
                    })
                    return
                }
                // 如果还是一个Generator
                if(Object.prototype.toString.call(result.value) == "[object GeneratorFunction]"){
                    // 执行Generator，并把结果传递给next
                    co(result.value).then(res => {
                        // console.log('res', res);
                        result = gen.next(res)
                        next()
                    })

                    return
                }

                // 其他情况
                result = gen.next()
                // console.log(result);
                // 如果Generator没有结束，就一直执行到结束
                next()
            } else {
                // console.log('结束了', result.value);
                resolve(result.value)
            }
        }

        // 初始化
        next()
    })
}
