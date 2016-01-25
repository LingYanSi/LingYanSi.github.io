    function quan(info,option){
         var canvas = document.getElementById('canvas') ;
        if(canvas.getContext) var ctx = canvas.getContext('2d') ;
        var ratio = getPixelRatio( ctx ) ;
        var bl = document.getElementById('wrap').offsetWidth/500 ;
        var bili = bl*ratio ;
        canvas.style.width = 500*bl +'px' ;
        canvas.style.height = 500*bl +'px' ;
        canvas.width = 500*bili ;
        canvas.height = 500*bili ;

        var r = Math.round( 120*bili ) ;
        var d = Math.round( 12*bili ) ;

        var center = { left: r+1, top: r+1 }

        var changeItem = 1 ; // 主要是为动画准备
        bing(info);


        function bing(info,events){ // 画饼
            ctx.clearRect(0,0,canvas.width,canvas.height);
            var PI = Math.PI*2 ;
            var angBegin= PI/2 , angEnd = 0 ;
            for(var i=0,len=info.length;i<len;i++){
                angEnd = angBegin + PI*( info[i].ang )*changeItem  ;

                ctx.save();

                ctx.beginPath(); // 画一个圆环
                ctx.lineCap = 'round' ;
                ctx.lineWidth = 12*bili;
                ctx.arc(center.left,center.top,r-(d+6)*i-6,0,PI,false);
                ctx.closePath();
                ctx.fillStyle = 'rgba(0,0,0,0)';
                ctx.strokeStyle = 'rgba(237,237,237,1)' ;
                ctx.stroke();
                ctx.closePath(); // 画一个圆环
                ctx.fill();
                ctx.restore();

                ctx.save();
                ctx.beginPath(); // 画一个圆环
                ctx.lineCap = 'round' ;
                ctx.lineWidth = 12*bili;
                ctx.arc(center.left,center.top,r-(d+6)*i-6,angBegin,angEnd,false);
                ctx.fillStyle = 'rgba(0,0,0,0)';
                ctx.strokeStyle = info[i].color ;
                ctx.stroke();
                ctx.closePath(); // 画一个圆环
                ctx.fill();
                ctx.restore();


            }
            for( var i=0,len=info.length;i<len;i++){
                ctx.save();
                ctx.beginPath();
                ctx.strokeStyle = info[i].color ;
                ctx.moveTo( (d+6)*i+6, 100*bili ) ;
                ctx.lineTo( (d+6)*i+6, 2.6*100*bili+40*i );
                ctx.lineTo( 250*bili,  2.6*100*bili+40*i );
                ctx.stroke();
                ctx.restore();

                ctx.save();
                ctx.beginPath();
                ctx.arc( 250*bili,  2.6*100*bili+40*i ,3*bili, 0 , PI ,true);
                ctx.fillStyle = info[i].color ;
                ctx.fill();

                ctx.beginPath();
                ctx.font = 16*bili+'px serif' ;
                ctx.fillStyle = info[i].color ;
                ctx.textBaseline = 'middle' ; // 设置基线，就此出来说Middle的作用是让其居中
                ctx.fillText( info[i].title , 250*bili+6*bili,  2.6*100*bili+40*i ) ;
                ctx.fill();

                ctx.fillStyle = 'rgb(210,210,210)' ;
                ctx.fillText( '击败'+info[i].ang*100+'%的宝宝' , 250*bili+(6+7*16)*bili,  2.6*100*bili+40*i ) ;
                ctx.fill();

                ctx.fillStyle = info[i].color ;
                ctx.fillText( info[i].ang*100+'%' , 250*bili+(6+9*16)*bili,  2.6*100*bili+40*i ) ;
                ctx.fill();
                // ctx.closePath(); // 画一个圆环
                ctx.restore();
            }
            document.querySelector('#bitt').style.fontSize = 30*bl+'px';
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
