/*
* @Author: zikong
* @Date:   2015-12-04 17:53:03
* @Last Modified by:   zikong
* @Last Modified time: 2015-12-16 11:27:12
*/

'use strict';

// translateStore 存储每个元素的当前状态，如果数据发生变法就重新渲染dom
// 如果输 '
var LunBo = (function(){
    var fun = function(arg){
        arg = arg || {} ;
        if( !arg.id ){
            console.warn('id不能为空');
            return ;
        }
        var $id = document.querySelector( arg.id);
        // 默认的轮播数据来源
        var dataArr = eval( $id.getAttribute('data-arr') ) ;
        // 滑动方向，默认左右
        var TOLEFT = arg.direction === 'left' ? true : false
        // 轮播时间间隔，默认1000
        var TIME = arg.time < 1000 ? 1000 : arg.time
        // 导航点，默认隐藏
        var DOTT = arg.dottHidden === undefined ? true : arg.dottHidden
        // 循环，默认true
        var LOOP = arg.loop===undefined ? true : arg.loop
        // console.log( dataArr )
        var FLOW = arg.flow===undefined ? true : arg.flow

        // 判断是不是移动设备
        var ISPHONE = window.navigator.userAgent.toLowerCase().match(/ipad|iphone|android/g)

        // 对于android的兼容
        var transitionend = window.navigator.userAgent.toLowerCase().match('android')?'webkitTransitionEnd':'transitionend' ;

        var dataArrExit = true

        if( !dataArr || !Array.isArray(dataArr) || !dataArr.length ){
            // 如果数据为空，模拟一个数据
            dataArrExit = false
            dataArr = [].slice.call($id.firstElementChild.children).map(item=>1)
        }

        var translateStore = [] ,
            transitionStore = [] ,
            LEN = dataArr.length ,
            $items = [] ,
            $dotts = [] ,
            current= arg.current || 0 ,
            oldCurrent ;

        var store = {
            autoplay: arg.autoplay || false ,
            PREVSTATE: TOLEFT ? 'translate3d(-100%,0,0)' : 'translate3d(0,-100%,0)',
            CURRENTSTATE: 'translate3d(0,0,0)',
            NEXTSTATE: TOLEFT ? 'translate3d(100%,0,0)' : 'translate3d(0,100%,0)',
        }


        var touch = {
            leftS: 0,
            topS: 0,
            cha: 0,
            moveX: false,
            moveY: false,
            width: TOLEFT ? $id.clientWidth : $id.clientHeight ,
            height: $id.clientHeight ,
            prev: 0 ,
            current: current,
            next: 0 ,
            isCanSwipe: 0 ,
            swiping: 0 ,
            transitionendNum: 0 ,
        };

        window.addEventListener('resize',()=>{
            touch.width = $id.clientWidth , touch.height = $id.clientHeight
        });

        var RAF = function(fun){
            // 对requestAnimationFrame的hack
            window.requestAnimationFrame ? requestAnimationFrame(fun) : fun()
        }



        var util = {
            // 添加子元素
            appendChild: function(){
                // 对于一般左右滑动组件的使用
                if(dataArrExit){
                    $id.innerHTML = ` <div class="banner-items">
                                     ${dataArr.map((ele)=>{
                                       return `<a href="${ele.link}" style="background-image:url(${ele.img})" class="banner-item"></a>`
                                    }).join(' ') }
                                </div>
                                <div class="banner-dotts" style="display:${LEN==1 || DOTT?"none":"block"}">
                                    ${dataArr.map((ele)=>{
                                       return `<span class="banner-dott"></span>`
                                    }).join(' ') }
                                </div> ` ;
                }

                $items = [].slice.call( $id.firstElementChild.children) ;
                $dotts = DOTT ? [].slice.call( $id.lastElementChild.children): [] ;
            },
            // 设置
            setState: function(){
                translateStore.forEach((ele,index)=>{
                    $items[index].style.cssText += ele ;
                });
                this.currentChange();
            },
            // 导航点变化
            currentChange: function(){
                !DOTT && translateStore.forEach((ele,index)=>{
                    index== current ? $dotts[index].classList.add('current') : $dotts[index].classList.remove('current') ;
                });
            },
            // 更改值
            setTranslateStore: function(index, newValue){
                // console.log( index);
                translateStore[index] = this.autoprefix( newValue );
                $items[index].style.cssText += translateStore[index] ;
            },
            // 初始化 translateStore
            initTranslateStore: function( index ){
                // translateStore.length = LEN ;
                dataArr.forEach((ele, index, arr)=>{
                    // 默认都没有current
                    if( index==current ){
                        translateStore.push( this.autoprefix(store.CURRENTSTATE) );
                    }else{
                        translateStore.push( this.autoprefix(store.PREVSTATE) );
                    }
                });
                this.setState();
            },
            // 添加css前缀
            autoprefix: function( translate ){
                return `;-webkit-transform:${translate};transform:${translate};` ;
            },
            handleTransition: function( index, index2){
                if(index!==undefined){
                    $items[index].classList.add('current');
                    transitionStore[index] = 1 ;
                }else{
                    // transitionend 滑动结束''
                    transitionStore.forEach((ele, index, arr)=>{
                        // console.log( '状态current', ele )
                        ele && $items[index].classList.remove('current') ;

                        arr[index] = 0 ;
                        // if( index != current && index!= this.checkIndex(current-1,'prev') && index!= this.checkIndex(current+1,'next') )
                        //     $items[index].style.visibility = "hidden"
                        // else
                        //     $items[index].style.visibility = "visible"
                    });
                }
            },
            // 开始触摸
            touchStart: function(event){
                touch.osSwipe = 0

                // console.log('鼠标按下')
                    if(!TOLEFT){
                        // event.stopPropagation()
                        // event.preventDefault()
                    }
                if(touch.swiping) return

                store.autoplay && this.pause() ;
                var touches = ISPHONE ? event.touches[0] : event ;
                touch.leftS = touches.clientX ;
                touch.topS = touches.clientY ;


                // 避免系统级返回触发滑动事件
                if(ISPHONE && TOLEFT && (touch.leftS/touch.width<0.05 || touch.leftS/touch.width>0.95) ){
                    touch.osSwipe = 1
                    return
                }

                requestAnimationFrame(()=>{
                    touch.prev = this.checkIndex( current-1,'prev')
                    touch.next = this.checkIndex( current+1,'next')
                    touch.current = current
                    touch.isCanSwipe = 1
                    this.setTranslateStore(touch.current, store.CURRENTSTATE) ;
                    this.setTranslateStore(touch.prev, store.PREVSTATE) ;
                    this.setTranslateStore(touch.next, store.NEXTSTATE) ;
                })

            },
            // 滑动中
            touchMove: function(event){
                // console.log('滑动中', touch)
                // console.log(current, touch.prev , touch.next)
                if(!TOLEFT){
                    event.stopPropagation()
                    event.preventDefault()
                }
                if(touch.swiping || touch.osSwipe || !touch.isCanSwipe ) return

                var touches = ISPHONE ? event.touches[0] : event ;
                var left = touches.clientX ;
                var top = touches.clientY ;

                // 左右滑动
                if(  touch.moveX || (!touch.moveY && Math.abs(top - touch.topS) - Math.abs( left - touch.leftS)<0) ){


                    touch.moveX = 1 ;
                    touch.moveY = 0 ;

                    if(!TOLEFT) return

                    touch.cha = left - touch.leftS ;
                    // 如果不跟随
                    if(!FLOW){
                        event.stopPropagation()
                        event.preventDefault()
                        return
                    }



                    if(!LOOP && ( touch.cha < 0 && current==LEN-1 || touch.cha > 0 && current==0) ){
                        var old = touch.cha
                        requestAnimationFrame(()=>{
                            old>0  && console.log(touch.next, store.NEXTSTATE)
                            old>0 ? this.setTranslateStore(touch.next, store.NEXTSTATE) : this.setTranslateStore(touch.prev, store.PREVSTATE) ;
                            this.setTranslateStore(touch.current, store.CURRENTSTATE)
                        })
                        touch.cha = 0
                        return
                    }
                    event.stopPropagation()
                    event.preventDefault()

                    var old = touch.cha
                    RAF(function(){
                        if(touch.swiping) return
                        // 我怎么感觉这里应该把touch状态clone一边，缓存下来
                        this.setTranslateStore( current,`translate3d(${touch.cha/touch.width*100}%,0,0)`) ;
                        if(old>0){
                            // 避免左右滑动过快，引发没有隐藏
                            dataArr.length>2 && this.setTranslateStore(touch.next, store.NEXTSTATE) ;
                            this.setTranslateStore(touch.prev,`translate3d(${(touch.cha-touch.width)/touch.width*100}%,0,0)`);
                        }
                        if(old<0){
                            // 避免左右滑动过快，引发没有隐藏
                            dataArr.length>2 && this.setTranslateStore(touch.prev, store.PREVSTATE) ;
                            this.setTranslateStore(touch.next, `translate3d(${(touch.cha+touch.width)/touch.width*100}%,0,0)`) ;
                        }
                        // 滑动中回调函数
                        arg.touchmove && arg.touchmove(touch)
                    }.bind(this))

                }
                // 上下滑动
                if( touch.moveY || (!touch.moveX && Math.abs(top - touch.topS) - Math.abs( left - touch.leftS)>0) ){
                    touch.moveX = 0 ;
                    touch.moveY = 1 ;

                    if(TOLEFT) return

                    touch.cha = top - touch.topS ;
                    // 如果不跟随
                    if(!FLOW){
                        event.stopPropagation()
                        event.preventDefault()
                        return
                    }

                    // 不能循环滑动
                    if(!LOOP && ( touch.cha < 0 && current==LEN-1 || touch.cha > 0 && current==0) ){
                        touch.cha = 0
                        return
                    }

                    RAF(function(){
                        if(touch.swiping) return
                        // 我怎么感觉这里应该把touch状态clone一边，缓存下来
                        this.setTranslateStore( current,`translate3d(0,${touch.cha/touch.height*100}%,0)`) ;
                        if(touch.cha>0){
                            // 避免左右滑动过快，引发没有隐藏
                            dataArr.length>2 && this.setTranslateStore(touch.next, store.NEXTSTATE) ;
                            this.setTranslateStore(touch.prev,`translate3d(0,${(touch.cha-touch.height)/touch.height*100}%,0)`);
                        }
                        if(touch.cha<0){
                            // 避免左右滑动过快，引发没有隐藏
                            dataArr.length>2 && this.setTranslateStore(touch.prev, store.PREVSTATE) ;
                            this.setTranslateStore(touch.next, `translate3d(0,${(touch.cha+touch.height)/touch.height*100}%,0)`) ;
                        }
                        // 滑动中回调函数
                        arg.touchmove && arg.touchmove(touch)
                    }.bind(this))


                }

                // this.transitionendCallback()
            },
            // 滑动结束
            touchEnd: function(){
                // console.log('鼠标抬起来了')
                if(!TOLEFT){
                    // event.stopPropagation()
                    // event.preventDefault()
                }
                if( touch.swiping ) return


                oldCurrent = current ;


                // 不跟随
                if(!FLOW){
                    // 如果存在回调函数
                    if(arg.callback){
                        // 当前current, 长度, 位移, 滑动是否有效
                        // 次callback只有在flow=false时有效
                        arg.callback(current, LEN, touch.cha, (TOLEFT?touch.moveX:touch.moveY) )
                        // 重置touch
                        this.resetTouch(touch)
                        return
                    }else{
                        // 不存在回调函数
                        (TOLEFT?touch.moveX:touch.moveY) && touch.cha/touch.width>0.1 && this.prev() ;
                        (TOLEFT?touch.moveX:touch.moveY) && touch.cha/touch.width<-0.1 && this.next() ;
                        this.resetTouch(touch)
                        return
                    }
                }

                RAF(function(){
                    if( touch.cha!=0){
                        touch.swiping = 1
                        this.addEventListener()
                    }

                    // $('#debug').text(JSON.stringify(touch))
                    if( touch.cha>0 ){
                        this.handleTransition( current );
                        this.handleTransition( touch.prev );
                        touch.prev != touch.next && this.setTranslateStore( touch.next, store.NEXTSTATE )

                        $id.clientWidth
                        if( touch.cha/touch.width>0.1 ){
                            this.setTranslateStore( current, store.NEXTSTATE )  ;
                            this.setTranslateStore( touch.prev, store.CURRENTSTATE )  ;
                            current = touch.prev ;
                        }else{
                            this.setTranslateStore( current, store.CURRENTSTATE )  ;
                            this.setTranslateStore( touch.prev, store.PREVSTATE )  ;
                        }

                    }else if( touch.cha<0 ){
                        this.handleTransition( current );
                        this.handleTransition( touch.next );
                        touch.prev != touch.next && this.setTranslateStore( touch.prev, store.PREVSTATE )

                        $id.clientWidth
                        if( touch.cha/touch.width<-0.1 ){
                            this.setTranslateStore( current, store.PREVSTATE )  ;
                            this.setTranslateStore( touch.next, store.CURRENTSTATE )  ;
                            oldCurrent = current
                            current = touch.next ;
                        }else{
                            this.setTranslateStore( current, store.CURRENTSTATE )  ;
                            this.setTranslateStore( touch.next, store.NEXTSTATE)  ;
                        }
                    }

                    if( touch.cha!=0){
                        // touch.isCanSwipe = 0 , touch.swiping = 1;
                        oldCurrent!=current && this.currentChange();
                    }else{
                        touch.swiping = 0 ;
                        store.autoplay && this.run() ;
                    }

                    this.resetTouch(touch);

                }.bind(this))

            },
            // 重置touch数据
            resetTouch(touch){
                Object.keys(touch).forEach((ele)=>{
                    if( ele!='width' && ele!='height' && ele!='swiping'){
                        touch[ele] = 0
                    }
                });
            },
            // 校验index
            checkIndex(index, dir){
                // 取余，以解决index超出情况
                index = index%LEN

                if(dir=='prev'){
                    index = index<0? LEN-1 : index
                }else{
                    index = index>LEN-1? 0 : index
                }
                return index
            },
            // 上一页
            next: function(){
                this.goTo(current+1,'next')
            },
            goTo: function(index, direction, callback){
                // 这里应该有区别的，比如要清楚 this.pause
                direction = direction || 'next'

                touch.swiping = 1 ;
                oldCurrent = current ;

                current = this.checkIndex( index , direction);

                // console.log(current, LEN,direction, this.checkIndex(3,direction))

                if(current== oldCurrent){
                    // 执行回调函数
                    touch.swiping = 0 ;
                    this.goToCallback()
                    return
                }

                this.addEventListener()


                direction=='next' ? this.setTranslateStore(current , store.NEXTSTATE ): this.setTranslateStore(current , store.PREVSTATE );

                // 移除所有的current
                this.handleTransition()

                // 强制重新渲染，避免新的transform和transition一起渲染，造成非预期效果
                $id.clientWidth ;
                // 添加current
                this.handleTransition( oldCurrent );
                this.handleTransition( current );
                $id.clientWidth ;


                // console.log($items[current].style)

                direction=='next' ? this.setTranslateStore(oldCurrent , store.PREVSTATE ) : this.setTranslateStore(oldCurrent , store.NEXTSTATE );



                this.setTranslateStore(current , store.CURRENTSTATE );

                this.currentChange();

                // 如果callback函数存在，加入到毁掉函数数组，会在transitionend的时候触发
                callback && this.gotToCallbackArr.push(callback)
            },
            // 下一页
            prev: function(){
                this.goTo(current-1,'prev')
            },
            // 数组
            goToCallbackArr:[],
            // 去某一页面的用户回调函数
            goToCallback: function(){
                if(this.goToCallbackArr[0]){
                    this.goToCallbackArr[0](current)
                    // 执行完毕后，清楚
                    this.goToCallbackArr.splice(0,1)
                }
            },
            // 自动滚动数组
            intervalArr: [],
            // 停止自动滚动
            pause: function(){
                this.intervalArr.forEach(clearInterval);
                this.intervalArr.length = 0 ;
            },
            // 开始自动滚动
            run: function(){
                !this.intervalArr.length && this.intervalArr.push( setInterval(this.next.bind(this), TIME) );
            },
            // 系统级别transitionend回调
            transitionend: function(){
                // 删除banner-item .current
                this.handleTransition();

                store.autoplay && this.run() ;

                $items[oldCurrent].removeEventListener(transitionend,fun)
                this.transitionendCallback()
                // 执行回调函数
                this.goToCallback()
                touch.swiping = 0 ;

            },
            // 用户自定义回调
            transitionendCallback: function(){
                arg.transitionend && arg.transitionend(current,oldCurrent,(current!==oldCurrent),touch,store)
            },
            addEventListener: function(){
                // 滑动结束的时候为current添加监听事件，结束后移除监听事件
                $items[current].addEventListener( transitionend, fun);
            },
            // c初始化
            init: function(){
                current = this.checkIndex( current );
                this.appendChild();
                this.initTranslateStore();

                if(LEN<=1) return


                // 滑动结束
                this.transitionendCallback()

                // 事件监听
                var self = this ;
                if(ISPHONE){
                    $id.firstElementChild.addEventListener('touchstart', this.touchStart.bind(this));
                    $id.firstElementChild.addEventListener('touchmove', this.touchMove.bind(this));
                    // 使用requestAnimationFrame提高性能
                    // 这个地方时有问题的，因为requestAnimationFrame后，event已被延迟，因此preventDafault stopPropagation都会失效
                    $id.firstElementChild.addEventListener('touchend', this.touchEnd.bind(this));
                    $id.firstElementChild.addEventListener('touchcancel', this.touchEnd.bind(this));

                }else{
                    $id.firstElementChild.addEventListener('mousedown', this.touchStart.bind(this));
                    $id.firstElementChild.addEventListener('mousemove', this.touchMove.bind(this));
                    $id.firstElementChild.addEventListener('mouseup', this.touchEnd.bind(this));
                    $id.firstElementChild.addEventListener('mouseleave', this.touchEnd.bind(this));
                }

                // 可见性变化
                document.addEventListener('visibilitychange',()=>{
                    if( !store.autoplay ) return
                    if( document.hidden ){
                        this.pause() ;
                    }else{
                        this.transitionend() ;
                    }
                });

                // 自动播放
                store.autoplay && this.run() ;
            }

        }
        var fun = util.transitionend.bind(util)
        util.init();

        return util
    }
    return fun ;
})();
