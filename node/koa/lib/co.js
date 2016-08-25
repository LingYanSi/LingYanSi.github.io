
var co = function(fn) {
    let ctx = this
    return new Promise((resolve, reject) => {
        let gen = fn.call(ctx, fn.__next)
        let result = {}

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
                if(co.isGenerator(result.value)){
                    // 执行Generator，并把结果传递给next
                    co.call(ctx, result.value).then(res => {
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

co.isGenerator = function(fn){
    return Object.prototype.toString.call(fn) == "[object GeneratorFunction]"
}

module.exports = co
