		function swipeReal(idname,direction){
			var nav = document.querySelector('#'+idname);
			var navWrap = nav.firstElementChild ;
			var xx,yy,XX,YY,swipeX,swipeY ;
			var currentX = 0 ;
			var v = 0 ;
			var t1 = t2 = 0 ;
			var x1 = x2 = 0 ;
			var L = 200 ; // 恒定值与速度相乘得出要移动的距离
			var toLeft ;
			if(direction=='left') toLeft = true ;
			else if(direction=='top') toLeft = false ;
			var navWidth , navWrapWidth , disMax , disMin ;
			if (toLeft)
			{
			    navWidth = nav.offsetWidth ,
				navWrapWidth = navWrap.offsetWidth ;
			    disMax = 0 ;
			    disMin = navWidth - navWrapWidth ;
			}else{
			    navWidth = nav.offsetHeight ,
				navWrapWidth = navWrap.offsetHeight ;
			    disMax = 0 ;
			    disMin = navWidth - navWrapWidth ;
			}
			nav.addEventListener('touchstart',function(event){
				navWrap.classList.remove('swipe-real-change');
				XX = xx = event.targetTouches[0].screenX ;
				YY = yy = event.targetTouches[0].screenY ;
				t2 = t1 = new Date().getTime() ;
				if(toLeft) x2 = x1 = xx ;
				else  x2 = x1 = yy ;
				swipeX = true ;
				swipeY = true ;
			})
			nav.addEventListener('touchmove',function(event){
				XX = event.targetTouches[0].screenX ;
				YY = event.targetTouches[0].screenY ;
				if(swipeX && Math.abs(XX-xx)-Math.abs(YY-yy)>0)
				{
					swipeY = false ;
					if(!toLeft) return
					event.stopPropagation();
					event.preventDefault();
					if (t2-t1>=50)
					{
						t1 = t2 ;
						x1 = x2 ;
					}
					t2 = new Date().getTime() ;
					x2 = XX ;
					navWrap.style.webkitTransform = 'translate3d('+(currentX + XX-xx)+'px,0,0)';
				}else if (swipeY && Math.abs(XX-xx)-Math.abs(YY-yy)<0)
				{
					swipeX = false ;
					if(toLeft) return
					event.stopPropagation();
					event.preventDefault();
					if (t2-t1>=50)
					{
						t1 = t2 ;
						x1 = x2 ;
					}
					t2 = new Date().getTime() ;
					x2 = YY ;
					navWrap.style.webkitTransform = 'translate3d(0,'+(currentX + YY-yy)+'px,0)';
				}
			})
			nav.addEventListener('touchend',function(event){
				if (swipeX) //左右滑动
				{
					swipeY = false ;
					currentX = currentX + XX-xx ;
				}else if (swipeY) // 上下滑动
				{
					currentX = currentX + YY-yy ;
				}
				var v = (x2-x1)/(t2-t1) ; // 计算速度
				if(isNaN(v) || v===0) {  //如果速度不正常
					if(currentX >= disMin && currentX <= disMax) return
					currentX = distance  = setDis(currentX);
					navWrap.classList.add('swipe-real-change');
					if(toLeft) navWrap.style.webkitTransform = 'translate3d('+(distance)+'px,0,0)';
					else navWrap.style.webkitTransform = 'translate3d(0,'+(distance)+'px,0)';
					return
				}
				var distance = currentX+v*L ; // 计算translateX
				currentX = distance = setDis(distance);
				navWrap.classList.add('swipe-real-change');
				if(toLeft) navWrap.style.webkitTransform = 'translate3d('+(distance)+'px,0,0)';
				else navWrap.style.webkitTransform = 'translate3d(0,'+(distance)+'px,0)';
			});
			function setDis(distance){ // 重置translateX
				if(distance>disMax) distance = disMax
				else if(distance < disMin ) distance = disMin 
				return distance ;
			}
		}