/*
* 对于一个音乐播放器来说，最核心的功能有哪些
* 	1.播放模式，单曲循环/列表/随机播放
*	2.上一首/下一首/暂停/播放
*	3.歌词同步
*	4.音量控制，进度条控制
*	5.需要一个表单，歌曲的表单 // 歌曲表单是最重要的，没有了他，其他一切便都没有意义
*	6.需要歌词 // 歌词是要注入到歌词同步机制中的，如果没有歌词，就暂时关闭歌词同步功能
*	7.其他倒不是太核心的东西
* -------------------------------------------------------------
* 页面间通信
*   1.表单传递id，那就播放id歌曲，如果歌曲在播放列表中已存在，重新播放，不存在就新增，滚动条滚动到结尾，把表单存储到storage里。
*	2.如果页面只是刷新一下：播放表单歌曲
*
*/


var mxPlayer = (function($){
	/*--------------创建一个audio对象-----------------*/
	window.audio = document.createElement('audio');
		audio.volume = 0.5 ;
		audio.autoplay = 'true' ;

	var currentItem = 0 ,timeTagArr ,$jinduLoad = $('#jindu-load');

	var $jinduCurrent = $('#jindu-current') , // 进度条
		$duration = $('#duration') , // 总时间
		$currentTime = $('#currentTime'), // 当前时间
		$lyric = $('#lyric');
	var duration ; // audio的时长
	return {
		currentItem:0 ,
		setCurrentId : function(id){ // 这里需要依赖List
			var arr = List.model ;
			var had = false ;
			for(var len=arr.length ,i=0; i<len; i++ ){
				if( arr[i].id == id ){
					had = !had ;
					break ;
				}
			};
			// console.warn('had:',had,arr)
			if (had) {
				this.currentItem = i ;
			} else{
				List.add( List.get(id) );
				this.currentItem = List.model.length-1 ;
				// console.warn(this.currentItem)
			};
			this.next(this.currentItem,'next');
		},
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
				if(!this.src) return ;
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
							if(_this.lyricAuto) lyricScroll.setTop({childTop:true,top:(_this.lyricTop-$lyricItemCurrent.position().top-$lyricItemCurrent[0].offsetHeight/2)});
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
				audio.pause();
				$('#play').text('play');
			}
		},
		next:function(index,prevNext,auto){ // 无论是上一首，下一首，当前重放，都在next属性中
			switch(this.model){
				case 0 : // 下一首
					if (typeof(index)!='number'){
						if( prevNext == 'next') this.currentItem++;
						else if( prevNext == 'prev' ) this.currentItem--;
					}else this.currentItem = index 
					break;

				case 1 : // 随机播放
					if (typeof(index)!='number')  
						this.currentItem = Math.round(Math.random()*($('.music-list-item').length-1));
					else this.currentItem = index ;
					break ;

				case 2 : // 单曲循环
					if (auto=='auto') this.currentItem = this.currentItem ; // 如果是自动下一首，就单曲循环
					else{  // 如果是点击【上一首，下一首】按钮
						if (typeof(index)!='number'){
							if( prevNext == 'next') this.currentItem++;
							else if( prevNext == 'prev' ) this.currentItem--;
						}else this.currentItem = index 
					}
					break;
			}
			// console.log(typeof(this.currentItem),this.currentItem)
			this.currentItem = this.checkIndex(this.currentItem) ;
			storage.setCurrentId(List.model[this.currentItem].id);

			/*-----------为当前播放歌曲添加状态----------------*/
			var $mliCurrent = $('.music-list-item').eq(this.currentItem);
			$mliCurrent.addClass('mli-current').siblings().removeClass('mli-current');

			/*----更换音乐文件/图片/歌词/歌手名等----*/
			// console.log($mliCurrent[0])
			if($mliCurrent[0]){
				audio.src = $mliCurrent.attr('data-songUrl') ;
				$('#volume-current').css({'width':audio.volume*100+'%'});
				$('#music-pic').attr({'src':$mliCurrent.attr('data-songPoster')})
				$('#music-pic-wrap').css({'background-image':'url('+$mliCurrent.attr('data-songPoster')+')'});
				this.play();
				this.blur();
				this.getLyric($mliCurrent.attr('data-lyricName').split('/')[1]);
			}else{
				audio.src = '';
			}
			
		},
		checkIndex:function(index){ // 对currentItem进行校验
			var len = List.model.length ;
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
				$('.music-player-box')[0].style.background = "none" ;
				$('#music-pic,#music-bgd').attr({'width':$(window).width(),'height':$(window).height()});
				stackBlurImage( "music-pic", "music-bgd", 20, false );
			}
		},
		model:0, // 当前的播放模式
		modelArr:['顺序','随机','循环'],
		setModel:function(index){
			if (index>=this.modelArr.length || index<0) index = 0;
			this.model = index ;
		},
		lyricTop:0 ,
		lyricAuto:true ,
		setLyric:function(str){ // 对歌词字符串进行解析
			$lyric.empty().css({'top':0}); //清空原有歌词，top回0
			var contentArr = str.split(/\[[^\]]+\]/g); //获取所有歌词
			var timeArr = str.match(/\[[^\]]+\]/g) ; // 获取时间
			var str = '' ;
			contentArr.forEach(function(element){
				str += ('<p>'+element+'</p>'); 
			});
			$lyric.append(str);
			lyricScroll.reset(); // 重置歌词区滚动条
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
				mxPlayer.setLyricTop();
				mxPlayer.setLyric(str);
			});
		},
		setLyricTop:function(){ // 设置歌词滚动区的padding
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
				// console.log(parentWidth)
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
				gradWidth = $grad.width();
				_this.reset($parent.width(),$grad.width());
			})
		},
		scrollbar:function(dom){ // 模拟滚动条
			/*
				文本内容，以当前滚动条所处位置为准，当创建偶大小发生变化后
				文本内容的宽高发生变，父元素的宽高变化
			*/
			var $this = $('#'+dom) ,
				$child = $this.children().eq(0);
			$this.append(
				'<div id="'+dom+'scrollbar" style="position:absolute;right:0;width:5px;height:0;background:rgba(247,105,105,0.2);border-radius:4px;overflow:hidden;"></div>'	
			);
			var $sb = $('#'+dom+'scrollbar');
			var thisHeight , childHeight , childtopMax , childtopMin ,  bili ,biliTop , sbHeight , sbTopMax ,sbTopMin ,sbTopCurrent;
			sbTopCurrent = 0 ;
			this.init = function(){ // 当父元素，子元素高度有变化时，可以重置滚动条
				thisHeight = $this.height() ,
				childHeight = $child[0].offsetHeight,
				childtopMax = 0,
				childtopMin = thisHeight - childHeight ,
				bili = thisHeight/childHeight ,
				sbHeight = thisHeight*bili ,
				sbTopCurrent = (thisHeight-sbHeight)*sbTopCurrent/sbTopMax ,
				sbTopMax = thisHeight - sbHeight ,
				sbTopMin = 0 ;
				biliTop = -sbTopMax/childtopMin ;
				(sbHeight < thisHeight) ? $sb.height(sbHeight) : ($sb.height(0),sbTopCurrent=0) ; // 如果滚动条的高度大于父元素的高度，隐藏滚动条，top值为0

				this.setTop({sbTop:true,top:sbTopCurrent});
			}
			this.reset = function(){
				sbTopCurrent = 0 ;
				this.init();
			}
			this.setTop = function(arg){
				if (arg.childTop )
				{
					$child.css({'top':arg.top});
					sbTopCurrent = -arg.top*biliTop
					$sb.css({'top':sbTopCurrent});
					return ;
				}
				if(arg.sbTop ){ 
					$sb.css({'top':arg.top});
					$child.css({'top':(isNaN(-arg.top/biliTop)?0:-arg.top/biliTop)});
					return ;
				}
			}
			var _this = this ;
			window.addEventListener('resize',function(){
				_this.init();
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
				_this.setTop({childTop:true,top:childTop});
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
						_this.setTop({sbTop:true,top:sbTop});
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
			var str = '' ;
			$this.empty();
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
				str += ('<li class="music-list-item" data-songUrl="'+songUrl+
							'" data-lyricName="'+lyric+
							'" data-songPoster="'+poster+
							'" data-author="'+singerName+
							'" title="'+songName+'">'+songName+'<div class="music-li-delete" title="删除"></div>'+
						'</li>');
			}
			$this.append(str);
		}
	}
})(jQuery);

/*---------------------数据的获取与存储-----------------------------*/
var storage = {
	getCurrentId : function(){
		var id = parseInt(localStorage['currentId'],10)>= 1 ? parseInt(localStorage['currentId'],10): 1 ;
		return id ;
	} , // 从localStorage中获取currentId
	setCurrentId : function(id){
		localStorage.setItem('currentId',id);
	},
	setPlayerTime : function(){
		var time = new Date().getTime();
		localStorage.setItem('playerTime',time);
	},
	init : function(){
		mxPlayer.currentItem = 0 ;
		mxPlayer.currentId = this.getCurrentId() ; // 当前播放
		localStorage.setItem('isPlayerOpen','true'); // 播放器已经打开
		setInterval(this.setPlayerTime,4000); // 每隔四秒，把时间存储一下，主要是为了避免电脑立马断电的情况
		window.addEventListener('beforeunload',function(){  // 关闭页面前，在storage里面声明，播放器已经关闭
															// 这里并不是很安全，应该再加上一个时间戳，避免电脑突然死机，或者关机
			localStorage.setItem('isPlayerOpen','false');
		});
		window.addEventListener('storage',function(e){ // 监听localstorage的变化，以播放选中歌曲
			if (e.key == 'currentId') 
			{
				// console.info( '歌曲id:',storage.getCurrentId() )
				mxPlayer.setCurrentId( storage.getCurrentId() );
			}
		});
	}
}

//--------------- 插入数据 -------------------------

var List = {
	model:[] ,
	add:function(arr){
		//添加一条播放纪录
		this.model = this.model.concat(arr);
		this.render();
	},
	remove:function(index){
		// 一方面需要移除这一个条目，另一方面，如果是当前播放条目，要更换播放歌曲【下一首为准】
		// index>currentItem currentItem不需要改变
		// index<currentItem currentItem需要减一
		// index=currentItem 移除当前播放条目，切换到下一曲
		this.model.splice(index,1);
		var current = mxPlayer.currentItem ;
		if(index==current){
			mxPlayer.currentItem-- ;
			mxPlayer.next(mxPlayer.currentItem,'next');
		}else if(index>current){
			mxPlayer.currentItem++ ;
		}else{
			mxPlayer.currentItem-- ;
		}
	},
	like:function(){

	},
	unlike:function(){

	},
	render:function(){
		mxPlayer.insertList('music-list',this.model);
	},
	get:function(id){ // 动态获取歌曲信息
		return listArr.filter(function(ele){
			if(ele.id==id) return ele
		});
	},
	init:function(){
		this.add( this.get(mxPlayer.currentId) );
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
		var jindutiao = new mxPlayer.dragCircle('jindu-circle','jindu-current','jindu',function(){ // 进度条拖拽
			if (audio)
			{
			   $('#jinduCurrent').css({'width':audio.currentTime/audio.duration*100+'%'});
			}
		},function(width1,width2){
			if(!(audio.src.length>0)) return ;
			audio.currentTime = width1/width2*audio.duration ;
		});
		var yinliang = new mxPlayer.dragCircle('volume-circle','volume-current','volume',function(){ // 音量条拖拽
			if (audio)
			{
			   $('#volume-current').css({'width':audio.volume*100+'%'});
			}
		},function(width1,width2){
			if(!(audio.src.length>0)) return ;
				audio.volume = width1/width2 ;
		});
	},
	domEvent:function(){
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
			mxPlayer.model++
			mxPlayer.setModel(mxPlayer.model);
			$(this).text(mxPlayer.modelArr[mxPlayer.model]);
		});
		$('#music-list').on('dblclick','.music-list-item',function(){
			mxPlayer.currentItem = $(this).index();
			mxPlayer.next(mxPlayer.currentItem)
		});
		$('#music-list').on('click','.music-li-delete',function(){
			var index = $(this).parent().index() ;
			$(this).parent().remove();
			List.remove(index);
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
	},
	run:function(){ 
		storage.init(); // localStorage 主要是保存了当前播放歌曲id，以及和另外一个页面通信
		List.init();	// 获取音乐表单
		this.setView(); // 设置了自定义滚动条，以及拖拽进度条，音量条
		mxPlayer.init(); // 播放器初始化
		this.domEvent(); // 各种点击事件
	}
};
	


	
