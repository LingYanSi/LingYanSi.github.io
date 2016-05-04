
;(function(){

    // 如果每屏都有动画，那就需要动画实在当屏资源加载完毕后再执行的
    // 这里还要考虑的是，如果【上/下】屏资源没有加载完，用户是否可以滑动
    //     用户可以滑动： 里面去加载当前屏资源

    var $items = Array.prototype.slice.call(document.querySelectorAll('.test-item'))
    var LEN = $items.length
    // 有一个数组，然后按照一定的规则去一次加载资源

    var currentIndex = 1
    // 已经加载的数据
    var haveLoaded = 0

    // 执行动画
    function animation(index){
        if($items[index].dataset['lyLazyLoading']==='done'){
            $items[index].clientWidth
            $items[index].querySelector('.translate').classList.add('show')
        }
    }

    // 创建slide
    function createSlide(){

        var haha = LunBo({
            id: '#nuo',
            current: currentIndex, // 当前页
            direction: 'top', // 上下滑动还是左右滑动
            time: 2000, // 滑动间隔时间
            dottHidden: true, // 是否隐藏导航点
            loop: true, // 是否可循环
            flow: true, // 是否跟随手指滑动
            transitionend: function(current, prev, isValidSwipe, obj){ // 滑动结束回调
                currentIndex = current
                if(isValidSwipe){
                    // return
                    // 如果还没有加载该屏资源，就来加载，并且
                    !$items[current].dataset['lyLazyLoading']
                    ? loadImg(current, false) : animation(current)

                    if(prev!==undefined){
                        $items[prev].querySelector('.translate').classList.remove('show')
                    }
                }

            },
            touchendCallback: function(cha, current){
                // 手指触摸结束 cha:滑动距离，current:当前页码
                console.log(arguments)
            }
        });
    }

    // 资源加载后回调
    function loaded(index){
        if(index===currentIndex){
            // 执行动画
            animation(index)
        }
        // 首屏加载完成后执行
        if(haveLoaded===1){
            // 创建一个滑动组件
            createSlide()
        }
    }

    // 加载图片资源
    function loadImg(index,trail, callback ){
        index = index===undefined ? 0 : index
        trail = trail===undefined ? true : trail
        callback = callback===undefined ? loaded : callback

        index = index==LEN ? 0 : index
        var $item = $items[index]

        lyLazyLoad($item).then(function(arr){
            // 判断是否加载过
            if(arr.forEach){
                // 更改状态
                $item.dataset['lyLazyLoading'] = 'done'
                console.log(`第${index+1}加载完毕`)
                // 这里有个问题，如果滑动到这个屏幕，资源没有加载，立即去加载，会导致加载混乱
                callback && callback(index)
            }
            // 如果没有尾回调，就返回
            if(!trail) return

            haveLoaded++
            if(haveLoaded>=LEN){
                console.log('全部加载完毕');
                return
            }

            // 尾回调
            trail && loadImg(++index)
        })
    }

    loadImg(currentIndex)

})();
