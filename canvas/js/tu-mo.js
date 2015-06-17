/*
* 所谓canvas涂抹，就是重新写一个 clearRect()上去
* 手指坐标所在地是一个小圆圈，也就是要不断的画小圆圈
*/

function tuMo(){
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d') ;

	var img = new Image();
	img.src = '1.jpg' ;
	img.addEventListener('load',function(){
		ctx.drawImage(img,0,0);
		ctx.globalCompositeOperation="destination-out"; // 先画上一张图之后，再设定重合部分的处理
	});

	canvas.addEventListener('touchstart',function(event){
		touchstart(event)
	});
	canvas.addEventListener('touchmove',function(event){
		touchstart(event)
	});

	function touchstart(event){
		event.stopPropagation();
		event.preventDefault();
		var x = event.targetTouches[0].clientX ;
		var y = event.targetTouches[0].clientY ;

		ctx.beginPath();
		ctx.arc(x,y,20,0,2*Math.PI);
		/*data = ctx.getImageDate(x-10,y-10,20,20);

		ctx.clearRect(x-10,y-10,20,20);*/
		ctx.fillStyle = 'rgba(255,255,0,1)';
		ctx.closePath();
		ctx.fill();
	}
}