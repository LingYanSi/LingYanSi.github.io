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
        var dataArr = eval( $id.getAttribute('data-arr') );
        // console.log( dataArr )
        if( !dataArr || !Array.isArray(dataArr) || !dataArr.length ){
            console.warn('数据为空');
            return ;
        }
        var translateStore = [] ,
            transitionStore = [] ,
            LEN = dataArr.length ,
            $items = [] ,
            $dotts = [] ,
            current= arg.current || 0 ;

        var store = {
            autoplay: arg.autoplay || false ,
            PREVSTATE: 'translate3d(-100%,0,0)',
            CURRENTSTATE: 'translate3d(0,0,0)',
            NEXTSTATE: 'translate3d(100%,0,0)',
        }

        var touch = {
            leftS: 0,
            topS: 0,
            cha: 0,
            moveX: false,
            moveY: false,
            width: $id.clientWidth ,
            prev: 0 ,
            next: 0 ,
            isCanSwipe: 1 ,
            swiping: 0 ,
            transitionendNum: 0 ,
        };

        window.addEventListener('resize',()=>{ touch.width = $id.clientWidth });

        var util = {
            // 添加子元素
            appendChild: function(){
                $id.innerHTML = ` <div class="banner-items">
                                 ${dataArr.map((ele)=>{
                                   return `<a href="${ele.link}" style="background-image:url(${ele.img})" class="banner-item"></a>`
                                }).join(' ') }
                            </div>
                            <div class="banner-dotts" style="display:${LEN==1?"none":"block"}">
                                ${dataArr.map((ele)=>{
                                   return `<span class="banner-dott"></span>`
                                }).join(' ') }
                            </div> ` ;
                $items = [].slice.call( $id.firstElementChild.children) ;
                $dotts = [].slice.call( $id.lastElementChild.children) ;
            },
            // 设置
            setState: function(){
                translateStore.forEach((ele,index)=>{
                    $items[index].style.cssText += ele ;
                });
                this.currentChange();
            },
            currentChange: function(){
                translateStore.forEach((ele,index)=>{
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
                    transitionStore.push(0);
                    if( index==current ){
                        translateStore.push( this.autoprefix('translate3d(0,0,0)') );
                    }else{
                        translateStore.push( this.autoprefix('translate3d(-100%,0,0)') );
                    }
                });
                this.setState();
            },
            // 添加css前缀
            autoprefix: function( translate ){
                return `;transform:${translate};-moz-transform:${translate};-webkit-transform:${translate}` ;
            },
            handleTransition: function( index, index2){
                if(index!==undefined){
                    $items[index].classList.add('current');
                    transitionStore[index] = 1 ;
                }else{
                    // transitionend 滑动结束
                    transitionStore.forEach((ele, index, arr)=>{
                        // console.log( '状态current', ele )
                        ele && $items[index].classList.remove('current') ;
                        arr[index] = 0 ;
                        if( index != current && index!= this.checkIndex(current-1,'prev') && index!= this.checkIndex(current+1,'next') )
                            $items[index].style.visibility = "hidden"
                        else
                            $items[index].style.visibility = "visible"
                    });
                }
            },
            removeTransition: function(){
                transitionStore.forEach((ele, index)=>{
                    $items[index].classList.remove('current');
                })
            },
            // 开始触摸
            touchStart: function(){

                if(!touch.isCanSwipe) return
                store.autoplay && this.clearInterval() ;
                var touches = event.touches[0] ;
                touch.leftS = touches.pageX ;
                touch.topS = touches.pageY ;

                // 避免系统级返回触发滑动事件
                if(touch.leftS/touch.width<0.05 || touch.leftS/touch.width>0.95){
                    return
                }
                touch.prev = this.checkIndex( current-1,'prev')
                touch.next = this.checkIndex( current+1,'next')
                touch.swiping = 1

            },
            // 滑动中
            touchMove: function(){
                // console.log(current, touch.prev , touch.next)
                if(!touch.isCanSwipe || !touch.swiping) return

                var touches = event.touches[0] ;
                var left = touches.pageX ;
                var top = touches.pageY ;

                if( touch.moveX || (!touch.moveY && Math.abs(top - touch.topS) - Math.abs( left - touch.leftS)<0)){
                    touch.cha = left - touch.leftS ;
                    event.preventDefault();
                    touch.moveX = 1 ;
                    this.setTranslateStore( current,`translate3d(${touch.cha/touch.width*100}%,0,0)`) ;
                    if(touch.cha>0){
                        // 避免左右滑动过快，引发没有隐藏
                        dataArr.length>2 && this.setTranslateStore(touch.next, `translate3d(100%,0,0)`) ;
                        this.setTranslateStore(touch.prev,`translate3d(${(touch.cha-touch.width)/touch.width*100}%,0,0)`);
                    }
                    if(touch.cha<0){
                        // 避免左右滑动过快，引发没有隐藏
                        dataArr.length>2 && this.setTranslateStore(touch.prev, `translate3d(-100%,0,0)`) ;
                        this.setTranslateStore(touch.next, `translate3d(${(touch.cha+touch.width)/touch.width*100}%,0,0)`) ;
                    }
                }
                if( touch.moveY || (!touch.moveX && Math.abs(top - touch.topS) - Math.abs( left - touch.leftS)>0)){
                    touch.moveY = 1 ;
                }
            },
            // 滑动结束
            touchEnd: function(){
                // console.log( touch.isCanSwipe, touch.swiping)
                if(!touch.isCanSwipe || !touch.swiping ) return

                var oldCurrent = current ;
                if( touch.cha>0 ){
                    this.handleTransition( current );
                    this.handleTransition( touch.prev );
                    if( touch.cha/touch.width>0.2 ){
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
                    if( touch.cha/touch.width<-0.2 ){
                        this.setTranslateStore( current, store.PREVSTATE )  ;
                        this.setTranslateStore( touch.next, store.CURRENTSTATE )  ;
                        current = touch.next ;
                    }else{
                        this.setTranslateStore( current, store.CURRENTSTATE )  ;
                        this.setTranslateStore( touch.next, store.NEXTSTATE)  ;
                    }
                }
                if( touch.cha!=0){
                    touch.isCanSwipe = 0 , touch.swiping = 0;
                    oldCurrent!=current && this.currentChange();
                }else{
                    store.autoplay && this.setInterval() ;
                }
                this.resetTouch(touch);

            },
            // 重置touch数据
            resetTouch(touch){
                Object.keys(touch).forEach((ele)=>{
                    if( ele!='width' && ele!='isCanSwipe')
                        touch[ele] = 0 ;
                });
            },
            // 校验index
            checkIndex(index, dir){
                if(dir=='prev'){
                    index = index<0? LEN-1 : index
                }else{
                    index = index>LEN-1? 0 : index
                }
                return index
            },
            // 上一页
            next: function(){
                // 关闭手势滑动
                touch.isCanSwipe = 0 ;
                var oldCurrent = current ;
                current = this.checkIndex( current+1 , 'next');
                this.setTranslateStore(current , store.NEXTSTATE );

                $id.clientWidth ;

                this.handleTransition( oldCurrent );
                this.handleTransition( current );
                // return

                this.setTranslateStore(oldCurrent , store.PREVSTATE );
                this.setTranslateStore(current , store.CURRENTSTATE );

                this.currentChange();
            },
            // 下一页
            prev: function(){
                // 关闭手势滑动
                touch.isCanSwipe = 0 ;
                var oldCurrent = current ;
                current = this.checkIndex( current-1 , 'prev');
                this.setTranslateStore(current , store.PREVSTATE );

                $id.clientWidth ;

                this.handleTransition( oldCurrent );
                this.handleTransition( current );
                // return

                this.setTranslateStore(oldCurrent , store.NEXTSTATE );
                this.setTranslateStore(current , store.CURRENTSTATE );

                this.currentChange();
            },
            intervalArr: [],
            clearInterval: function(){
                this.intervalArr.forEach(clearInterval);
                this.intervalArr.length = 0 ;
            },
            setInterval: function(){
                !this.intervalArr.length && this.intervalArr.push( setInterval(this.next.bind(this), 6000) );
            },
            transitionend: function(){
                // 删除banner-item .current
                this.handleTransition();
                touch.transitionendNum = 0 ;
                touch.isCanSwipe = 1 ;
                store.autoplay && this.setInterval() ;

            },
            // c初始化
            init: function(){
                current = this.checkIndex( current );
                this.appendChild();
                this.initTranslateStore();
                if(LEN<=1) return

                store.autoplay && this.setInterval() ;

                var transitionend = window.navigator.userAgent.toLowerCase().match('android')?'webkitTransitionEnd':'transitionend' ;
                $items.forEach((ele)=>{
                    ele.addEventListener( transitionend, ()=>{
                        touch.transitionendNum++ ;
                        if(touch.transitionendNum==2 )
                            this.transitionend();
                    });
                });
                $id.addEventListener('touchstart', this.touchStart.bind(this));
                $id.addEventListener('touchmove', this.touchMove.bind(this));
                $id.addEventListener('touchend', this.touchEnd.bind(this));

                document.addEventListener('visibilitychange',()=>{
                    if( !store.autoplay ) return
                    if( document.hidden ){
                        this.clearInterval() ;
                    }else{
                        this.transitionend() ;
                    }
                });

               /* window.onbeforeunload = function(){
                    // this.removeTransition();
                    return 222 ;
                }.bind(this)*/
            }

        }
        util.init();

    }
    return fun ;
})();
