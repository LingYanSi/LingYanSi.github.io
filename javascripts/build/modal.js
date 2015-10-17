/*
* @Author: zikong
* @Date:   2015-09-29 17:04:38
* @Last Modified by:   zikong
* @Last Modified time: 2015-10-17 20:43:56
*/

'use strict';

// modal的层级 z-index 设置为 1000 ;
var LY = LY || {} ;
LY.modal = (function(){
    var $modal , $bgd, $main ,$close , $content;
    // 样式
    var styleStr = `
        #modal{
            height:100%; width:100%;
            position:fixed; top:0; left:0; z-index:1000; display:none;
        }
        .modal-bgd{
            position:fixed;top:0;left:0;height:100%;width:100%;background:rgba(0,0,0,0.2);
        }
        .modal-main{
            position:absolute; top:40%; left:50%;
            -webkit-transform: translate(-50%,-50%) scale(0.1,0.1);
            -ms-transform: translate(-50%,-50%) scale(0.1,0.1);
            -moz-transform: translate(-50%,-50%) scale(0.1,0.1);
            transform: translate(-50%,-50%) scale(0.1,0.1);
            transition: all 0.1s linear ;
            transform-origin: center;
            padding:20px 10px;
            background-color:#fff; background-clip: padding-box;
            width:600px; max-height:60%;
            box-shadow:0 0 8px rgb(0,100,200);
            /*border: 4px solid rgba(0,0,0,0.2);*/
            text-align:center;
            overflow: hidden;
        }
        .modal-main-show{
            -webkit-transform: translate(-50%,-50%) scale(1,1);
            -ms-transform: translate(-50%,-50%) scale(1,1);
            -moz-transform: translate(-50%,-50%) scale(1,1);
            transform: translate(-50%,-50%) scale(1,1);
        }
        #modal-close{
            position:absolute;
            top:0; right: 0;
            line-height:2em;
            width:2em;
            text-decoration:none;
            color: inherit;
        }
        #modal-close:hover{
            background: rgba(247,105,104,0.3);
            border-bottom-left-radius: 100%;
        }
        #modal-butt{
            padding-top:1em;
        }
        #modal-continue,#modal-cancel{
            border:none; outline:none;
            background: rgb(247,105,105);
            color:#fff; line-height:1.8em; width: 6em;
            display:inline-block;
        }
        #modal-cancel+#modal-continue{
            margin-left:2em;
        }
    `;

    var modal = {
        init: function(){
            // 添加样式
            var style = document.createElement('style');
            style.innerHTML = styleStr ;
            style.id = 'modalStyle';
            document.head.appendChild(style);

            // 添加dom结构
            var dfg = document.createDocumentFragment();
            var container = document.createElement('div');
            container.style.cssText = '';
            container.id = 'modal'

            container.innerHTML = '<div class="modal-bgd" style=""></div>' +
            '<div class="modal-main" style="">' +
                '<a href="javascript:;" id="modal-close" class="modal-close" title="关闭">x</a>' +
                '<div class="modal-content">'+
                '</div>' +
            '</div>';
            dfg.appendChild(container);
            document.body.appendChild(dfg.querySelector('#modal'));

            $modal = document.querySelector('#modal')  ;
            $bgd = document.querySelector('.modal-bgd')  ;
            $main = document.querySelector('.modal-main') ;
            $content = document.querySelector('.modal-content') ;

            $close = document.querySelector('.modal-main>a');

            $main.addEventListener('click',function(){
                var idName = event.target.id ;
                if( event.target.classList.contains('modal-close')){
                    modal.close();
                }else if( idName == 'modal-continue' ){
                    modal.close();
                    modal.alertCb && modal.alertCb();
                }else if( idName == 'modal-cancel' ){
                    modal.close();
                    modal.cancelCb && modal.cancelCb();
                }
            })
        },
        alertCb: null ,
        cancelCb: null ,
        alert: function(msg,callback){
            // this.hideCloseBtn();
            var str = '<p>'+msg+'</p><div id="modal-butt"><button id="modal-continue">确认</button></div>' ;
            $content.innerHTML = str ;
            this.open();
            this.alertCb = callback ;
        },
        confirm: function( msg, continueCb, cancelCb ){
            this.hideCloseBtn() ;
            var str = '<p>'+msg+'</p><div id="modal-butt"><button id="modal-cancel">取消</button><button id="modal-continue">确认</button></div>' ;
            $content.innerHTML = str ;
            this.open();
            this.alertCb = continueCb ;
            this.cancelCb= cancelCb ;
        },
        tips: function(msg, time){
            $content.innerHTML = msg || '' ;
            time = time || 1000 ;
            this.hideCloseBtn();
            this.open();
            setTimeout(this.close, time);
        },
        diy: function(html){
            $content.innerHTML = html ;
            console.log(111111111)
            this.open();
        },
        open: function(){
            $modal.style.display = 'block' ;
            $modal.offsetWidth ;
            $main.classList.add('modal-main-show');
        },
        hideCloseBtn: function(){
            $close.style.display = 'none' ;
        },
        close: function(){
            $main.classList.remove('modal-main-show');
            $modal.style.display = 'none' ;
            $close.style.display = 'block' ;
        }
    }
    modal.init();
    return modal ;
})();



