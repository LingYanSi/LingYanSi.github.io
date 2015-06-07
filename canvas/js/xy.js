function xy(info,option){
     var canvas = document.getElementById('canvas') ;
    if(canvas.getContext) var ctx = canvas.getContext('2d') ;
    var ratio = getPixelRatio( ctx ) ;
    var bl = document.getElementById('wrap').offsetWidth/500 ;
    var bili = bl*ratio ;
    canvas.style.width = 500*bl +'px' ;
    canvas.style.height = 500*bl +'px' ;
    canvas.width = 500*bili ;
    canvas.height = 500*bili ;

    // canvas.style.background = 'rgba(247,105,105,0.2)' ;
    var d = Math.floor( 400/info.length*bili );
    info.forEach(function(elem){ // 修改info
        elem.ang  = Math.round( elem.ang*bili ) ; 
    });
    var o = {   // 设置坐标原点
        x: Math.round( 50*bili )  ,
        y: Math.round( 250*bili ) 
    }
    var ctx = canvas.getContext('2d') ;
    var changeItem = 1 ;

    if(option) animation()
    else draw(info);

    function animation(){ 
            changeItem = 0 ; // 通过角度渐变实现
           function change(){
                draw(info);
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

    function draw(info){
        ctx.clearRect(0,0,canvas.width,canvas.height) ;
        xian();

        ctx.beginPath() ;
        ctx.moveTo( canvas.width  , o.y+0.5 ) ;
        ctx.lineTo( o.x+0.5 , o.y+0.5 ) ;
        ctx.lineTo( o.x+0.5  ,0.5 ) ;
        ctx.strokeStyle = "black" ;
        ctx.stroke() ;

        for( var i=0 , len=info.length ; i<len ; i++ ){
            ctx.beginPath();
            ctx.moveTo( o.x+d*i , o.y ) ;
            ctx.lineTo( o.x+d*(i+1) , o.y ) ;
            ctx.lineTo( o.x+d*(i+1) , o.y-info[i].ang*changeItem ) ;
            ctx.lineTo( o.x+d*i , o.y-info[i].ang*changeItem ) ;
            ctx.closePath() ;
            ctx.fillStyle = info[i].color ;
            ctx.fill() ;

            ctx.save();
            ctx.translate( o.x+d*i , o.y+14*bili ) 
            ctx.rotate(Math.PI/8);
            ctx.beginPath() ;
            ctx.font = 14*bili+'px serif' ;
            ctx.fillStyle = info[i].color ;
            ctx.fillText( info[i].title , 0 , 0 ) ;
            ctx.fill() ;
            ctx.restore() ;
        }
    }

    function xian(){
        var width = canvas.width ;
        var height = canvas.height ;
        ctx.save() ;
        ctx.strokeStyle = 'rgba(120,120,120,0.1)' ;
        for(var i=0.5 ; i<height ;i = i+10){
            ctx.beginPath();
            ctx.moveTo( 0 , i );
            ctx.lineTo( width , i );
            ctx.stroke() ;
        }
        for( var j = 0.5 ; j<width ; j=j+10 ){
            ctx.beginPath();
            ctx.moveTo( j , 0 );
            ctx.lineTo( j , height );
            ctx.stroke() ;
        }
        ctx.restore() ;
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

