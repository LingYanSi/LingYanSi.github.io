var co = function(fn) {
    let ctx = this
    return new Promise((resolve, reject) => {
        let gen
        if (co.isGenerator(fn)) gen = fn.call(ctx)
        if (co.isFunction(fn.next)) gen = fn

        let result = {}

        function next() {
            if (!result.done) {
                // promise内部如果没有错误处理，就看不到报错了
                try {
                    // 如果是Promise
                    let v = result.value
                    if (co.isPromise(v)) {
                        // 如果是Promise，把结果交给next
                        v.then(res => {
                            result = gen.next(res)
                            next()
                        })
                        return
                    }

                    // 如果还是一个Generator
                    if (co.isGenerator(v) || (v && co.isFunction(v.next))) { 
                        // 执行Generator，并把结果传递给next
                        co.call(ctx, v).then(res => {
                            // console.log('res', res);
                            result = gen.next(res)
                            next()
                        })

                        return
                    }

                    // 如果是函数，执行函数，把函数结果传给next
                    if (co.isFunction(v)) {
                        // 如果是函数，执行函数，把函数结果传给next
                        result = gen.next(v())

                        return
                    }

                    // 其他情况
                    result = gen.next()
                    next()
                } catch (err) {
                    console.log(err);
                }
            } else {
                resolve(result.value)
            }
        }

        // 初始化
        next()

    })
}

// 校验是不是Generator函数
co.isGenerator = function(fn) {
    return Object.prototype.toString.call(fn) == "[object GeneratorFunction]"
}

// 校验是不是Generator函数
co.isPromise = function(obj) {
    return obj instanceof Promise
}

co.isFunction = function(fn) {
    return Object.prototype.toString.call(fn) == "[object Function]"
}

module.exports = co
