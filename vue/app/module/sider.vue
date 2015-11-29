<style lang="sass">
    .slider-transition{ transition: all 0.3s; }
    .slider-item-wrap{
        height: 100% ;
        &>div{
            position: absolute ;
            height: 100% ; width: 100% ; left: 0 ; top: 0;
            background-size: cover ; background-position: center ;
            background-color: pink;
            // transform: translate3d(100%,0,0);
        }
        &>div.slider-item-current{ transform: translate3d(0, 0, 0); }
        a{ display: block ; height: 100%; }
    }
    .slider-dian{
        position: absolute; bottom: 0 ; left: 50% ; line-height: 2 ;
        transform: translate3d(-50%,0,0);
        span{
            display: inline-block; height: 12px; width: 12px;
            border-radius: 50% ; background: #fff ;
        }
        span.slider-dian-current{
            background: red ;
        }
        span+span{ margin-left: 12px; }
    }
    .slider{
        text-align: center ;
        position: relative ;
        overflow: hidden ;
    }
</style>

<template>
    <div class="slider"
         :style="{height:height}"
         @touchstart="touchstart"
         @touchmove="touchmove"
         @touchend="touchend"
         ref="bit"
         >
        <div class="slider-item-wrap">
            <div class="slider-item slider-transition"
                 v-for="item in list"
                 :class="{'slider-item-current':$index==current?true:false, 'slider-transition':moveList[$index]}"
                 :style="{backgroundImage:'url('+item.image+')',transform:translateList[$index]}">
                 <a href="{{item.url}}"></a>
            </div>
        </div>
        <div class="slider-dian">
            <span v-for="item in list"
                  :class="{'slider-dian-current':$index==current?true:false}"></span>
        </div>
        div
    </div>
</template>

<script lang="babel">
    export default{
        props: ['height', 'current', 'list'],
        data(){
            console.log( this.list.length)
            return {
                translateList: this.list.map((ele,index)=>{
                        return index==this.current ?'translate3d(0%,0,0)':'translate3d(100%, 0, 0)'
                    }),
                moveList: this.list.map((ele,index)=>{
                    return false
                }),
                touch: {
                    leftS: 0,
                    topS: 0,
                    cha: 0,
                    moveX: false,
                    moveY: false,
                    width: document.body.clientWidth ,
                    prev: 0 ,
                    next: 0 ,
                    isCanSwipe: 1 ,
                    swiping: 0 ,
                    transitionendNum: 0 ,
                }
            }
        },
        ready(){
            // console.log( '组件构建完成',  document.querySelectorAll('.slider-item'));
            [].slice.call( document.querySelectorAll('.slider-item') ).forEach((ele)=>{
                ele.addEventListener('transitionend',()=>{
                    this.moveList = this.moveList.map(()=> false);
                    this.touch.transitionendNum++ ;

                    console.log( this.touch.transitionendNum );
                    if(this.touch.transitionendNum==2){
                        this.touch.isCanSwipe = 1
                    }
                })
            });
            window.addEventListener('resize',()=>{
                this.touch.width = document.body.clientWidth
            });
            document.addEventListener('visibilitychange',()=>{
                !document.hidden && (this.touch.isCanSwipe = 1) ;
            })
        },
        methods: {
            touchstart(event){
                console.log(this.touch.isCanSwipe, this.touch.swiping)
                var touch = this.touch ;
                if(!touch.isCanSwipe) return
                var touches = event.touches[0] ;
                touch.leftS = touches.pageX ;
                touch.topS = touches.pageY ;
                touch.prev = this.checkIndex(this.current-1,'prev')
                touch.next = this.checkIndex(this.current+1,'next')
                touch.swiping = 1
            },
            touchmove(event){
                var touch = this.touch ;
                if(!touch.isCanSwipe || !touch.swiping) return

                var touches = event.touches[0] ;
                var left = touches.pageX ;
                var top = touches.pageY ;

                if( touch.moveX || (!touch.moveY && Math.abs(top - touch.topS) - Math.abs( left - touch.leftS)<0)){
                    touch.cha = left - touch.leftS ;
                    event.preventDefault();
                    touch.moveX = 1 ;
                    this.translateList.splice(this.current,1,`translate3d(${touch.cha/touch.width*100}%,0,0)`) ;
                    if(touch.cha>0){
                        // 避免左右滑动过快，引发没有隐藏
                        this.moveList.length>2 && this.translateList.splice(touch.next,1,`translate3d(100%,0,0)`) ;
                        this.translateList.splice(touch.prev,1,`translate3d(${(touch.cha-touch.width)/touch.width*100}%,0,0)`);
                    }
                    if(touch.cha<0){
                        // 避免左右滑动过快，引发没有隐藏
                        this.moveList.length>2 && this.translateList.splice(touch.prev,1,`translate3d(-100%,0,0)`) ;
                        this.translateList.splice(touch.next,1,`translate3d(${(touch.cha+touch.width)/touch.width*100}%,0,0)`) ;
                    }
                }
                if( touch.moveY || (!touch.moveX && Math.abs(top - touch.topS) - Math.abs( left - touch.leftS)>0)){
                    touch.moveY = 1 ;
                }
            },
            touchend(){
                console.log(this.touch.isCanSwipe, this.touch.swiping)
                var touch = this.touch ;
                if(!touch.isCanSwipe || !touch.swiping ) {
                    // touch.cha == 0 && this.resetTouch(touch)
                    // console.log('wtf')
                    return
                }
                if( touch.cha!=0){
                    touch.isCanSwipe = 0 , touch.swiping = 0;
                }
                if( touch.cha>0 ){
                    this.moveList.splice(this.current,1,true);
                    this.moveList.splice(touch.prev,1,true);
                    if( touch.cha>100 ){
                        this.translateList.splice(this.current,1,`translate3d(100%,0,0)`)  ;
                        this.translateList.splice(touch.prev,1,`translate3d(0%,0,0)`)  ;
                        this.current = touch.prev ;
                    }else{
                        this.translateList.splice(this.current,1,`translate3d(0%,0,0)`)  ;
                        this.translateList.splice(touch.prev,1,`translate3d(-100%,0,0)`)  ;
                    }
                }else if( touch.cha<0 ){
                    this.moveList.splice(this.current,1,true);
                    this.moveList.splice(touch.next,1,true);
                    if( touch.cha<-100 ){
                        this.translateList.splice(this.current,1,`translate3d(-100%,0,0)`)  ;
                        this.translateList.splice(touch.next,1,`translate3d(0%,0,0)`)  ;
                        this.current = touch.next ;
                    }else{
                        this.translateList.splice(this.current,1,`translate3d(0%,0,0)`)  ;
                        this.translateList.splice(touch.next,1,`translate3d(100%,0,0)`)  ;
                    }
                }
                this.resetTouch(touch)
            },
            resetTouch(touch){
                Object.keys(touch).forEach((ele)=>{
                    if( ele!='width' && ele!='isCanSwipe')
                        touch[ele] = 0 ;
                });
            },
            checkIndex(index, dir){
                if(dir=='prev'){
                    index = index<0? this.translateList.length-1 : index
                }else{
                    index = index>this.translateList.length-1? 0 : index
                }
                return index
            }
        }
    }
</script>
