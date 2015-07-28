
1.识别app
	需要设置webview的UA标识，然后通过 navigator.userAgent 获取UA信息

2.点击 fastclick
	因为移动端的touch事件的原因
	touchend的优先级要高于click，因此click事件会有300ms的延迟
	一个简单的处理办法就是
		$.fn.tap = function(fun){
			var move = false ;
			this.addEventListener('touchmove',function(){
				move = true ;
			});
			this.addEventListener('touchend',function(){
				move = false ;
				fun.call(this);
			});
		}
	但是还是建议使用 fastclick等js库

3.有些设备出现的莫名情况，比如app内，js执行异常
	今天就遇到这样的情况，主要是因为，Android端的webview的一些js特性没有开启，因此要做好和不同设备开发人员的沟通

4.点击隐藏当前元素后，可能会误点击到其他元素
	这个坑主要在侧边栏相关的功能上面

5.overfllow:scroll;
	如果要实现一个自由的滑动，比如说网页新闻的顶部栏，有几种方案
	1.自己手写一个
	2.使用iscroll
	3.使用 overflow: auto; -webkit-overflow-scrolling: touch; 支持Android4.0以上
	我靠，从来都不管 WindowsPhone 啊

6.字体大小
	一般而言，网页默认的字体大小是16px，如果是移动端，这样显然是不太合适的，最好在body上声明一下 font-size:14px; 小一点好

7.排版布局 box与flex
	css弹性布局标准目前有三个版本
	2009年：box，android/ios支持-webkit-box
	xxxx年：flex-box 过渡版本，基本没有人使用
	2012年：flex，老版本Android/ios 支持-webkit-flex,新版本一直吃flex

	所以建议使用 -webkit-box加上flex混合模式，但是很蛋疼有没有

8.