/*
* @Author: zikong
* @Date:   2015-09-27 01:52:53
* @Last Modified by:   zikong
* @Last Modified time: 2015-11-01 18:34:58
*/

'use strict';

/*
* 过渡效果，有三种状态
* 1.当前状态 2.上一页 3.下一页 4.其他状态为 display:none
*/
var Slider = (function($){
    var Slider = function(arg){
        var id = arg.id ;
        // 存储用到的选择器
        var selector = {
            id: '#'+id ,
            itemsWrap: '#'+id+'-items' ,
            items: '#'+id+'-items>div' ,
            prev: '#'+id+'-prev' ,
            next: '#'+id+'-next' ,
            nav: '#'+id+'-nav' ,
            navItems: '#'+id+'-nav>div' ,
        }
        var $id = $(selector.id);
        var $itemsWrap = $id.find(selector.itemsWrap);
        var $items = $id.find(selector.items);


        // 开关，是否显示左右按钮/导航
        $id.append('<div id="'+selector.prev.slice(1)+'" title="上一页">上</div>'+
                    '<div id="'+selector.next.slice(1)+'" title="下一页">下</div>'+
                    '<div id="'+selector.nav.slice(1)+'">导航</div>');

        // 导航圆点
        if(arg.isNavShow){
            var $nav = $id.find(selector.nav);
            var str = '';
                for(var i=0,len=$items.length; i<len ; i++){
                    str += '<div style="display:inline-block;height:10px;width:10px;border-radius:100%;background:yellow;margin:10px;"></div>';
                }
                $nav.html(str);
            var $navItems = $nav.children();
        }

        var num = arg.num || 1 ;
            num = num > $items.length-1 ? $items.length-1 : num ;

var AS = {
    '0':{
        prevStyle:{
            left: '-100%' ,
        },
        prevStyleEnd: {
            left: '-100%' ,
        },
        currentStyle:{
            left: '0%' ,
        },
        nextStyle:{
            left: '100%' ,
        },
        nextStyleEnd: {
            left: '100%' ,
        }
    },
    '1': {
        prevStyle:{
            opacity: 0 ,
        },
        prevStyleEnd: {
            opacity: 0 ,
        },
        currentStyle:{
            opacity: 1 ,
        },
        nextStyle:{
            opacity: 0 ,
        },
        nextStyleEnd: {
            opacity: 0 ,
        }
    },
    '2': {
        prevStyle:{
            top: '-50%' ,
            opacity: 0 ,
            zIndex: 2 ,
        },
        prevStyleEnd: {
            top: '-50%' ,
            opacity: 1 ,
            zIndex: 2 ,
        },
        currentStyle:{
            top: 0 ,
            opacity: 1 ,
            zIndex: 1 ,
        },
        nextStyle:{
            top: '50%' ,
            opacity: 0 ,
            zIndex: 2 ,
        },
        nextStyleEnd: {
            top: '50%' ,
            opacity: 1 ,
            zIndex: 2 ,
        }
    },
    '3': {
        prevStyle:{
            left: '-50%' ,
            opacity: 0 ,
            zIndex: 2 ,
        },
        prevStyleEnd: {
            left: '-50%' ,
            opacity: 1 ,
            zIndex: 2 ,
        },
        currentStyle:{
            left: 0 ,
            opacity: 1 ,
            zIndex: 1 ,
        },
        nextStyle:{
            left: '50%' ,
            opacity: 0 ,
            zIndex: 2 ,
        },
        nextStyleEnd: {
            left: '50%' ,
            opacity: 1 ,
            zIndex: 2 ,
        }
    }
}
        var tools = {
            autoPlay: arg.autoPlay  , // 自动播放
            loop: arg.loop , // 循环
            intervals: [], // 存储循环执行任务
            time: arg.time || 4000 , // 每隔多长时间执行一次
            moveTime: arg.moveTime || 400 , // 动画时间
            lastTime: new Date().getTime(), // 上次执行动画的时间戳，用来校验是否可以点击下一页
            animateType: 'swing', // 动画过度效果
            len: $items.length-1 , // 有多少张图片
            num: num , // 一页显示多少张图
            eachWidth: $itemsWrap.width()/num , // 每张图片的宽度
            currentPage: arg.currentPage-1 || 1 , // 当前页码

            animationStyle: AS[arg.animationStyle] || AS['0'],
            // 返回一个可用页码 isRe表示是否把可用页码赋值给currentPage
            setPage: function(page,isRe){
                var newPage = page> tools.len ? page-tools.len-1 : page ;
                newPage = newPage<0? tools.len+1+newPage : newPage ;
                    // isRe表示是否把可用页码赋值给currentPage
                if(isRe){
                    // 触发 onPageChange 事件
                    arg.onPageChange && arg.onPageChange(tools.currentPage,newPage,tools.len);
                    tools.currentPage = newPage;

                    // 导航原点颜色变化
                    if(!arg.isNavShow) return ;
                    $navItems.eq(newPage).css({
                        background: 'rgb(247,105,105)'
                    }).siblings().css({
                        background: 'yellow'
                    });
                }
                return newPage
            },
            isCanChange: function(){
                // console.log( new Date().getTime()-tools.lastTime<=tools.moveTime )
                if(new Date().getTime()-tools.lastTime<=tools.moveTime) return false
                tools.lastTime = new Date().getTime();
                return true ;
            },
            // 下一页
            next: function(){

                if(tools.num===1){
                    tools.toWhere((tools.currentPage+1),'next');
                    return
                }

                // 一次展现多张图的处理
                if(!tools.isCanChange()) return
                var cp = tools.currentPage ;
                if(!tools.loop && cp===tools.len-tools.num+1) return ;

                $items.eq( tools.setPage(cp+num) ).css({left:'100%'});
                for(var i=0;i<tools.num+1;i++){
                    $items.eq( tools.setPage(cp+i) ).stop().animate({
                        left: tools.eachWidth*(i-1)+'px'
                    },tools.moveTime,tools.animateType);
                }

                tools.setPage(++tools.currentPage,true );
            },
            // 上一页
            prev: function(){

                if(tools.num===1){
                    tools.toWhere((tools.currentPage-1),'prev');
                    return
                }

                // 一次展现多张图的处理
                if(!tools.isCanChange()) return
                var cp = tools.currentPage ;
                if(!tools.loop && cp===0) return ;

                $items.eq( tools.setPage(cp-1) ).css({left:-tools.eachWidth+'px'});

                for(var i=-1;i<tools.num;i++){
                    $items.eq( tools.setPage(cp+i) ).stop().animate({
                        left: tools.eachWidth*(i+1)+'px'
                    },tools.moveTime,tools.animateType);
                }

                tools.setPage(--tools.currentPage,true );
            },
            // 跳转到某页面，dir表示方向【next,prev】
            toWhere: function(page,dir){
                // 只允许单页单张图
                if(tools.num != 1) return ;

                // 如果目标页码与currentPage相同，return
                page = tools.setPage(page);
                if(page === tools.currentPage) return ;

                // 判断是不是可以循环
                if(!tools.loop && ( (dir=='next' && page==0) || (dir=='prev' && page==tools.len) ) )
                    return

                // 校验时间
                if(!tools.isCanChange()) return

                // 下一页，还是上一页
                if(dir=="prev"){
                    // show
                    $items.eq( page ).css( tools.animationStyle.prevStyle ).show().animate( tools.animationStyle.currentStyle ,tools.moveTime,tools.animateType);
                    // hide
                    $items.eq( tools.currentPage ).animate( tools.animationStyle.nextStyleEnd ,tools.moveTime,tools.animateType,function(){
                            $(this).hide()
                    });
                }else{
                    // show
                    $items.eq( page ).css( tools.animationStyle.nextStyle ).show().animate(tools.animationStyle.currentStyle,tools.moveTime,tools.animateType);
                    // hide
                    $items.eq( tools.currentPage ).animate(tools.animationStyle.prevStyleEnd,tools.moveTime,tools.animateType,function(){
                            $(this).hide()
                    });
                }
                tools.setPage(page,true);
            },
            // 自动播放
            setInterval: function(){
                if(!tools.autoPlay) return
                this.intervals.push(window.setInterval(tools.next,tools.time) );
            },
            // 停止自动播放
            clearInterval: function(){
                if(!tools.autoPlay) return
                tools.intervals.map(window.clearInterval);
                tools.intervals.length = 0 ;
            },
            // items style初始化
            initStyle: function(){
                // 左右开关的样式可自定义
                $id.css({
                        position: 'relative'
                    }).find(selector.itemsWrap).css({
                        position: 'relative',
                        zIndex: 0 ,
                        height: $id.height()+'px',
                        overflow:'hidden'
                    }).next().css({
                        position: 'absolute' ,
                        height: '40px' ,
                        width: '40px' ,
                        top: '50%',
                        left: '0px',
                        marginTop: '-20px',
                        backgroundColor: 'rgba(0,0,0,0.2)' ,
                        color: '#fff',
                        display: arg.isPrevNextShow?'block':'none' ,
                        cursor: 'pointer',
                        lineHeight:'40px',
                        textAlign: 'center',
                    }).next().css({
                        position: 'absolute' ,
                        height: '40px' ,
                        width: '40px' ,
                        top: '50%',
                        right: '0px',
                        marginTop: '-20px',
                        backgroundColor: 'rgba(0,0,0,0.2)' ,
                        color: '#fff',
                        display: arg.isPrevNextShow?'block':'none' ,
                        cursor: 'pointer',
                        lineHeight:'40px',
                        textAlign: 'center',
                    }).next().css({
                        position: 'absolute',
                        bottom: '0px',
                        width: '100%',
                        left: '0px',
                        textAlign: 'center',
                        display: arg.isNavShow?'block':'none' ,
                    });
                tools.resetInitStyle();
            },
            resetInitStyle: function(){
                if(tools.num===1){
                    $items.css({
                        position: 'absolute',
                        left: '0',
                        top: '0',
                        height: '100%',
                        width: '100%'
                    }).hide().eq(tools.currentPage).show();
                }else{
                    $items.each(function(){
                        var eq = $(this).index() ;
                        $(this).css({
                            position: 'absolute',
                            left: '100%',
                            top: '0',
                            height: '100%',
                            width: tools.eachWidth+'px'
                        });
                    });
                    for(var i=0;i<tools.num;i++){
                        $items.eq( tools.setPage(tools.currentPage+i)).css({
                            left: i*tools.eachWidth+'px'
                        });
                    }
                    $items.eq(tools.currentPage).css({left:'0px'});
                }
            },
            // 事件管理
            initEvent: function(){
                // 点击事件
                $id.on('selectstart',selector.prev,function(){
                    return false ;
                }).on('selectstart',selector.next,function(){
                    console.log('开始选择')
                    return false ;
                }).on('click',selector.prev,function(){
                    // 上一页
                    tools.clearInterval();
                    tools.prev();
                    tools.setInterval();
                }).on('click',selector.next,function(){
                    // 下一页
                    tools.clearInterval();
                    tools.next();
                    tools.setInterval();
                }).on('click',selector.navItems,function(){
                    // 导航栏点击
                    var index = $(this).index();
                    tools.clearInterval();
                    if(index>tools.currentPage)
                        tools.toWhere(index,'next');
                    else tools.toWhere(index,'prev');
                    tools.setInterval();
                });

                // 可见性，如果当前页面不可见，就停止自动播放
                document.addEventListener('visibilitychange',function(){
                    if(document.hidden){
                        tools.clearInterval();
                    }
                    else{
                        tools.setInterval();
                    }
                });
            },
            // 初始化
            init: function(){
                // 校验页码
                tools.setPage(tools.currentPage,true);

                tools.initStyle();

                tools.initEvent();

                if(this.autoPlay){
                    this.setInterval();
                }
            }
        }
        tools.init();
        // 把tools返回出去，可通过实例自定义修改
        this.tools = tools ;
    }
    return Slider ;
})(jQuery);


var S = new Slider({
    id:'sb',
    autoPlay: false ,
    loop: true ,
    num: 1 ,
    isNavShow: true ,
    isPrevNextShow: true ,
    currentPage: 2 ,
    animationStyle: 0 ,
    onPageChange: function(prevIndex,currentIndex,len){
        // console.log(prevIndex,currentIndex,len);
    }.bind(this),
});
