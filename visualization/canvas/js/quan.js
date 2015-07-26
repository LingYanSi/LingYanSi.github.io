    function quan(info,option){
         var canvas = document.getElementById('canvas') ;
        if(canvas.getContext) var ctx = canvas.getContext('2d') ;
        var ratio = getPixelRatio( ctx ) ;
        var bl = document.getElementById('wrap').offsetWidth/500 ;
        var bili = bl*ratio ;
        canvas.style.width = 500*bl +'px' ;
        canvas.style.height = 300*bl +'px' ;
        canvas.width = 500*bili ;
        canvas.height = 300*bili ;

        var r = Math.round( 100*bili ) ;
        var d = Math.round( 12*bili ) ;

        var center = { left: Math.round( canvas.width/2*4/5 ) , top:Math.round( canvas.height/2 ) }

        var changeItem = 1 ; // 主要是为动画准备
        // window.requestAnimationFrame(change);
        scale(); // 缩放文本
        setScore(info); // 插入数据
        setPos(info); // 设置位置
        if(option) animation();
        else bing(info);
        click();

        // 动画
        function animation(){ 
            changeItem = 0 ; // 通过角度渐变实现
           function change(){
                bing(info);
                changeItem += 0.05  ;
                if(changeItem >= 1.05) {
                    changeItem = changeItem.toFixed(0) ;
                    clearInterval(interval)
                }
            }
            var interval = setInterval(function(){
                change()
            },20)
        }

        /*
        ------- 点击事件 ----------
         canvas的点击事件的处理，主要是通过判断点击时鼠标的相对坐标，是否在一个闭合曲线的内部
        来判断，一个图形是否被点击了
        ctx.isPointInPath(x,y) 如果在返回true，不在则返回false
        */
        function click(){
            var phone = !!navigator.userAgent.toLowerCase().match(/android|pad|phone|ipod/g) ; // 判断是不是手机
            var mouseup = phone?'touchstart':'mousedown' ; // 根据phone来选择一个事件
            document.querySelector('#canvas').addEventListener( mouseup , function(event){
                if(event.button){
                    if(event.button!==1) return
                }
                var mouseX = ( event.targetTouches ? event.targetTouches[0].clientX : event.clientX ) - this.getBoundingClientRect().left ;
                var mouseY = ( event.targetTouches ? event.targetTouches[0].clientY : event.clientY )- this.getBoundingClientRect().top ;
                var events = { mouseX:mouseX*ratio , mouseY:mouseY*ratio }
                bing(info,events)
            });
        }

        function bing(info,events){ // 画饼
            ctx.clearRect(0,0,canvas.width,canvas.height);
            var angBegin= 0 , angEnd = 0 ;
            var PI = Math.PI*2 ;
            for(var i=0,len=info.length;i<len;i++){

                angEnd = -PI*( info[i].ang )*changeItem;

                ctx.save();
                if(i>=0) {
                    // ctx.translate(Math.cos((angBegin + angEnd)/2)*10,Math.sin((angBegin + angEnd)/2)*10)
                    // console.log(Math.cos((angBegin + angEnd)/2)*100)
                }
                ctx.beginPath(); // 画一个圆环
                // ctx.moveTo(center.left+(r)*Math.cos(angBegin),center.top+(r)*Math.sin(angBegin)) ;
                ctx.arc(center.left,center.top,r-d*i,angBegin,angEnd,true);
                // ctx.lineTo(center.left+(r-10)*Math.cos(angEnd),center.top+(r-10)*Math.sin(angEnd)) ;
                // ctx.lineTo(center.left,center.top);
                ctx.arc(center.left,center.top,r-d*(i+1),angEnd,angBegin,false);
                ctx.closePath();
                ctx.fillStyle = info[i].color ;
                if(!!events){
                    if(ctx.isPointInPath(events.mouseX,events.mouseY)){
                        ctx.fillStyle = 'red' ;
                    }
                }
                ctx.fill();
                ctx.restore();

                ctx.save();
                ctx.translate(center.left,center.top);
                ctx.rotate((angBegin + angEnd)/2); // 如果想在另一个位置旋转，应该先位移【这也是废话】
                ctx.beginPath();
                ctx.font =20*bili + "px serif";
                ctx.fillStyle = info[i].color ;
                ctx.textBaseline = 'middle' ; // 设置基线，就此出来说Middle的作用是让其居中
                ctx.fillText("Hello world", r , 0); // 对文字的设置要放在文字前面【这不是废话吗】
                ctx.fill();
                ctx.restore();
            }
        }

        function scale(){ // 缩放，主要是缩放一些文字信息
            var $pc = document.getElementById('pie-content-score') ;
            $pc.style.webkitTransformOrigin = "left top" ;
            $pc.style.webkitTransform = 'scale3d('+bl+','+bl+',1)';

            var $pc = document.getElementById('pie-color') ;
            $pc.style.webkitTransformOrigin = "right bottom" ;
            $pc.style.webkitTransform = 'scale3d('+bl+','+bl+',1)';
        }

        function setScore(info){ // 设置分数
            var score = document.querySelector('#pie-content-score');
            var color = document.querySelector('#pie-color');  
            var colorItem = []; 
            var scoreItem = [] ;
            for(var i=0 ,len=info.length ; i<len ;i++)
            {
                scoreItem.push('<div class="pcs-item" style="color:'+info[i].color+'"><span>'+info[i].ang*100+'</span>%的宝宝</div>');
                colorItem.push('<div class="pc-item"><div class="pc-item-color" style="background-color:'+info[i].color+'"></div><span>'+info[i].title+'</span></div>');
            }
            score.innerHTML = scoreItem.join('');
            color.innerHTML = colorItem.join('');
        }

        function setPos(info){   // 设置位置
            var scoreItem = [].slice.call(document.querySelectorAll('#pie-content-score .pcs-item'));
            var angBegin= 0 , angEnd = 0 ;
            var PI = Math.PI*2 ;
            var x,y ;
            var angel ,pos ;

            console.log(scoreItem)
            for(var i=0,len=scoreItem.length ; i<len ; i++ ){
                angBegin = angEnd ;
                angEnd = -Math.PI/3*(i+1);
                angel = ( angBegin + angEnd )/2
                y = -Math.sin( angel )*100 + 150 ;
                x = Math.cos( angel )*100 + 200 ;
                pos = judge(angel) ;
                scoreItem[i].style[pos.x] = x+'px' ;
                if(pos.x==='right') scoreItem[i].style[pos.x] = 500-x +'px' ;
                scoreItem[i].style[pos.y] = y+'px'  ;
                if(pos.y==='top') scoreItem[i].style[pos.y] = 300-y +'px' ;
            }
        }

        function judge(angel){ // 根据角度判断象限
            var pos = {};
            if(angel>=-Math.PI/2 && angel<0){
                pos.x = 'left' ;
                pos.y = 'bottom' ;
            }else if(angel>=-Math.PI && angel<-Math.PI/2 ){
                pos.x = 'right' ;
                pos.y = 'bottom' ;
            }else if(angel>=-Math.PI/2*3 && angel<-Math.PI ){
                pos.x = 'right' ;
                pos.y = 'top' ;
            }else{
                pos.x = 'left' ;
                pos.y = 'top' ;
            }
            return pos ;
        }
       function getPixelRatio(context) {
          var backingStore = context.backingStorePixelRatio ||
                context.webkitBackingStorePixelRatio ||
                context.mozBackingStorePixelRatio ||
                context.msBackingStorePixelRatio ||
                context.oBackingStorePixelRatio ||
                context.backingStorePixelRatio || 1;

          return (window.devicePixelRatio || 1) / backingStore;
      };
    }