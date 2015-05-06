
	//--------------- 插入数据 -------------------------
	function insertList(dom,list){
		var $this = $('#'+dom) ;
		for (var i=0,len=list.length;i<len ;i++ )
		{
				var singerName = list[i].singer[0].name ,
				    singerUrl = list[i].singer[0].url ,
				    songName = list[i].songName[0].name ,
				    songNameUrl = list[i].songName[0].url ,
				    albumName = list[i].album[0].name ,
				    lyric = list[i].lyric[0].pos ,
				    poster = list[i].poster ,
				    songUrl = list[i].pos ;
				$this.append('<li class="music-list-item" data-songUrl="'+songUrl+'" data-lyricName="'+lyric+'" data-songPoster="'+poster+'" data-author="'+singerName+'" title="'+songName+'">'+songName+'</li>');
		}
	}
	var audio = document.createElement('audio');
		audio.volume = 0.5 ;
		audio.autoplay = 'true' ;
	var currentItem = 0 ,timeTagArr ,$jinduLoad = $('#jindu-load');
	var model = 0 ;
	$('#model').attr('data-model',model);

	var $jinduCurrent = $('#jindu-current') ,
		$duration = $('#duration') ,
		$currentTime = $('#currentTime') ;

	var mxPlayer = {
		init:function(){
			currentItem = this.checkIndex(currentItem) ;
			var $mliCurrent = $('.music-list-item').eq(currentItem);
			$mliCurrent.addClass('mli-current').siblings().removeClass('mli-current');
			audio.src = $mliCurrent.attr('data-songUrl') ;
			$('#volume-current').css({'width':audio.volume*100+'%'});
			$('#music-pic').attr({'src':$mliCurrent.attr('data-songPoster')})
			$('#music-pic-wrap').css({'background-image':'url('+$mliCurrent.attr('data-songPoster')+')'});
			audio.play();
			this.blur();

			var hei = lyricStr[$mliCurrent.attr('data-lyricName').split('/')[1]]
			this.lyric(hei);
			this.setLyricTop();
		},
		play:function(){ // 两种模式
			if (audio.paused === true) 
			{
				audio.play();
				$('#play').text('pause');
			}else if (audio.paused === false)
			{
				this.pause();
			}
		},
		pause:function(){
			audio.pause();
			$('#play').text('play');
		},
		next:function(index,prevNext,auto){ // 无论是上一首，下一首，当前重放，都在next属性中
			if (model === 0)
			{ 
				// 下一首
				if (typeof(index)!='number'){
					if( prevNext == 'next') currentItem++;
					else if( prevNext == 'prev' ) currentItem--;
				}else currentItem = index 

			}else if (model === 1)
			{
				// 随即播放
				if (typeof(index)!='number')  currentItem = Math.round(Math.random()*($('.music-list-item').length-1)),console.log('无需',currentItem) ;
				else currentItem = index 
			}else if (model === 2)
			{
				// 重复播放
				if (auto=='auto') currentItem = currentItem ; // 如果是自动下一首，就单曲循环
				else{  // 如果是点击【上一首，下一首】按钮
					if (typeof(index)!='number'){
						if( prevNext == 'next') currentItem++;
						else if( prevNext == 'prev' ) currentItem--;
					}else currentItem = index 
				}
			}
			mxPlayer.init();
		},
		checkIndex:function(index){ // 对currentItem进行校验
			var len = $('.music-list-item').length
			if (index> len-1)
			{
				return 0 ;
			}else if (index<0)
			{
				return len-1 ;
			}else return index
		},
		blur:function(){ // 高斯模糊背景
			$('#music-pic')[0].onload = function(){
				$('#music-pic,#music-bgd').attr({'width':$(window).width(),'height':$(window).height()});
				stackBlurImage( "music-pic", "music-bgd", 20, false );
			}
		},
		lyric:function(str){ // 对歌词字符串进行解析
			var $lyric = $('#lyric');
			$lyric.empty().css({'top':0}); //清空原有歌词，top回0
			var contentArr = str.split(/\[[^\]]+\]/g); //获取所有歌词
			var timeArr = str.match(/\[[^\]]+\]/g) ; // 获取时间
			contentArr.forEach(function(element){
				$lyric.append('<p>'+element+'</p>'); 
			});
			lyricScroll.init(); // 重置歌词区滚动条
			timeTagArr = timeArr.map(function(element){ // 对时间进行解析
				var arr = element.replace(/[\[\]]/g,'').split(':');
				return parseInt(arr[0],10)*60+parseFloat(arr[1]) ;
			});
			$lyricItem = $lyric.find('p');
		},
		lyricAuto:true ,
		model:['顺序','随机','loop'],
		setModel:function(index){
			if (index>=this.model.length) index = 0;
			return index ;
		},
		setLyricTop:function(){
			var lyricTop = $('#lyric-wrap')[0].offsetHeight/2 ;
			this.lyricTop = lyricTop ;
			$('#lyric').css({'padding': lyricTop + 'px 0'});
		},
		lyricTop:0 ,
		setTime:function(time){
			var time = Math.floor(time);
			var min = Math.floor(time/60);
			min = min>9?min:('0'+min);
			var sec = time%60 ;
			sec = sec>9?sec:('0'+sec);
			return min+':'+sec ;
		}
	}
	audio.ondurationchange = function(){
		duration = audio.duration ;
		$('#duration').text(mxPlayer.setTime(duration))
	}
	audio.ontimeupdate = function(){
			// 播放时间更新
		var currentTime = audio.currentTime ;
		var $lyricItemCurrent ;
		$currentTime.text(mxPlayer.setTime(currentTime));
		$jinduLoad.css({'width':audio.buffered.end(0)/duration*100+'%'});
		if( currentTime == duration ) mxPlayer.next(null,'next','auto');
		else{
			// doSth() 歌词同步，进度条同步，时间同步
			$jinduCurrent.css({'width':(audio.currentTime/duration*100)+'%'});
			for (var i=0,len=timeTagArr.length; i<len;i++ )
			{
				if (currentTime+0.9<timeTagArr[i])
				{
					$lyricItemCurrent = $lyricItem.eq(i);
					$lyricItemCurrent.addClass('lyric-item-current').siblings().removeClass('lyric-item-current');
					if(mxPlayer.lyricAuto) lyricScroll.setTop((mxPlayer.lyricTop-$lyricItemCurrent.position().top-$lyricItemCurrent[0].offsetHeight/2)),console.log()
					break ;
				}
			}
		}
	}
	$('#play').on('click',function(){
		mxPlayer.play();
	});
	$('#next').on('click',function(){
		mxPlayer.next(null,'next');
	});
	$('#prev').on('click',function(){
		mxPlayer.next(null,'prev');
	});
	$('#model').on('click',function(){
		model = parseInt($(this).attr('data-model'),10);
		model++ ;
		model = mxPlayer.setModel(model);
		$(this).text(mxPlayer.model[model]).attr('data-model',model)
	});
	$('#music-list').on('dblclick','.music-list-item',function(){
		currentItem = $(this).index();
		console.log('双击的我',currentItem)
		mxPlayer.next(currentItem)
	});
	$('#mute').on('click',function(){
		var mute = $(this).attr('data-mute');
		if (mute == 'false')
		{
			$(this).attr({'data-mute':'true','data-volume':audio.volume});
			audio.volume = 0 ;
			$('#volume-current').width(0);
		}else{
			$(this).attr({'data-mute':'false'});
			audio.volume = parseFloat($(this).attr('data-volume'));
			$('#volume-current').css({'width':audio.volume*100+'%'});
		}
	})

	// ---------------------------- 进度条拖 ---------------------------
	function dragCircle(dom,parent,grad,reset,callback){
		var xx,yy,XX,YY ,
			$dom = $('#'+dom),
			$parent = $('#'+parent),
			$grad = $('#'+grad),
			parentWidth,
			gradWidth = $grad.width();
		var idmove ;
		this.reset = reset;
		$dom.on('mousedown',function(event){
			parentWidth = $parent.width();
			XX = xx = event.pageX ;
			YY = yy = event.pageY ;
			console.log(parentWidth)
				idmove = true ;
		});
		$dom.on('mousemove',function(event){
			XX = event.pageX ;
			YY = event.pageY ;
			var parenWidthChange = parentWidth + XX -xx ;
			if (idmove)
			{
				if (parenWidthChange<0) parenWidthChange = 0 ;
				else if (parenWidthChange>gradWidth) parenWidthChange = gradWidth ;
				$parent.width(parenWidthChange)
			}
		});
		$dom.on('mouseup',function(event){
			idmove = false ;
			var parenWidthChange = $parent.width();
			if (callback) callback(parenWidthChange,gradWidth);
		});
		$(document).on('mouseup',function(){
				idmove = false ;
		});
		$grad.on('click',function(event){
			$parent.width(event.pageX - $(this).offset().left);
			var parenWidthChange = $parent.width();
			if (callback) callback(parenWidthChange,gradWidth);
		})
	}
	// ------------------------ 模拟滚动条 -------------------------

	function scrollbar(dom){
		var $this = $('#'+dom) ,
			$child = $this.children().eq(0);
		$this.append(
			'<div id="'+dom+'scrollbar" style="position:absolute;right:0;width:5px;height:0;background:rgba(247,105,105,0.6);border-radius:4px;overflow:hidden;"></div>'	
		);
		var $sb = $('#'+dom+'scrollbar');
		var thisHeight , childHeight , childtopMax , childtopMin ,  bili ,biliTop , sbHeight , sbTopMax ,sbTopMin ;
		this.init = function(){ // 当父元素，子元素高度有变化时，可以重置滚动条
			thisHeight = $this.height() ,
			childHeight = $child[0].offsetHeight,
			childtopMax = 0,
			childtopMin = thisHeight - childHeight ,
			bili = thisHeight/childHeight ,
			sbHeight = thisHeight*bili ,
			sbTopMax = thisHeight - sbHeight ,
			sbTopMin = 0 ;
			biliTop = -sbTopMax/childtopMin ;
			if (sbHeight != thisHeight) $sb.height(sbHeight);
			else $sb.height(0);
		}
		this.setTop = function(childTop,sbTop){
			if (childTop)
			{
				$child.css({'top':childTop});
				$sb.css({'top':-childTop*biliTop});
				return ;
			}
			if(sbTop){ 
				$sb.css({'top':sbTop});
				$child.css({'top':-sbTop/biliTop});
				return ;
			}
		}
		this.resetTop = function(childTop,sbTop){
			var childTop = $child.position().top ;
			var childHeightStore = childHeight ;
			var biliTopStore = biliTop ;
			this.init();
			var biliLC = childHeightStore/childHeight ;
			if (childHeight>thisHeight)
			{
				$child.css({'top':childTop*biliLC});
				$sb.css({'top':-childTop*biliLC*biliTopStore});
			}else{
				childTop = 0 ;
				$child.css({'top':childTop*biliLC});
				$sb.css({'top':-childTop*biliLC*biliTopStore});
			}
		}
		dragSb($sb);
		$this[0].addEventListener('mousewheel',function(event){
			event.stopPropagation();
			event.preventDefault();
			var event = event || window.event ;
			var detail = event.detail || event.wheelDelta ;
			var sbTop = $sb.offset().top ,
				childTop = $child.position().top ;
			childTop = childTop + detail ;
			if (childTop > childtopMax )
			{
				childTop = 0 ;
			}else if (childTop< childtopMin)
			{
				childTop = childtopMin ;
			}
			$sb.css({'top':-childTop*bili});
			$child.css({'top':childTop});
		});
		function dragSb($dom){
			var $sb = $dom ,
				sbCurrentTop,yy,YY,idmove ;
			$sb.on('mousedown',function(event){
			    sbCurrentTop = $sb.position().top ;
				YY = yy = event.pageY ;
				idmove = true ;
			});
			$sb.on('mousemove',function(event){
				YY = event.pageY ;
				var sbTop = sbCurrentTop+YY-yy ;
				if (idmove)
				{
					if (sbTop<sbTopMin) sbTop = sbTopMin ;
					else if(sbTop>sbTopMax) sbTop = sbTopMax ;
					$sb.css({'top':sbTop});
					$child.css({'top':-sbTop/bili})
				}
			});
			$sb.on('mouseup',function(event){
				idmove = false ;
			});
			$(document).on('mouseup',function(){
				idmove = false ;
			})
		}
	}