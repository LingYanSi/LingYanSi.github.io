
function slider( arg ){
    // 其实说来说去，都是current在变化，
    // 每个元素有三种状态 next prev current
    // 每次都是变化class

    var id = arg.id ;
    var $id = document.querySelector(id)
    arg.data = arg.data || [] ;

    var minTime = 400 ;
    // 自动播放时间间隔不能太小
    arg.time = arg.time< 400 ? 400 : arg.time ;

    var sl = {
        // 当前位置
        current: arg.current || 0 ,
        // 是否自动播放
        autoplay: arg.autoplay,
        // 切换方式对应的class
        style: {
            prev: '',
            next: ''
        },
        // 目前的几种切换方式
        styleArr: ['leftright','updown','opacity'],
        // 所有的元素
        items: [],
        // 下一页
        next(){
            this.jump(this.current+1 , 'next' );
        },
        // 上一页
        prev(){
            this.jump(this.current-1 , 'prev' );
        },
        // 切换动作
        jump(nextNum, dir ){
            if( !this.canJump() ) return
            nextNum = this.checkIndex(nextNum) ;
            // 如果下一页和当前页的页码重合 返回
            if(nextNum == this.current ) return

            this.autoplay && this.clearInterval();

            dir = dir || 'next' ;

            var currentItem = this.items[ this.current ];
            var nextItem = this.items[nextNum ] ;
            var nextClassList = nextItem.classList ;

            // 移除所有相关class
            nextClassList.remove('transition')
            nextClassList.remove( this.style.prev )
            nextClassList.remove( this.style.next )
            nextClassList.remove('hide');
            // 添加相关class
            if(dir=='next' ){
                nextClassList.add( this.style.next )

                // 强制reflow？repaint一下
                nextItem.clientHeight ;
                nextClassList.add('transition')
                nextClassList.remove( this.style.next )
                currentItem.classList.add( this.style.prev );

            }else{
                nextClassList.add( this.style.prev )

                nextItem.clientHeight ;
                nextClassList.add('transition')
                nextClassList.remove( this.style.prev )
                currentItem.classList.add( this.style.next );
            }

            this.current = nextNum ;
            // 是不是要自动播放
            this.autoplay && this.setInterval();
        },
        // setInterval存储
        setIntervalStore: [],
        // 自动播放
        setInterval(){
            this.setIntervalStore.push( setInterval(this.next.bind(this), arg.time|| 5000) )
        },
        // 清除自动播放
        clearInterval(){
            this.setIntervalStore.forEach(clearInterval);
            this.setIntervalStore = [] ;
        },
        checkIndex(num){
            if(num<0){
                num = this.items.length - 1
            }
            if(num> this.items.length - 1){
                num = 0
            }
            return num ;
        },
        // 是否可以切换
        canJump(){
            var nowTime = new Date().getTime()
            if( nowTime - (this.time||0) > minTime ){
                this.time = nowTime
                return true
            }
        },
        // 渲染
        render(){
            $id.innerHTML = `<div class="slider">
                <div class="items">
                    ${ arg.data.map((item, index)=>{
                        return `<a class="item transition ${index!=this.current?'hide':''}" href="${item.link}" style="background-image:url(${item.img})"></a>`
                    }).join(' ') }
                </div>
                <div class="navs">
                    ${
                        arg.data.map(()=>{
                            return `<button></button>`
                        }).join(' ')
                    }
                </div>
                <div class="btns">
                    <button class="slider-prev"><i class="icon icon-chevron-left"></i></button>
                    <button class="slider-next"><i class="icon icon-chevron-right"></i></button>
                </div>
            </div>`

            this.items = [].slice.call($id.querySelectorAll('.item') );
        },
        setStyle(){
            if( this.styleArr.every((item)=>{
                return item!= arg.style
            }) ){
                arg.style = 'leftright'
            }

            this.style = {
                prev: 'prev-'+ arg.style ,
                next: 'next-'+ arg.style
            }
        },
        init(){
            // 渲染
            this.render();

            this.setStyle();

            // 左右按钮切换事件
            eventProxy(id, 'click', '.slider-prev', ()=>{
                this.prev()
            })
            eventProxy(id, 'click', '.slider-next', ()=>{
                this.next()
            })

            // 渐变结束后隐藏
            this.items.forEach((item, index)=>{
                item.addEventListener('transitionend',()=>{
                    // 可能会被触发多次
                    if(index== this.current) return
                    item.classList.remove('transition')
                    item.classList.add('hide');
                })
            })

            // 是否自动播放
            this.autoplay && this.setInterval();
        }
    }

    // 初始化
    sl.init();

    return sl ;
}


var sl = new slider({
    data: [{
        img: 'http://ww1.sinaimg.cn/mw1024/69b8b46ejw1eug9g58jlfj20hs0hsn1z.jpg',
        link: 'http://www.xiaodian.com'
    },{
        img: 'http://ww3.sinaimg.cn/mw1024/8380d51ejw1esfsso6dh3j216o0sggq7.jpg',
        link: 'http://www.xiaodian.com'
    },{
        img: 'http://ww1.sinaimg.cn/mw1024/69b8b46egw1er0ygmbtm8j20gn0b4tbb.jpg',
        link: 'http://www.xiaodian.com'
    }], // 对应的数据
    id: '#slider', // 元素id
    autoplay: 0 , // 是否自动播放
    current: 1 , // 当前页面
    style: 'leftright', // updown/leftright/opacity
    time: 3000 , //多长时间切换一次 默认5000ms
})
