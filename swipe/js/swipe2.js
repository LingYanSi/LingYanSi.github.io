/*
* 并没有做好模块化，其实应该只提供一个骨架，也就是上下/左右滑动的监听
* 具体需要什么样的滑动效果，应该是用户自定义的，也就是说touchmove,touchstrart,touchend的事件，应该独立出来
*/
var Lunbo = function (arg){ //以对象形式传递参数
	var hash = location.hash.slice(1) ;
	var hashIndex = 0 ;
	//console.log(hash.indexOf('swipe='))
	if (hash.indexOf('swipe=')>=0)
	{
		var hashIndex = $duoju.strToObj(hash).swipe; //获取swipe对应的键值
		//console.log(hashIndex)
		hashIndex= hashIndex?hashIndex:0 ;
	}
	var idname = arg.idname,
		top = arg.top,
		autoPlay = !!arg.autoPlay,
		loop = !!arg.loop,
		dianNav =  !!arg.dianNav,
		callback = arg.callback,
		buttPrev = arg.buttPrev,
		buttNext = arg.buttNext,
		keyEvent = arg.keyEvent;
	//console.log(autoPlay,loop,dianNav)
	var isPhone = !!navigator.userAgent.toLowerCase().match(/android|phone|pad/g);
	var $id = document.querySelector('#'+idname);
	// $id.querySelector('.sass-item').style.visibility = 'visible' ;

	var $item = [].slice.call($id.firstElementChild.children);
	var $dianItem ;
	var idWidth = $id.offsetWidth,
		idHeight = $id.offsetHeight;
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
	$item.forEach(function(ele,index){
		if (index != currentPage) ele.style.webkitTransform = 'translate3d('+leftMax+'px,'+topMax+'px,0)' ;
	});

	if (dianNav) dianInit();

	if (autoPlay) start();

	// TouchMove(idname);//touch事件

	buttEvent(); // 按钮事件

	window.addEventListener('keyup',function(event){ // 按键监听
		if(!keyEvent) return
		var index ;
		if (event.keyCode==40 || event.keyCode==39) index = setPage((currentPage+1) ),toWhere(index,'next');
		else if (event.keyCode==38 || event.keyCode==37)  index = setPage((currentPage-1) ),toWhere(index,'prev');
	});

	// function TouchMove(idname){ //触摸事件
		var id = document.getElementById(idname);
		var xx,XX,currentDom,prevDom,nextDom,swipeX,swipeY,cha,chaCache;
		var mouseStart , mouseMove , mouseEnd ,isPhone ;
		var time = 400 ;
		var time1 = new Date().getTime() ;
		var time2 = 0 ;

		isPhone = !!navigator.userAgent.toLowerCase().match(/android|phone|pad/g) ;
		mouseStart = isPhone ? 'touchstart' : 'mousedown' ;
		mouseMove = isPhone ? 'touchmove' : 'mousemove' ;
		mouseEnd = isPhone ? 'touchend' : 'mouseup' ;

		/*----------初始化一下----------*/
		prevDom = $item[currentPage-1]?$item[currentPage-1]:$item[len-1];
		nextDom = $item[currentPage+1]?$item[currentPage+1]:$item[0];
		currentDom = $item[currentPage];
		setDom();

		id.addEventListener(mouseStart,function(event){
			touchStart(event);
		});
		id.addEventListener(mouseMove,function(event){
			touchMove(event);
		});
		id.addEventListener(mouseEnd,function(event){
			touchEnd(event);
		});

		function touchStart(event){ // 开始滑动
			cha = 0 ;
			time1 = new Date().getTime() ;
			if(time1-time2<=time+150){
				swipeX = false ;
				swipeY = false ;
				return
			}
			if (autoPlay) stop();
			xx = isPhone ? event.targetTouches[0].screenX : event.pageX;
			yy = isPhone ? event.targetTouches[0].screenY : event.pageY;
			XX = xx ;
			YY = yy ;
			
			swipeY = true ;
			swipeX = true ;
		}
		function touchMove(event){ // 滑动中
			XX = event.targetTouches ? event.targetTouches[0].screenX : event.pageX;
			YY = event.targetTouches ? event.targetTouches[0].screenY : event.pageY;
			
			if (swipeY && (!swipeX || Math.abs(XX-xx)-Math.abs(YY-yy)<0))
			{
				swipeX = false ;
				if (!toLeft)
				{
					event.stopPropagation();
					event.preventDefault();
					cha = YY-yy ;
					if (cha>=0)
					{
						if(currentPage==0 && cha>=0) cha=0 ;
						currentDom.style.webkitTransformOrigin = 'center 125%';
						currentDom.style.webkitTransform = 'translate3d(0,0,0) scale3d('+(1-cha/topMax/4)+','+(1-cha/topMax/4)+',1)';
						prevDom.style.webkitTransform = 'translate3d(0,'+(cha+topMin)+'px,0)' ;
						if (len>2) nextDom.style.webkitTransform = 'translate3d(0,'+(topMax)+'px,0)' ;// 避免因为滑动过快引起的bug
					}else{
						if(currentPage==len-1 && cha<=0) cha=0 ;
						currentDom.style.webkitTransformOrigin = 'center -25%';
						currentDom.style.webkitTransform = 'translate3d(0,0,0) scale3d('+(1+cha/topMax/4)+','+(1+cha/topMax/4)+',1)';
						nextDom.style.webkitTransform = 'translate3d(0,'+(topMax+cha)+'px,0)' ;
						if (len>2) prevDom.style.webkitTransform = 'translate3d(0,'+(topMax)+'px,0)' ;// 避免因为滑动过快引起的bug
					}
				}
			}
			if(swipeX && (!swipeY || Math.abs(XX-xx)-Math.abs(YY-yy)>0) ){
				swipeY = false ;
				if (toLeft)
				{
					event.stopPropagation();
					event.preventDefault();
					cha = XX-xx ;
					if (cha>=0)
					{
						if(currentPage==0 && cha>=0) cha=0 ;
						currentDom.style.webkitTransform = 'translate3d('+( cha )+'px,0,0)';
						prevDom.style.webkitTransform = 'translate3d('+(leftMin+cha)+'px,0,0)';
						if (len>2) nextDom.style.webkitTransform = 'translate3d('+leftMax+'px,0,0)';// 避免因为滑动过快引起的bug
					}else{
						if(currentPage==len-1 && cha<=0) cha=0 ;
						currentDom.style.webkitTransform = 'translate3d('+cha+'px,0,0)';
						nextDom.style.webkitTransform = 'translate3d('+(leftMax+cha)+'px,0,0)';
						if (len>2) prevDom.style.webkitTransform = 'translate3d('+leftMax+'px,0,0)';// 避免因为滑动过快引起的bug
					}
				}
			}
		}
		function touchEnd(event){ // 滑动结束
			if(cha == 0)
			{
				swipeY = false ;
				swipeX = false ;
				return ;
			}
			currentDom.classList.add('swipe-change');
			prevDom.classList.add('swipe-change');
			nextDom.classList.add('swipe-change');

			if (!toLeft && swipeY ) // 上下滑动
			{
				time2 = new Date().getTime();
				if (cha>0)
				{
					if (cha>50)
					{
						currentDom.style.webkitTransform = 'translate3d(0,0,0) scale3d('+(1-cha/topMax/4*1.4)+','+(1-cha/topMax/4*1.4)+',1)';
						prevDom.style.webkitTransform = 'translate3d(0,0,0)';

						currentPage--;
						currentPage = setPage(currentPage);
					}else{
						currentDom.style.webkitTransform = 'translate3d(0,0,0)';
						prevDom.style.webkitTransform = 'translate3d(0,0,0)';
					}
				}else{
					if (cha<-50)
					{
						currentDom.style.webkitTransform = 'translate3d(0,0,0) scale3d('+(1+cha/topMax/4*1.4)+','+(1+cha/topMax/4*1.4)+',1)';
						nextDom.style.webkitTransform = 'translate3d(0,0,0)';
						currentPage++;
						currentPage = setPage(currentPage);
					}else{
						currentDom.style.webkitTransform = 'translate3d(0,0,0)';
						nextDom.style.webkitTransform = 'translate3d(0,'+(topMax)+'px,0)';
					}
				}
			}
			else if ( toLeft && swipeX) // 左右滑动
			{
				time2 = new Date().getTime();
				if (cha>0)
				{
					if (cha>50)
					{
						currentDom.style.webkitTransform = 'translate3d('+leftMax+'px,0,0)';
						prevDom.style.webkitTransform = 'translate3d(0,0,0)';
						currentPage--;
						currentPage = setPage(currentPage);
					}else{
						currentDom.style.webkitTransform = 'translate3d(0,0,0)';
						prevDom.style.webkitTransform = 'translate3d('+leftMin+'px,0,0)';
					}
				}else{
					if (cha<-50)
					{
						currentDom.style.webkitTransform = 'translate3d('+leftMin+'px,0,0)';
						nextDom.style.webkitTransform = 'translate3d(0,0,0)';
						currentPage++;
						currentPage = setPage(currentPage);
					}else{
						currentDom.style.webkitTransform = 'translate3d(0,0,0)';
						nextDom.style.webkitTransform = 'translate3d('+leftMax+'px,0,0)';
					}
				}
			}
			swipeY = false ;
			swipeX = false ;
			if (autoPlay) start();
			if(dianNav) dianMove();
			chaCache = cha ;

			if (callback)
			{
				setTimeout(function(){
					callback(currentPage);
				},100)
			}
		}
/*---------------------------------------问题在这里------------------------------------------------------------*/
		$item.forEach(function(ele){
			ele.addEventListener('webkitTransitionEnd',function(){
				if(chaCache!=0){ // 因为有两个dom会发生transition，这样做是为了让其只执行一次
					setDom(chaCache); //在mx3系统浏览器，uc浏览器中，滑动结束后prevDom,nextDom，表现为transform没改变，z-index的改变也显得很滞后
					chaCache = 0 ;
				}
			});
		});

		// 通过设置z-index来解决层级问题
		function setDom(chaCache){ // 初始化工作，不放在touchstart时执行，而是在滑动结束的时候执行，这样体验会更好些

			currentDom.classList.remove('swipe-change'); // 移除transition
			prevDom.classList.remove('swipe-change');
			nextDom.classList.remove('swipe-change');
			currentDom.offsetWith ; // 强制repaint

			prevNextHidden(chaCache); // 修改visibility/z-index，

			prevDom = $item[currentPage-1]?$item[currentPage-1]:$item[len-1]; // 重置 上一个/当前/下一个
			nextDom = $item[currentPage+1]?$item[currentPage+1]:$item[0];
			currentDom = $item[currentPage];
			
			nextDom.getBoundingClientRect().width ;
			if(!toLeft) // 
			{
				currentDom.style.cssText = '; visibility:visible; -webkit-transform:translate3d(0,0,0); z-index:1;' ;
				prevDom.style.cssText = '; visibility:visible; -webkit-transform:translate3d('+leftMin+'px,'+topMin+'px,0); z-index:2; ' ;
				nextDom.style.cssText = '; visibility:visible; -webkit-transform:translate3d('+leftMin+'px,'+topMax+'px,0); z-index:2; ' ;
				// alert(111);
			}else{
				currentDom.style.cssText = ';-webkit-transform:translate3d(0,0,0); visibility:visible;' ;
				prevDom.style.cssText = ';-webkit-transform:translate3d('+leftMin+'px,'+topMin+'px,0); visibility:visible; ' ;
				nextDom.style.cssText = ';-webkit-transform:translate3d('+leftMin+'px,'+topMax+'px,0); visibility:visible; ' ;
			}
		};
		function prevNextHidden(cha){
			if (cha > 50) {
				if(!toLeft){
					nextDom.style.cssText += ';visibility:hidden; z-index:0;';
				}else{
					nextDom.style.visibility = 'hidden';
				}
			} else if (cha < -50) {
				if(!toLeft){
					prevDom.style.cssText += ';visibility:hidden; z-index:0;';
				}else{
					prevDom.style.visibility = 'hidden';
				}
			}
		};
	// }
	
	function setPage(page){ //设置page
		if (page>len-1){ 
			page=0;
			if(!loop) page=len-1 ;
		}
		else if (page<0){
			page=len-1;
			if(!loop) page=0 ;
		}
		return page ;
	}
	function toWhere(index,dir){ //主要是给左右点击事件使用
		// 这个地方因该重构一下
		// 1.参数中有方向，目标值
		// 2.清除前后两个dom所含有的transition，visibility:hidden,
		// 3.设置目标值的transition，visibility:visible;
		// 4.结束后，才会重置，前中后
		// 5.回调
		var index = setPage(index);
		if (index === currentPage) return

		currentDom.classList.remove('swipe-change'); // 移除transition
		prevDom.classList.remove('swipe-change');
		nextDom.classList.remove('swipe-change');

		currentDom = $item[currentPage];
		nextDom = $item[index];
		if(autoPlay) stop();
		var leftPrev , leftNext , topPrev, topNext ; 
		if (dir=='next') //下一张
		{
			leftPrev = leftMax ,
			topPrev = topMax ,
			leftNext = leftMin ,
			topNext = topMin ;
			chaCache = 100 ;
		}else {
			leftPrev = leftMin  ,
			topPrev = topMin ,
			leftNext = leftMax ,
			topNext = topMax ;
			chaCache = -100 ;
		}
		// currentDom.style.cssText += '; ' ;
		nextDom.style.cssText += '; visibility:visible; -webkit-transform:translate3d('+leftPrev+'px,'+topPrev+'px,0);  ' ;
		console.log(nextDom.getBoundingClientRect().width) ;

		currentDom.classList.add('swipe-change'); // 移除transition
		nextDom.classList.add('swipe-change');

		currentDom.style.cssText += ';-webkit-transform:translate3d('+leftNext+'px,'+topNext+'px,0);' ;
		nextDom.style.cssText += ';-webkit-transform:translate3d(0,0,0);' ;

		currentPage = index ;

		if(dianNav) dianMove();
		if(autoPlay) start();
		
		if (callback)
		{
			setTimeout(function(){
				callback(currentPage);
			},100)
		}
	}
	this.toWhere = toWhere ;

	function buttEvent(){
		if (!!buttPrev)
		{
			var click = isPhone ? 'touchend' : 'click' ;
			document.querySelector('#'+buttPrev).addEventListener(click,function(){
				var index = currentPage-1 ;
				toWhere(index,'prev');
			});
		}
		if (!!buttNext)
		{
			var click = isPhone ? 'touchend' : 'click' ;
			document.querySelector('#'+buttNext).addEventListener(click,function(){
				var index = currentPage+1 ;
				toWhere(index,'next');
			});
		}
	}


	function dianMove(){ //下面小点的运动
		$dianItem.forEach(function(ele,index){
			if(index==currentPage) ele.classList.add('dian-item-current')
			else ele.classList.remove('dian-item-current')
		});
	}

	function appendDian(){ //添加点
		var dian = [];
		for (var i=0;i<len ;i++ )
		{
			dian.push('<span class="dian-item"></span>');
		}
		var innerHTML = dian.join('');
		var fg = document.createDocumentFragment();
		var div = document.createElement('div');
		div.className = 'dian' ;
		fg.appendChild(div);
		var fgDian = fg.querySelector('div') ;
		fgDian.innerHTML = innerHTML ;
		$id.appendChild(fgDian);
	}
	function dianInit(){
		appendDian();
		$dianItem = [].slice.call(document.querySelector('#'+idname).querySelectorAll('.dian-item'));
		dianMove();
	}
	
	function start(){ //自动轮播
		timeIn=setInterval(move,1000);
	}
	function stop(){ //清除自动轮播
		clearInterval(timeIn);
	}
	function move(){ 
		toWhere(currentPage+1,'next')
	}
}