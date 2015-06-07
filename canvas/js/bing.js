  function bing(info,option){
         var canvas = document.getElementById('canvas') ;
        if(canvas.getContext) var ctx = canvas.getContext('2d') ;
        var ratio = getPixelRatio( ctx ) ;
        var bl = document.getElementById('wrap').offsetWidth/500 ;
        var bili = bl*ratio ;
        canvas.style.width = 500*bl +'px' ;
        canvas.style.height = 300*bl +'px' ;
        canvas.width = 500*bili ;
        canvas.height = 300*bili ;

        var r = 100*bili ;
        var center = { left: canvas.width/2*4/5 , top:canvas.height/2 }

        bing(info);
        scale();
        setScore(info);
        setPos(info);

        var mouseup = 'touchstart'
        document.querySelector('#canvas').addEventListener( mouseup , function(event){

            var mouseX = ( event.targetTouches ? event.targetTouches[0].clientX : event.clientX ) - this.getBoundingClientRect().left ;
            var mouseY = ( event.targetTouches ? event.targetTouches[0].clientY : event.clientY )- this.getBoundingClientRect().top ;
            var events = { mouseX:mouseX*ratio , mouseY:mouseY*ratio }
            // console.log( mouseup , this.getBoundingClientRect().top , events )
            bing(info,events)
            
        });
        function bing(info,events){
            ctx.clearRect(0,0,canvas.width,canvas.height);
            var angBegin= 0 , angEnd = 0 ;
            var PI = Math.PI*2 ;
            for(var i=0,len=info.length;i<len;i++){
                angBegin = angEnd ;
                angEnd = angBegin - PI*( info[i].ang );

                ctx.save();
                if(i>=0) {
                    // ctx.translate(Math.cos((angBegin + angEnd)/2)*10,Math.sin((angBegin + angEnd)/2)*10)
                    // console.log(Math.cos((angBegin + angEnd)/2)*100)
                }
                ctx.beginPath();
                ctx.moveTo(center.left,center.top);
                ctx.arc(center.left,center.top,r,angBegin,angEnd,true);
                ctx.closePath();
                ctx.fillStyle = info[i].color ;
                if(events){
                    if(ctx.isPointInPath(events.mouseX,events.mouseY)){
                        ctx.fillStyle = 'red' ;
                    }
                }
                ctx.fill();
                ctx.restore();

                ctx.save();
                ctx.translate(center.left,center.top);
                ctx.rotate((angBegin + angEnd)/2);
                ctx.beginPath();
                ctx.fillStyle = 'rgba(0,0,0,0)' ;
                ctx.font = "20px serif";
                ctx.textBaseline = 'middle' ; // 设置基线，就此出来说Middle的作用是让其居中
                ctx.fillText("Hello world", 100, 0);
                ctx.fill();
                ctx.restore();
            }
        }
        function scale(){
            var $pc = document.getElementById('pie-content-score') ;
            $pc.style.webkitTransformOrigin = "left top" ;
            $pc.style.webkitTransform = 'scale3d('+bili+','+bili+',1)';

            var $pc = document.getElementById('pie-color') ;
            $pc.style.webkitTransformOrigin = "right bottom" ;
            $pc.style.webkitTransform = 'scale3d('+bili+','+bili+',1)';
        }
        function setScore(info){
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
        function setPos(info){
            var scoreItem = [].slice.call(document.querySelectorAll('#pie-content-score .pcs-item'));
            var angBegin= 0 , angEnd = 0 ;
            var PI = Math.PI*2 ;
            var x,y ;
            var angel ,pos ;

            console.log(scoreItem)
            for(var i=0,len=info.length ; i<len ; i++ ){
                angBegin = angEnd ;
                angEnd = angBegin - PI*( info[i].ang );
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
        function judge(angel){
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