/*
* 对于一个音乐播放器来说，最核心的功能有哪些
* 	1.播放模式，单曲循环/列表/随机播放
*	2.上一首/下一首/暂停/播放
*	3.歌词同步
*	4.音量控制，进度条控制
*	5.需要一个表单，歌曲的表单 // 歌曲表单是最重要的，没有了他，其他一切便都没有意义
*	6.需要歌词 // 歌词是要注入到歌词同步机制中的，如果没有歌词，就暂时关闭歌词同步功能
*	7.其他倒不是太核心的东西
*/


var mxPlayer = (function($){
	/*--------------创建一个audio对象-----------------*/
	window.audio = document.createElement('audio');
		audio.volume = 0.5 ;
		audio.autoplay = 'true' ;

	var currentItem = 0 ,timeTagArr ,$jinduLoad = $('#jindu-load');
	var model = 0 ;
	$('#model').attr('data-model',model);

	var $jinduCurrent = $('#jindu-current') ,
		$duration = $('#duration') ,
		$currentTime = $('#currentTime') ;
	var $lyric = $('#lyric');
	var $duration = $('#duration');
	var duration ;
	return {
		run : function(){
			// 插入表单
		},
		currentItem:0 ,
		init:function(){ // 初始化
			this.next(this.currenItem);
			var _this = this ;
			window.addEventListener('resize',function(){
				_this.setLyricTop();
			});
			audio.ondurationchange = function(){
				duration = audio.duration ;
				$duration .text(_this.setTime(duration))
			};
			audio.ontimeupdate = function(){
					// 播放时间更新
				var currentTime = audio.currentTime ;
				var $lyricItemCurrent ;
				$currentTime.text(_this.setTime(currentTime));
				$jinduLoad.css({'width':audio.buffered.end(0)/duration*100+'%'});
				if( currentTime == duration ) _this.next(null,'next','auto');
				else{
					// doSth() 歌词同步，进度条同步，时间同步
					$jinduCurrent.css({'width':(audio.currentTime/duration*100)+'%'});
					for (var i=0,len=timeTagArr.length; i<len;i++ )
					{
						if (currentTime+0.9<timeTagArr[i])
						{
							$lyricItemCurrent = $lyricItem.eq(i);
							$lyricItemCurrent.addClass('lyric-item-current').siblings().removeClass('lyric-item-current');
							if(_this.lyricAuto) lyricScroll.setTop((_this.lyricTop-$lyricItemCurrent.position().top-$lyricItemCurrent[0].offsetHeight/2));
							break ;
						}
					}
				}
			}
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
		pause:function(){ 暂停
			audio.pause();
			$('#play').text('play');
		},
		next:function(index,prevNext,auto){ // 无论是上一首，下一首，当前重放，都在next属性中
			if (model === 0)
			{ 
				// 下一首
				if (typeof(index)!='number'){
					if( prevNext == 'next') this.currentItem++;
					else if( prevNext == 'prev' ) this.currentItem--;
				}else this.currentItem = index 

			}else if (model === 1)
			{
				// 随即播放
				if (typeof(index)!='number')  this.currentItem = Math.round(Math.random()*($('.music-list-item').length-1)),console.log('无需',this.currentItem) ;
				else this.currentItem = index 
			}else if (model === 2)
			{
				// 重复播放
				if (auto=='auto') this.currentItem = this.currentItem ; // 如果是自动下一首，就单曲循环
				else{  // 如果是点击【上一首，下一首】按钮
					if (typeof(index)!='number'){
						if( prevNext == 'next') this.currentItem++;
						else if( prevNext == 'prev' ) this.currentItem--;
					}else this.currentItem = index 
				}
			}

			this.currentItem = this.checkIndex(this.currentItem) ;

			/*-----------为当前播放歌曲添加状态----------------*/
			var $mliCurrent = $('.music-list-item').eq(this.currentItem);
			$mliCurrent.addClass('mli-current').siblings().removeClass('mli-current');
			/*----更换音乐文件/图片/歌词/歌手名等----*/
			audio.src = $mliCurrent.attr('data-songUrl') ;
			$('#volume-current').css({'width':audio.volume*100+'%'});
			$('#music-pic').attr({'src':$mliCurrent.attr('data-songPoster')})
			$('#music-pic-wrap').css({'background-image':'url('+$mliCurrent.attr('data-songPoster')+')'});
			audio.play();
			this.blur();
			this.getLyric($mliCurrent.attr('data-lyricName').split('/')[1]);
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
		model:['顺序','随机','loop'], // 当前的播放模式
		setModel:function(index){
			if (index>=this.model.length) index = 0;
			return index ;
		},
		lyricTop:0 ,
		lyricAuto:true ,
		setLyric:function(str){ // 对歌词字符串进行解析
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
		getLyric:function(id){
			var url = 'audio/'+id+'.lrc' ;
			$.ajax({
				url:url,
				type:'get'
			}).done(function(str){
				mxPlayer.setLyric(str);
				mxPlayer.setLyricTop();
			});
		},
		setLyricTop:function(){
			var lyricTop = $('#lyric-wrap')[0].offsetHeight/2 ;
			this.lyricTop = lyricTop ;
			$lyric.css({'padding': lyricTop + 'px 0'});
		},
		setTime:function(time){ // 返回一个  68:00 时间格式
			var time = Math.floor(time);
			var min = Math.floor(time/60);
			min = min>9?min:('0'+min);
			var sec = time%60 ;
			sec = sec>9?sec:('0'+sec);
			return min+':'+sec ;
		},
		dragCircle:function(dom,parent,grad,reset,callback){ // 进度条拖
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
			});
			var _this = this ;
			window.addEventListener('resize',function(){
				_this.reset();
			})
		},
		scrollbar:function(dom){ // 模拟滚动条
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
			var _this = this ;
			window.addEventListener('resize',function(){
				_this.resetTop();
			})
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
		},
		insertList:function(dom,list){ // 插入歌单
			var $this = $('#'+dom) ;
			var str = ''
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
				str += ('<li class="music-list-item" data-songUrl="'+songUrl+'" data-lyricName="'+lyric+'" data-songPoster="'+poster+'" data-author="'+singerName+'" title="'+songName+'">'+songName+'</li>');
			}
			$this.append(str);
		}
	}
})(jQuery);

//--------------- 插入数据 -------------------------

var List = {
	model:[] ,
	add:function(arr){
		//添加一条播放纪录
	},
	remove:function(){

	},
	like:function(){

	},
	unlike:function(){

	},
	init:function(){
		mxPlayer.insertList('music-list',listArr);
		mxPlayer.insertList('music-list',listArr);

		/*---------------------数据的获取与存储-----------------------------*/
		mxPlayer.currenItem = parseInt(localStorage['currentId'],10); // 从localStorage中获取currentId

		localStorage.setItem('isPlayerOpen','true'); // 播放器已经打开
		window.addEventListener('storage',function(e){ // 获取播放id
			if (e.key == 'currentId') 
			{
				mxPlayer.currenItem = parseInt(localStorage['currentId'],10)
				mxPlayer.next(mxPlayer.currenItem);
			}
		});

		setPlayerTime();
		function setPlayerTime(){
			var time = new Date().getTime();
			localStorage.setItem('playerTime',time);
			setInterval(function(){
				var time = new Date().getTime();
				localStorage.setItem('playerTime',time);
			},2000);
		}

		window.addEventListener('beforeunload',function(){  // 关闭页面前，在storage里面声明，播放器已经关闭
															// 这里并不是很安全，应该再加上一个时间戳，避免电脑突然死机，或者关机
			localStorage.setItem('isPlayerOpen','false');
		});
	}
}
/* 
* App run，需要先去获取音乐表单，然后播放器初始化 
* 如果，要新增一首歌曲，就需要往List中add一首歌
* 还有一种情况下，是要批量播放，需要返回一个数组，这样的话，无论如何都返回一个数组好了
* 喜欢，不喜欢和添加一首歌曲一样，都是以数组形式批量操作
*/
var App = { 
	setView:function(){
		/*-------------------------------滚动条----------------------------------------*/
		var musicScroll = new mxPlayer.scrollbar('music-list-wrap') ; // 初始化滚动条
		musicScroll.init();

		window.lyricScroll = new mxPlayer.scrollbar('lyric-wrap') ; // 初始化滚动条
		lyricScroll.init();

		/*------------------------------拖拽--------------------------------------------*/
		new mxPlayer.dragCircle('jindu-circle','jindu-current','jindu',function(){ // 进度条拖拽
			if (audio)
			{
			   $('#jinduCurrent').css({'width':audio.currentTime/audio.duration*100+'%'});
			}
		},function(width1,width2){
				audio.currentTime = width1/width2*duration ;
		});
		new mxPlayer.dragCircle('volume-circle','volume-current','volume',function(){ // 音量条拖拽
			if (audio)
			{
			   $('#volumeCurrent').css({'width':audio.volume*100+'%'});
			}
		},function(width1,width2){
				audio.volume = width1/width2 ;
		});
	},
	run:function(){ 

		List.init();
		this.setView();
		mxPlayer.init();

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
			mxPlayer.currentItem = $(this).index();
			mxPlayer.next(mxPlayer.currentItem)
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
		});
	}
};
	


	
