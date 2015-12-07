/*
* @Author: zikong
* @Date:   2015-09-28 15:52:40
* @Last Modified by:   zikong
* @Last Modified time: 2015-12-04 09:46:25
*/

'use strict';

// 弹性布局解决方案，一般的单位使用rem，字体大小使用px
(function(){
    function flexable(){
        // 修改html的font-size，以达到修改rem相对单位的目的
        var doc = window.document ;
        var width = window.innerWidth ;
        // console.log('设备像素比:',window.devicePixelRatio,window);
        var DPR = window.devicePixelRatio >=2 ? 1 : 1 ;
        // 动态添加viewPort
        var meta = doc.createElement('meta');
        meta.name = "viewport" ;
        meta.content = 'width=device-width, initial-scale='+(1/DPR)+', maximum-scale='+(1/DPR)+', user-scalable=no' ;
        doc.head.appendChild(meta);

        doc.querySelector('html').style.fontSize = width/10 + 'px' ;

        if( doc.readyState=='complete' ){
            doc.body.style.fontSize = 12*DPR+ 'px' ;
        }else{
            doc.addEventListener('DOMContentLoaded',function(){
                doc.body.style.fontSize = 12*DPR+ 'px' ;
            });
        }

        console.log('页面reset了')
    }
    flexable();
    window.addEventListener('resize',flexable);

    // 打印页面dom渲染、页面完全加载所用的时长
    var timeStart = new Date().getTime();
    document.addEventListener('readystatechange',function(){
        // 当document文档正在加载时,返回"loading",
        // 当文档结束渲染但在加载内嵌资源时,返回"interactive",
        // 文档加载完成 DOMContentLoaded dom加载完成 并完全解析
        // 当文档加载完成时,返回"complete".
        console.log(this.readyState,new Date()-timeStart);
    });

})();
