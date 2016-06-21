/*
* 队列事件
*/

var Queue = function(func){
    this.cache = []

    var that = this
    this.setTimeout = []
    this.push = function(sth){
        // 缓存起来
        that.cache.push(sth)
        // 会在setTimeout的时候执行
        that.setTimeout.push(
            setTimeout(function(){
                if(that.cache.length){
                    // dosth
                    func && func()
                    that.cache = []
                    // 清空倒计时时间
                    that.setTimeout.forEach(clearTimeout)
                    that.setTimeout = []
                }
            },0)
        )
    }

}
