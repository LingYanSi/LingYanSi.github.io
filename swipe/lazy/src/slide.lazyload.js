function lyLazyLoad(ele, time) {
    // 有三种类型 img bgd poster
    time = time || 2000
    // 是否已经加载过
    if(ele.dataset['lyLazyLoading']){
        return new Promise(function(resolve){
            resolve('已经加载过了')
        })
    }
    ele.dataset['lyLazyLoading'] = 'pending'

    var toArr = function(des) {
        return [].slice.call(des)
    }

    // 渲染
    var render = function(element, src) {
        if (element.classList.contains(LAZY_CLASSS[0])) {
            element.src = src
        } else if (element.classList.contains(LAZY_CLASSS[1])) {
            element.style.backgroundImage = 'url(' + src + ')'
        } else if (element.classList.contains(LAZY_CLASSS[2])) {
            element.poster = src
        }
    }

    var LAZY_CLASSS = ['ly-lazy-img', 'ly-lazy-bgd', 'ly-lazy-poster']

    var all = Array.prototype.concat.apply([], LAZY_CLASSS.map(function(item){
        return toArr(ele.querySelectorAll('.' + item))
    }) )

    // 需要去除相同元素

    // 如果同一元素含有多个LAZY_CLASS 如何处理

    return Promise.all(all.map(function(item) {
        var src = item.dataset['lyLazySrc']

        return new Promise(function(resolve, reject) {
            var img = new Image()
            img.src = src

            // 如果图片已经被加载过，就不用再加载了
            if (img.complete || img.width) {
                render(item, src)
                resolve(src)
            } else {
                img.onload = function() {
                    render(item, src)
                    resolve(src)
                }
                img.onerror = function() {
                    render(item, src)
                    resolve(src)
                }
                img.onabort = function() {
                    render(item, src)
                    resolve(src)
                }
            }
            // 有的时候因为资源加载不动或者其他原因，设置一个安全时间
            time!==undefined && setTimeout(function(){
                render(item,src)
                resolve(src)
            },time)
        })
    }))
}
