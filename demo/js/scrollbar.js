
	var audio = document.createElement('audio');
		audio.volume = 0.2 ;
		audio.autoplay = 'true' ;
	var $list = $('.music-list-item') ;
	var currentItem = 0 ;
	var model = '0' ;

	var mxPlayer = {
		init:function(index){
			audio.src = this.list.eq(index).attr('data-playUrl') ;
			audio.play();
		},
		play:function(){ // 两种模式
			if (audio.paused === true) 
			{
				audio.play();
			}else if (audio.paused === false)
			{
				audio.pause();
			}
		},
		next:function(index){ // 无论是上一首，下一首，当前重放，都在next属性中
			if (model == '0')
			{ 
				// 下一首
				if (index) currentItem = this.setItem(index)
				else{
					currentItem++;
					currentItem = this.checkIndex(index) ;
				}
			}else if (model == '1')
			{
				// 随即播放
				if (index) currentItem = this.checkIndex(index)
				else{
					currentItem = Math.round(Math.random*$list.length) ;
				}
			}else if (model === '2')
			{
				// 重复播放
				if (index) currentItem = this.checkIndex(index)
				else{
					currentItem = currentItem ;
				}
			}
			mxPlayer.init(currentItem);
		},
		checkIndex:function(index){
			if (index>= $list.length)
			{
				return 0 ;
			}else if (index<0)
			{
				return $list.length ;
			}else return index
		}
	}
	audio.ondurationchange = function(){
		duration = audio.duration ;
	}
	audio.ontimeupdate = function(){
			// 播放时间更新
		if( audio.currentTime == duration ) mxPlayer.next();
		else{
			// doSth() 歌词同步，进度条同步，时间同步
		}
	}
	$('#play-pause').on('click',function(){
		mxPlayer.play();
	});
	$('#next').on('click',function(){
		currentItem++;
		mxPlayer.next(currentItem);
	});
	$('#prev').on('click',function(){
		currentItem--;
		mxPlayer.next(currentItem);
	});
	$('#music-list').on('click','.music-list-item',function(){
		currentItem = $(this).index();
		mxPlayer.next(currentItem)
	});

	//--------------- 插入数据 -------------------------
	function insertList(dom,list){
		for (var i=0,len=list.length;i<len ;i++ )
		{
			/*
				var singerName = list[i].singer[0].name ;
				var singerUrl = list[i].singer[0].url ;
				var songName = list[i].songName[0].name ;
				var songNameUrl = list[i].songName[0].url ;
				var albumName = list[i].album[0].name ;
				var lyric = list[i].lyric[0].pos ;
				var poster = list[i].poster ;
				var pos = list[i].pos ;
			dom.append(
				$(dom).append('<li class="music-list-item" name="'+pos+'" data-lyricName="'+lyric+'" data-author="'+singerName+'" title="'+songName+'">'+songName+'</li>');
			)
			*/
		}
	}
	// ---------------------------- 进度条拖 ---------------------------
	function dragCircle(dom,parent,grad,callback){
		var xx,yy,XX,YY ,
			$dom = $(dom),
			$parent = $(parent),
			$grad = $(grad),
			parentWidth = $(parent).width(),
			gradWidth = $(grad).width();
		$dom.on('mousedown',function(event){
			XX = xx = event.pageX ;
			XX = yy = vent.pageY ;
		});
		$dom.on('mousemove',function(event){
			XX = event.pageX ;
			XX = event.pageY ;
			var parenWidthChange = parentWidth + XX -xx ;
			if (parenWidthChange>=0 && parenWidthChange<=gradWidth)
			{
				$parent.width(parenWidthChange)
			}else if (parenWidthChange<0)
			{
				$parent.width(0)
			}else if (parenWidthChange>gradWidth) 
			{
				$parent.width(gradWidth)
			}
			if (callback) callback();
		});
		$dom.on('mouseup',function(event){
		});
	}
	// ------------------------ 模拟滚动条 -------------------------

	function scrollbar(dom){
		var $this = $('#'+dom) ,
			$child = $this.children().eq(0);
		$this.append(
			'<div id="'+dom+'scrollbar" style="position:absolute;right:0;width:8px;height:100%;background:rgba(247,105,105,0.8);padding:0 4px;overflow:hidden;"></div>'	
		);
		var $sb = $('#'+dom+'scrollbar');
		var thisHeight , childHeight , childtopMax , childtopMin ,  bili , sbHeight , sbTopMax ,sbTopMin ;
		this.init = function(){ // 当父元素，子元素高度有变化时，可以重置滚动条
			thisHeight = $this.height() ,
			childHeight = $child.height(),
			childtopMax = 0,
			childtopMin = thisHeight - childHeight ,
			bili = thisHeight/childHeight ,
			sbHeight = thisHeight*bili ,
			sbTopMax = thisHeight - sbHeight ,
			sbTopMin = 0 ;
			$sb.height(sbHeight);
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
		}
	}