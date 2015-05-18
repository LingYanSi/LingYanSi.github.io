define(['jquery'],function($){	
	var rotate = function (){
		var winHeight = $(window).height() ;
		var winWidth = $(window).width() ;
		document.getElementById('wrap').style.opacity = 1;
		$('.rotate-item').css({'transform-origin':'50% 50% -'+winWidth/2+'px'})
		var $item = $('.rotate-item') ;
		var len = $item.length ;
		var index = 0 ;
		var time = 0
		window.addEventListener('keyup',function(event){
			var newTime= new Date().getTime()
			if(newTime-time>600) time = newTime
			else return ;
			var keyCode = event.keyCode ;
			if (keyCode == 40 || keyCode == 39)
			{
				toWhere((index+1),'right');
				index = setPage(index+1) ;
			}else if (keyCode == 38 || keyCode == 37)
			{
				toWhere((index-1),'left');
				index = setPage(index-1) ;
			}
		});
		var $rotate = document.querySelector('.rotate'),
				item = [].slice.call($rotate.children) ,
				len = item.length ;
		touchEvent()
		function touchEvent(){
			var xx,yy,XX,YY,
				opaShow = 1,
				opaHide = 0,
				rotateYCur = 0,
				rotateYPrev = -90,
				rotateYNext = 90 ,
				currentDom,prevDom,nextDom,
				cha ,swipeX,swipeY;
			$rotate.addEventListener('mousedown',function(event){
				if(event.button==0) event.stopPropagation(),event.preventDefault();
				touchStart(event)
			},false);
			$rotate.addEventListener('mousemove',function(event){
				touchMove(event)
			},false);
			$rotate.addEventListener('mouseup',function(event){
				if(event.button==0) event.stopPropagation(),event.preventDefault();
				touchEnd(event);
			},false);
			function touchStart(event){
				cha = 0 ;
				XX = xx = event.targetTouches ? event.targetTouches[0].screenX : event.pageX ;
				YY = yy = event.targetTouches ? event.targetTouches[0].screenY : event.pageY ;
				index = setPage(index)
				currentDom = item[index] ;
				nextDom = item[index+1] ? item[index+1] : item[0];
				prevDom = item[index-1] ? item[index-1] : item[len-1] ;
				
				currentDom.classList.remove('change');
				nextDom.classList.remove('change');
				prevDom.classList.remove('change');
				swipeX = true , swipeY = true ;
			}
			function touchMove(event){
				if(!swipeX) return
				XX  = event.targetTouches ? event.targetTouches[0].screenX : event.pageX ;
				YY  = event.targetTouches ? event.targetTouches[0].screenY : event.pageY ;
				cha = XX - xx ;
				if (cha>0)
				{
					currentDom.style.opacity = 1-cha/winWidth +'' ;
					currentDom.style.transform = 'rotateY('+ (rotateYCur+(cha/winWidth)*90) +'deg)' ;
					prevDom.style.opacity = cha/winWidth +'' ;
					prevDom.style.transform = 'rotateY('+ (rotateYPrev+(cha/winWidth)*90) +'deg)' ;
				}else if (cha<0)
				{
					currentDom.style.opacity = 1+cha/winWidth +'' ;
					currentDom.style.transform = 'rotateY('+ (rotateYCur+(cha/winWidth)*90) +'deg)' ;
					nextDom.style.opacity = (-cha/winWidth) +'' ;
					nextDom.style.transform = 'rotateY('+ (rotateYNext+(cha/winWidth)*90) +'deg)' ;
				}
			}
			function touchEnd(event){
				if (cha>0)
				{
					if(cha<50){
						currentDom.classList.add('change');
						currentDom.style.opacity = opaShow +'' ;
						currentDom.style.transform = 'rotateY('+ rotateYCur +'deg)' ;
						prevDom.classList.add('change');
						prevDom.style.opacity = opaHide +'' ;
						prevDom.style.transform = 'rotateY('+ rotateYPrev +'deg)' ;
					}else{
						currentDom.classList.add('change');
						currentDom.style.opacity = opaHide +'' ;
						currentDom.style.transform = 'rotateY('+ rotateYNext +'deg)' ;
						prevDom.classList.add('change');
						prevDom.style.opacity = opaShow +'' ;
						prevDom.style.transform = 'rotateY('+ rotateYCur +'deg)' ;
						index-- ;
					}
				}else if (cha<0)
				{
					if (cha>-50)
					{
						currentDom.classList.add('change');
						currentDom.style.opacity =  opaShow +'' ;
						currentDom.style.transform = 'rotateY('+ rotateYCur +'deg)' ;
						nextDom.classList.add('change');
						nextDom.style.opacity = opaHide +'' ;
						nextDom.style.transform = 'rotateY('+ rotateYNext +'deg)' ;
					}else{
						currentDom.classList.add('change');
						currentDom.style.opacity = opaHide +'' ;
						currentDom.style.transform = 'rotateY('+ rotateYPrev +'deg)' ;
						nextDom.classList.add('change');
						nextDom.style.opacity = opaShow +'' ;
						nextDom.style.transform = 'rotateY('+ rotateYCur +'deg)' ;
						index++
					}
				}
				swipeX = false , swipeY = false ;
			}
		}
			function setPage(index){
				if(index>len-1) index=0 ;
				else if(index<0) index = len-1
				return index ;
			}
			function toWhere(toIndex,direction){
				var toIndex = setPage(toIndex);
				var nextDom = item[toIndex] ,
					currentDom = item[index] ;
				if (direction=='right')
				{
					nextDom.classList.remove('change');
					nextDom.style.opacity = '0' ;
					nextDom.style.transform = 'rotateY(90deg)';
					var x = nextDom.offsetWidth ;
					currentDom.classList.add('change');
					currentDom.style.opacity = '0' ;
					currentDom.style.transform = 'rotateY(-90deg)';
					nextDom.classList.add('change');
					nextDom.style.opacity = '1' ;
					nextDom.style.transform = 'rotateY(0deg)';
				}else if (direction=='left')
				{
					nextDom.classList.remove('change');
					nextDom.style.opacity = '0' ;
					nextDom.style.transform = 'rotateY(-90deg)';
					var x = nextDom.offsetWidth ;
					currentDom.classList.add('change');
					currentDom.style.opacity = '0' ;
					currentDom.style.transform = 'rotateY(90deg)';
					nextDom.classList.add('change');
					nextDom.style.opacity = '1' ;
					nextDom.style.transform = 'rotateY(0deg)';
				}
			}
	}
	return {run:rotate}
});