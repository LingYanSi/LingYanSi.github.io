/*
* 我的播放器，类似于虾米播放器
*/

var musicScroll = new scrollbar('music-list-wrap') ; // 初始化滚动条
musicScroll.init();

var lyricScroll = new scrollbar('lyric-wrap') ; // 初始化滚动条
lyricScroll.init();

var dragJdt = new dragCircle('jindu-circle','jindu-current','jindu',function(){ // 进度条拖拽
	if (audio)
	{
	   $('#jinduCurrent').css({'width':audio.currentTime/audio.duration*100+'%'});
	}
},function(width1,width2){
		audio.currentTime = width1/width2*duration ;
});
var dragJdt1 = new dragCircle('volume-circle','volume-current','volume',function(){ // 音量条拖拽
	if (audio)
	{
	   $('#volumeCurrent').css({'width':audio.volume*100+'%'});
	}
},function(width1,width2){
		audio.volume = width1/width2 ;
});

insertList('music-list',listArr);
insertList('music-list',listArr);
musicScroll.init();

currenItem = parseInt(localStorage['currentId'],10); // 从localStorage中获取currentId
mxPlayer.next(currenItem);
musicScroll.resetTop();
lyricScroll.resetTop();

window.onresize = function(){
	musicScroll.resetTop();
	lyricScroll.resetTop();
	mxPlayer.setLyricTop();
	dragJdt.reset();
	dragJdt1.reset();
}

localStorage.setItem('isPlayerOpen','true'); // 播放器已经打开
window.addEventListener('storage',function(e){ // 获取播放id
	if (e.key == 'currentId') 
	{
		currenItem = parseInt(localStorage['currentId'],10)
		console.log(currenItem,typeof(currenItem))
		mxPlayer.next(currenItem);
	}
});
setPlayerTime();
function setPlayerTime(){
	var time = new Date().getTime();
	localStorage.setItem('playerTime',time);
	setInterval(function(){
		var time = new Date().getTime();
		localStorage.setItem('playerTime',time);
	},2000)
}

window.addEventListener('beforeunload',function(){  // 关闭页面前，在storage里面声明，播放器已经关闭
													// 这里并不是很安全，应该再加上一个时间戳，避免电脑突然死机，或者关机
	localStorage.setItem('isPlayerOpen','false');
})