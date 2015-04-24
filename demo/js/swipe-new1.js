
		function lunbo(arg){ //以对象形式传递参数
			var hash = location.hash.slice(1) ;
			var hashIndex = 0 ;
			console.log(hash.indexOf('swipe='))
			if (hash.indexOf('swipe=')>=0)
			{
				var hashIndex = $duoju.strToObj(hash).swipe; //获取swipe对应的键值
				console.log(hashIndex)
				hashIndex= hashIndex?hashIndex:0 ;
			}
			var idname = arg.idname,
				top = arg.top,
				autoPlay = !!arg.autoPlay,
				loop = !!arg.loop,
				dianNav =  !!arg.dianNav,
				callback = arg.callback,
				buttPrev = arg.buttPrev,
				buttNext = arg.buttNext;
			
			var $id = $('#'+idname);
			var $item = $('#'+idname+'>.item-wrap>div');
			var idWidth = $id.width(),
				idHeight = $id.height();
			var topMin = -idHeight ,
			    topCurrent = 0 ,
			    topMax = idHeight ,
				leftMin = 0 ,
				leftMax = 0 ,
				leftCurrent = 0 ,
				toLeft = false ,
			    len = $item.length ,
			    timeIn , //自动轮播
			    currentPage = parseInt(hashIndex,10) ;
			if (isNaN(currentPage) || currentPage<0 || currentPage>len-1) currentPage=0 ;
			if (top == 'left') //左右滑动
			{
				toLeft = true ,
				topMin = 0 ,
				topMax = 0 ,
				topCureent = 0 ,
				leftMin = -idWidth ,
				leftMax = idWidth ,
				leftCurrent = 0 ;
			}
			$item.not(':eq('+currentPage+')').css({webkitTransform:'translate('+leftMax+'px,'+topMax+'px)'}); //设置元素初始位置
			$item.each(function(){
				$(this)[0].style.zIndex = $(this).index()+'';
			});
			if (dianNav)
			{
				appendDian();
				var $dianItem = $('#'+idname+'>.dian>.dian-item');
				dianMove();
			}
			if (autoPlay) start();
			touchMove(idname);//touch事件
			function touchMove(idname){ //触摸事件
				var id = document.getElementById(idname);
				var xx,XX,$current,currentDom,$prev,prevDom,$next,nextDom,swipeX,swipeY,cha;
				id.addEventListener('touchstart',function(event){
					stop();
					xx = event.targetTouches[0].screenX;
					yy = event.targetTouches[0].screenY;
					XX = xx ;
					YY = yy ;
					cha = 0 ;
					$prev = $item.eq(currentPage-1)[0]?$item.eq(currentPage-1):$item.eq(len-1);
					$next = $item.eq(currentPage+1)[0]?$item.eq(currentPage+1):$item.eq(0);
					$current = $item.eq(currentPage);

					currentDom = $current[0],prevDom=$prev[0],nextDom=$next[0];

					prevDom.style.webkitTransform = 'translate('+leftMin+'px,'+topMax+'px)' ;
					nextDom.style.webkitTransform = 'translate('+leftMin+'px,'+topMax+'px)' ;
					
					currentDom.classList.remove('change');
					prevDom.classList.remove('change');
					nextDom.classList.remove('change');
					swipeX = true ;
					swipeY = true ;
				},false);
				id.addEventListener('touchmove',function(event){
					XX = event.targetTouches[0].screenX;
					YY = event.targetTouches[0].screenY;
					//document.querySelector('#log1').innerHTML = new Date().getTime()
					
					if (!toLeft)
					{
						event.stopPropagation();
						event.preventDefault();
						cha = YY-yy ;
						if (cha>=0)
						{
							if (!loop && currentPage==0) return swipeY=false; // 循环模块
							currentDom.style.webkitTransform = 'translate(0,'+(cha)+'px)';
							prevDom.style.webkitTransform = 'translate(0,0)' ;
							if (len>2) nextDom.style.webkitTransform = 'translate(0,'+(topMax)+'px)' ;// 避免因为滑动过快引起的bug
						}else{
							if (!loop && currentPage==len-1) return swipeY=false; // 循环模块
							currentDom.style.webkitTransform = 'translate(0,0)';
							nextDom.style.webkitTransform = 'translate(0,'+(topMax+cha)+'px)' ;
							if (len>2) prevDom.style.webkitTransform = 'translate(0,'+(topMax)+'px)' ;// 避免因为滑动过快引起的bug
						}
					}else{
						event.stopPropagation();
						event.preventDefault();
						cha = XX-xx ;
						if (cha>=0)
						{
							if (!loop && currentPage==0) return swipeX=false; // 循环模块
							currentDom.style.webkitTransform = 'translate('+cha+'px,0)';
							prevDom.style.webkitTransform = 'translate('+(leftMin+cha)+'px,0)';
							if (len>2) nextDom.style.webkitTransform = 'translate('+leftMax+'px,0)';// 避免因为滑动过快引起的bug
						}else{
							if (!loop && currentPage==len-1) return swipeX=false; // 循环模块
							currentDom.style.webkitTransform = 'translate('+cha+'px,0)';
							nextDom.style.webkitTransform = 'translate('+(leftMax+cha)+'px,0)';
							if (len>2) prevDom.style.webkitTransform = 'translate('+leftMin+'px,0)';// 避免因为滑动过快引起的bug
						}
					}
					//document.querySelector('#log1').innerHTML = new Date().getTime()
				},false);
				id.addEventListener('touchend',function(){
					//document.querySelector('#log1').innerHTML = new Date().getTime()
					currentDom.classList.add('change');
					prevDom.classList.add('change');
					nextDom.classList.add('change');
					if (!toLeft && swipeY )
					{
						if (cha>0)
						{
							if (cha>50)
							{
								currentDom.style.webkitTransform = 'translate(0,'+(topMax)+'px)';
								prevDom.style.webkitTransform = 'translate(0,0)';

								currentPage--;
								currentPage = setPage(currentPage);
							}else{
								currentDom.style.webkitTransform = 'translate(0,0)';
								prevDom.style.webkitTransform = 'translate(0,0)';
							}
						}else{
							if (cha<-50)
							{
								currentDom.style.webkitTransform = 'translate(0,0)';
								nextDom.style.webkitTransform = 'translate(0,0)';
								currentPage++;
								currentPage = setPage(currentPage);
							}else{
								currentDom.style.webkitTransform = 'translate(0,0)';
								nextDom.style.webkitTransform = 'translate(0,'+(topMax)+'px)';
							}
						}
					}
					else if ( toLeft && swipeX)
					{
						if (cha>0)
						{
							if (cha>50)
							{
								currentDom.style.webkitTransform = 'translate('+leftMax+'px,0)';
								prevDom.style.webkitTransform = 'translate(0,0)';
								currentPage--;
								currentPage = setPage(currentPage);
							}else{
								currentDom.style.webkitTransform = 'translate(0,0)';
								prevDom.style.webkitTransform = 'translate('+leftMin+'px,0)';
							}
						}else{
							if (cha<-50)
							{
								currentDom.style.webkitTransform = 'translate('+leftMin+'px,0)';
								nextDom.style.webkitTransform = 'translate(0,0)';
								currentPage++;
								currentPage = setPage(currentPage);
							}else{
								currentDom.style.webkitTransform = 'translate(0,0)';
								nextDom.style.webkitTransform = 'translate('+leftMax+'px,0)';
							}
						}
					}
					if (autoPlay) start();
					if(dianNav) dianMove();
					//document.querySelector('#log2').innerHTML = new Date().getTime()
					if (callback)
					{
						setTimeout(function(){
							callback(currentPage);
						},600)
					}
				},false);
			}
			function setPage(page){ //设置page
				if (page>len-1)
				{
					page=0;
				}else if (page<0)
				{
					page=len-1;
				}
				return page ;
			}
			function toWhere(index){ //主要是给左右点击事件使用
				if (index === currentPage) return
				stop();
				$item.removeClass('change');
				if ((index>currentPage)) //下一张
				{
					$item.eq(index).css({webkitTransform:'translate('+leftMax+'px,'+topMax+'px)'});
					$item.show().addClass('change');
					$item.eq(currentPage).css({webkitTransform:'translate('+leftMin+'px,'+topMin+'px)'});
				}else{                                                 // 上一张
					$item.eq(index).css({webkitTransform:'translate('+leftMin+'px,'+topMin+'px)'});
					$item.show().addClass('change');
					$item.eq(currentPage).css({webkitTransform:'translate('+leftMax+'px,'+topMax+'px)'});
				}
				$item.eq(index).css({webkitTransform:'translate(0,0)'});
				currentPage = index ;
				dianMove();
			}

			if (buttPrev)
			{
				$('#'+buttPrev).click(function(){
					console.log(currentPage);
					var index = currentPage-1 ;
					index = setPage(index);
					toWhere(index);
				});
			}
			if (buttNext)
			{
				$('#'+buttNext).click(function(){
					var index = currentPage+1 ;
					index = setPage(index);
					toWhere(index);
				});
			}
			function dianMove(){ //下面小点的运动
				$dianItem.eq(currentPage).addClass('dian-item-current').siblings().removeClass('dian-item-current');
			}
			function appendDian(){ //添加点
				var dian = '';
				for (var i=0;i<len ;i++ )
				{
					dian = dian+'<span class="dian-item"></span>';
				}
				$id.append('<div class="dian">'+dian+'</div>');
			}

			function start(){ //自动轮播
				timeIn=setInterval(move,2000);
			}
			function stop(){ //清除自动轮播
				clearInterval(timeIn);
			}
			function move(){ 
				$item.removeClass('change');
				if (currentPage < len-1)
				{
					$item.eq(currentPage+1).css({webkitTransform:'translate('+leftMax+'px,'+topMax+'px)'}); 
					$item.show().addClass('change');
					//console.log($item.eq(currentPage+1).offset().top)
					$item.eq(currentPage).css({webkitTransform:'translate('+leftMin+'px,'+topMin+'px)'});
					$item.eq(currentPage+1).css({webkitTransform:'translate(0,0)'});
					currentPage++;
				}else{
					$item.eq(0).css({webkitTransform:'translate('+leftMax+'px,'+topMax+'px)'});
					$item.show().addClass('change'); //为什么$item.eq(0).css({top:topMax});$item.addClass('change');前一语句不能正常执行
					$item.eq(currentPage).css({webkitTransform:'translate('+leftMin+'px,'+topMin+'px)'});
					$item.eq(0).css({webkitTransform:'translate(0,0)'});
					currentPage=0;
				}
				dianMove()
			}
		}