;(function(){
    if(window.Promise) return
    var q = function(fun, func) {
        // 参数校验 fun = function(res, rej)
        // func = function(res, rej)

        // 状态变化监听函数集合
        this.statusChangeCallback = []
            // 任务队列
        this.queueArr = []
            // this.catchArr = []

        // 失败
        this.reject = function(value) {
            this.done('reject', 'fail', value)
        }.bind(this)

        // 完成
        this.resolve = function(value) {
            this.done('resolve', 'done', value)
        }.bind(this)

        // 加入到任务队列中,返回一个接受then方法的对象
        this.queueArr.push(fun)
            // 延时执行

        // 有时，我们需要同步拿到resolve,reject钩子
        func && func(this.resolve, this.reject)

        setTimeout(this.next.bind(this), 1)

        return this
    }
    q.prototype = {
        next: function() {
            this.status = 'PENDING'
            try {
                this.queueArr[0] && this.queueArr[0](this.resolve, this.reject)
            } catch (mes) {
                this.catchCallback && this.catchCallback(mes)
            }
        },
        then: function(res, rej) {
            // 把所有的then都缓存都到队列里
            this.queueArr.push({
                resolve: res,
                reject: rej
            })

            return this
        },
        catch: function(fun) {

            this.catchCallback = fun
            return this

        },
        // 添加一个监听状态发生变化的函数
        addStatusChanger: function(fun) {
            this.statusChangeCallback.push(fun)
        },
        // 状态发生变化
        statusChange: function(value) {
            // status 应该是个数组，因为一个promise对象可能会被多个all/one给监听
            this.statusChangeCallback.forEach(function(item) {
                item(value)
            })
        },
        done: function(type, status, value) {
            // 移除已经执行的任务
            this.queueArr.splice(0, 1)
            this.status = status
                // 触发状态变化时间
            this.statusChange(this.status, value)
            if (this.queueArr[0]) {
                var then
                try {
                    // 执行then resolve/reject函数
                    then = this.queueArr[0][type](value)
                } catch (mes) {
                    this.catchCallback && this.catchCallback(mes)
                }

                // 移除已经执行了的任务
                this.queueArr.splice(0, 1)

                // 如果then方法执行返回的结果还是一个promise对象，就把队列中的所有then方法转移给新的promise对象
                then instanceof q && [].push.apply(then.queueArr, this.queueArr)
            }
        }
    }
    q.all = function(arr) {
        // arr = []
        // 接受一个数组参数
        return q.some(arr, arr.length)
    }

    q.one = function(arr) {
        // 也是接受一个数组参数
        return q.some(arr, 1)
    }

    q.some = function(arr, num) {
        // 也是接受一个数组参数
        var len = arr.length
        var i = 0
            // 缓存每个promise的值
        var valueArr = []
        var resolveCache
            // 先新建一个Promise，

        // 因为resolve的获取是异步的，它要比foreach内的statusChange执行的晚
        // 因此Promise的reslove与reject应该被同步获取
        var self
        var ss = new q(function(res, rej) {
            // resolveCache = res
        }, function(res, rej) {
            resolveCache = res
        })

        arr.forEach(function(item, index) {
            // 他并没有及时的添加到每一个promise上
            // 因为
            item.addStatusChanger(function(value) {
                valueArr[index] = value
                i++;
                // 因为Promise是异步的,如果所有的resolve都是同步的,这时候resolveCache还是undefined
                // 如果有异步的resolve，就会触发ss里的resolve
                i == num && resolveCache && resolveCache(valueArr)
            })
        })

        // 因为Promise是异步的如果Promise.all也是异步的话，就造成不能同步的给传递进来的Promise添加statusChange事件监听
        // 因此Promise.all中的addStatusChanger应该是同步的
        // 如果都是同步的resolve就return一个新的Promise
        if (i == num) {
            return new q(function(resolve, reject) {
                resolve(valueArr)
            })
        }

        // 处理含有异步的resolve
        return ss
    }
    window.Promise = q
})();
