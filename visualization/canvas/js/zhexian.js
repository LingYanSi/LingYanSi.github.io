function zhexian(info){
     var canvas = document.getElementById('canvas') ;
    if(canvas.getContext) var ctx = canvas.getContext('2d') ;
    var ratio = getPixelRatio( ctx ) ;
    var bl = document.getElementById('wrap').offsetWidth/500 ;
    var bili = bl*ratio ;
    canvas.style.width = 500*bl +'px' ;
    canvas.style.height = 300*bl +'px' ;
    canvas.width = 500*bili ;
    canvas.height = 300*bili ;

    var d = Math.round( 500/info.length*bili ) ;
    var r = Math.round( 10*bili ) ;
    info.forEach(function(elem){
        elem.ang *= bili ; 
    })
    console.log(d)
    var o = {
        x: d/2 ,
        y:250
    }
    var ctx = canvas.getContext('2d') ;
    draw(info);
    click();

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
                draw(info,events)
            });
        }

    function draw( info , events ){
        ctx.clearRect( 0 , 0 , canvas.width , canvas.height ) ;
        ctx.beginPath() ;
        ctx.lineWidth = 1 ;
        ctx.moveTo( 0.5 , 0 ) ; // 这里有个关于线条粗细的坑，一条与x轴平行的直线y=5 ;ctx.lineWidth = 1 ;它实际宽度其实为2
                                            // 这与canvas的渲染有关，详见https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors
        ctx.lineTo( 0.5 , o.y+0.5 ) ;
        ctx.lineTo( canvas.width  , o.y+0.5 ) ;
        ctx.strokeStyle = 'rgba(0,0,0,0.3)' ;
        ctx.stroke() ;

        for( var i=0 , len=info.length ; i<len; i++ ){
            ctx.beginPath(); // 画圆
            ctx.arc(o.x+d*i , o.y-info[i].ang , r , 0 , Math.PI*2 , true ) ;
            ctx.fillStyle = info[i].color ;
            if(!!events && ctx.isPointInPath( events.mouseX , events.mouseY )){
                ctx.fillStyle = 'red' ;
            }
            ctx.fill() ;

            if(i==len-1) break ;

            ctx.beginPath(); // 画线
            ctx.moveTo( o.x+d*i , o.y-info[i].ang)  ;
            ctx.lineTo( o.x+d*(i+1) , o.y-info[i+1].ang)  ;
            ctx.strokeStyle = info[i].color ;
            ctx.stroke() ;

        }
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

