	
	在css选择器的优先级

	如果已经把.polaris下面span内的字体设置成红色：

	.polaris span {color:red;} 
	这时，如果要改变.beijixing的颜色为蓝色，用下面的命令是不能实现的：

	.beijixing {color:blue;} 
	出现这种情况就是因为后一个命令的优先级不够，两条相互冲突的样式设置，浏览器只会执行优先级较高的那个。

	一般而言，选择器越特殊，它的优先级越高。也就是选择器指向的越准确，它的优先级就越高。
	通常我们用1表示标签名选择器的优先级，用10表示类选择器的优先级，用100标示ID选择器的优先级。
	比如上例当中 .polaris span {color:red;}的选择器优先级是 10 + 1 也就是11；而 .polaris 的优先级是10；浏览器自然会显示红色的字。
	理解了这个道理之后下面的优先级计算自是易如反掌：

	div.test1 .span var 优先级 1+10 +10 +1  
	span#xxx .songs li 优先级1+100 + 10 + 1  
	#xxx li 优先级 100 +1 

	本文来源：http://developer.51cto.com/art/201009/226852.htm

	//优先级依次增强
	通用选择器（*）
	元素(类型)选择器
	类选择器
	属性选择器
	伪类
	ID 选择器
	内联样式

	https://developer.mozilla.org/zh-CN/docs/Web/CSS/Specificity
	
	-------------------------------------------------------------------------------

	行内元素
	<p>
		<div></div>
		<div></div>
	</p>
	document.querySelector('p').childNodes.length
	length = 0
	 因为根据w3c的规范，p内不可以包含其它块级元素
	 否则浏览器符将上面的代码解析成
	 <p></p>
	 <div></div>
	 <div></div>
	 <p></p>

	-------------------------------------------------------------------------------

	css媒体查询

	媒体查询 包含了一个媒体类型和至少一个使用如宽度、高度和颜色等媒体属性来限制样式表范围的表达式。CSS3加入的媒体查询使得无需修改内容便可以使样式应用于某些特定的设备范围。
	//<!-- link元素中的CSS媒体查询 -->
	<link rel="stylesheet" media="(max-width: 800px)" href="example.css" />

	//<!-- 样式表中的CSS媒体查询 -->
	<style>
	@media (max-width: 600px) { //宽度小于600px的设备
	  .facet_sidebar {
		display: none;
	  }
	}
	@media screen and (min-width: 500px) and (max-width: 800px) { //宽度在500到800之间的设备
	
	}
	@media(orientation:landscape|portrait){ // 不同模式下的【竖屏portrait】【横屏landscape】
		body{background:red;}
	 }
	</style>

	----------------------------------------------------------------------------------------

	device倾斜
	
	window.addEventListener('deviceorientation',function(event){
		console.log(event)
		$('#alpha').text('水平旋转角度'+event.alpha); //  0 to 360
		$('#beta').text('Y轴旋转'+event.beta); //  -180 to 180
		Math.abs(event.gamma)>45 ? $('#abs').text(' 屏幕横置'+ event.gamma) : $('#abs').text('屏幕竖直' + event.gamma) ; //  -90 to 90
	});
	window.addEventListener('devicemotion',function(event){
		//$('#rock').text('摇一摇'+event.accelerationIncludingGravity.z)
	})

	--------------------------------------------------------------------------------------

	pointer-events 【none/auto】 

	noen :除了指定元素不成为鼠标事件的目标，none值还指示鼠标事件穿过该元素，并指向位于元素下面的元素。

	兼容性: ie11、其他正常使用

	--------------------------------------------------------------------------------------

	flex 和 box
	在W3C没有规定flex规法前，各厂商实现了私有的类flex的box，也就是弹性布局
	区别如下
		.div{ display:flex; display:-webkit-box; }
		.item{ flex:1; -webkit-box-flex:1; }
		
	* 坑1：虽说can i use 上说android4.4就全面支持flex了
	* 	   但是我测试一下，魅族3就他妈不支持，￣□￣｜｜，于是乎就使用display:-webkit-box;
	*	   这里出现了诡异一幕，使用-webkit-box-flex的时候，他们并没有按比例把宽度固定下来，而是走一个比较随意的风格
	*	   百度得知给元素加上width:0%;后就可以了，这是什么bug 

	-------------------------------------------------------------------------------------
	
	遇到的奇怪问题
	var demo =document.querySelector('.demo');
	    demo.style.left = '200px' ; // 1
	    demo.style.background = 'pink' ; // 2
	    demo.classList.add('change') ; // 3
	demo的属性挥发生渐变，但是代码明明是先改变了指，后添加的【change】啊

	Reflow 和 Repaint

	这个和浏览器渲染优化有关，你去执行js代码，等到下一帧的时候才回去真正做一次绘制，
	解决这个你可以在指定完style之后，强制一次reflow，例如可以 ele.offsetWidth = ele.offsetWidth

	浏览器reflow要比repaint消耗性能
	首先，Repaint是指页面上的元素的外观发生了改变但是不影响布局的情况下引起的浏览器重新绘画元素外观的行为，
	比如修改color，background-color等属性。Reflow是指页面上的元素的大小布局发生的变化从而引起浏览器对页面其他元素位置大小进行重新计算并且布局的行为。
	Reflow所导致的性能消耗远比Repaint大，所以我们下面重点讨论Reflow情况下的优化策略。
	在讨论Reflow之前先简单的看一下浏览器加载页面的过程。

	浏览器在收到HTML文档之后对其进行解析，解析过程分为两个部分DOM文档的解析和CSS样式的解析。
	解析DOM文档生成一个DOM树，DOM树和解析出来的CSS样式组合生成一个渲染树，最后浏览器根据这个渲染树进行页面的排版和绘画。而最后这一步就是会涉及到Reflow和Repaint。
	以下这几个行为会引起页面的Reflow或Repaint：
	1. 添加，删除，更新DOM节点
	2. 隐藏/显示DOM节点(display:none或visibility:hidden)
	3. 修改样式
	4. 改变窗口大小，滚动页面

	其实浏览器在这方面已经帮我们做了一些优化了，对于每个触发Reflow的行为浏览器并不会马上就触发，
	而是把它们保存在一个队列中，当到达一定数量的时候再进行批量的Reflow，这样就不需要每次都进行Reflow。
	但是，我们的一些行为会影响到浏览器的优化，使得Reflow马上触发。当我们请求下面这些属性的时候发生这种现象：
	1. offsetTop, offsetLeft, offsetWidth, offsetHeight
	2. scrollTop/Left/Width/Height
	3. clientTop/Left/Width/Height
	4. getComputedStyle(), or currentStyle(IE)

	每当我们请求这些属性时，浏览器为了返回实时的情况就必须马上进行Reflow以计算出我们所需要的属性。所以我们应该尽量少的使用这些属性。
	从上面可以发现，基于所有DOM操作都会引起Reflow或Repaint，所以尽可能避免页面的Reflow或Repaint可以很好的提高DOM性能。那么该怎么做才能最好的避免或最小化Reflow呢？下面有几个有用的建议：
	1.不要逐一修改样式，而改为通过修改className来批量改变样式，如果样式需要动态计算，那么也要使用cssText属性来批量添加样式。例如：

	// 错误的做法
	var left = 10,
		top = 10;
	el.style.left = left + "px";
	el.style.top  = top  + "px";

	// 使用修改className来进行优化
	el.className += " theclassname";

	// 如果需要动态修改css，那么就使用cssText
	el.style.cssText += "; left: " + left + "px; top: " + top + "px;";
	2.批量处理DOM操作并且让元素脱离文档流，等操作结束后再放回文档流中。有以下几种办法：

	使用display：none隐藏element，然后进行操作，最后再显示出来
	使用documentFragment ，把新增的节点放在documentFragment中，最后再把documentFragment放到DOM中，因为把documentFragment放到DOM中，它只会把它的孩子节点放到DOM中，就好像documentFragment不存在。
	通过cloneNode复制节点，然后离线进行操作，最后再替换DOM中的节点。
	3.尽量少的访问会引起马上Reflow的属性，使用局部变量来缓存这些属性，比如：

	var left = el.offsetLeft,
		top  = el.offsetTop
		esty = el.style;
	for(big; loop; here) {
		left += 10;
		top  += 10;
		esty.left = left + "px";
		esty.top  = top  + "px";
	}
	4.对于需要动画的元素，尽量让它脱离文档流，这样就能尽量引起尽量小的Reflow

	5.尽量少使用table布局

	------------------------------------------------------------------------------------

	cssText

	一般情况下使用js去修改css
	dom.style.height = '100px';
	dom.style.width = '500px';
	这样写不仅麻烦，而且还会引起浏览器的reflow或者repaint，消耗性能
	可以这样写 dom.style.cssText = 'height:100px;width:100px;'
	但是上面的写法会导致，覆盖以前的style[指的是通过js添加的style/dom的style属性中包含的样式]
	因此应该这样写 dom.style.cssText +=';height:100px;width:100px;' ;// 加‘;’是为了避免前一个属性没有以分号结尾。

	--------------------------------------------------------------------------------------

	box-sizing:border-box;padding:10px;width:100%;

	如果没有用css设置height，而是用js设置，那么div的高度为height+padding，也就是说此时border-box对height方向的padding已不再有约束力

	js是无法获取到【:before】之类的为元素的
	jquery 提供的伪类选择器都是针对html元素的，而 css 中 :after 和 :before 这些是伪元素，jquery 中并不能获取这些伪元素。

	//伪类是一个真实 HTML 元素上的一个特殊的状态。可以认为是浏览器在特定条件下将一个虚拟的类自动应用于某个元素。

	//伪元素是 HTML 文档的一部分，尽管它不是真实的 HTML 元素，但是 CSS 允许你为它设置样式。就像是虚拟的 HTML 元素——尽管它没有真实的 HTML 标签，但你仍可以为其添加样式。

    -----------------------------------------------------------------------------------

	line-height
	接收四种值 normal、2、2em、200%
	其中2em和200%等同表示line-height为其font-size的2倍，因为line-height会自动继承父类，也就是说他的子元素的line-height会被固定下来，如果子元素中的font-size是父元素的4倍，就会导致文字显示不全
	数值2表示line-height/font-size = 2 ，他就不会上面的情况

	<div style="font-size:16px;line-height:2em;">
		好时代发生的发更何况是发给克己奉公
		<p style="font-size:50px;overflow:hidden;">你们的身份根深蒂固首付大概是否更换束带结发</p> //此行文本居中，部分被隐藏
	</div>
	
    -----------------------------------------------------------------------------------

	文字竖排 writing-mode

	Firefox不支持
	webkit内核支持 -webkit-writing-mode: vertical-lr / vertical-rl ; // vertical-lr 表示从上到下，从右至左排列  vertical-rl 表示从上到下，从左至右排列  
																	// horizontal-tb 表示从左至右，从上到下排列 horizontal-bt 表示从左至右，从下到上排列
	ie6-10 支持 writing-mode: tb-lr / bt-lr ; // tb-lr 表示从上到下，从右至左排列  bt-lr 表示从下到上，从左至右排列 
												// lr-tb 表示从左至右，从上到下排列  rl-tb 表示从右至左，从上到下排列 
	ie11 支持标准

	---------------------------------------------------------------------------------
	
	图片自适应

	图片会按自身比例比例自适应
	{max-width:100%;max-height:100%;height:auto;width:auto;margin:0 auto;display:block;}

	----------------------------------------------------------------------------------------

	z-index

	其实也就是文档的布局的z轴布局
	z-index: relative/absolute/fixed/inherit/static
	relative：元素遵循正常的文档流，所以周围元素不会忽略它的存在，relative 元素同样支持 top,bottom,left,right 等属性。
				relative 元素使用定位属性进行相对定位时，它会被周围的元素忽略。也就是说周围元素会假装认为relative没有位移。
	absolute:元素将会脱离正常的文档流，所以 其周围的元素将会忽略它的存在。
				这个绝对定位需要稍微理解下，因为这里容易与 relative 产生混淆。
				例如，当对 absolute 元素添加 left:10px 定位后，这个 left 究竟是对哪个元素而言呢？
				其实，此时将会往上查找 absolute 元素的第一个父元素，如果该父元素的 position 值存在（且不为 static）,那么这个 left:10px 就是根据该父元素进行的定位，
				否则将会继续查找该父元素的父元素，一直追溯到某个父元素具备不为 static 的 position 值为止，如果不存在满足条件的父元素，则会根据最外层的 window 进行定位。
	fixed:fixed 元素定位与它的父元素无任何关系，它永远是相对最外层的 window 进行定位的。

	关于z-index属性, 上下的层次关系也是按照树状结构进行层次划分的, 优先父元素之间的分集, 子元素这层次排序依赖于父元素的层次.

	例如:
	某A元素z-index:1; 其父元素z-index:100,
	某B元素z-index:100; 其父元素z-index:99,
	某C元素z-index:2; 其父元素与A相同

	则浏览器之中A元素的显示层次一定优高于B元素; C显示的层次高于A元素;

	-----------------------------------------------------------------------------------------

	获取当前css样式

	window.getComputedStyle(element,null).getPropertyValue('height'); 

	element.style.height //只会返回dom树中style属性内定义的样式，对于引用的css文件定义的样式是获取不到的

	--------------------------------------------------------------------------------------------

	window 宽高

	window.innerHeight / window.innerWidth // 文档显示区的宽高，不包括状态栏、菜单栏等

	window.outerHeight / window.outerWidth // 整个浏览器的宽高

	window.screen.availHeight / window.screen.avialWidth // 除了任务栏的宽高

	window.screen.height / window.screen.width // 显示器的高宽

	------------------------------------------------------------------------------------------------

	正则运算

	正则匹配中文
		/^[\u4e00-\u9fa5]+$/.test('你是谁啊a') 

	在js unicode编码 中，中文编码是范围【u4e00-u9fa5】
	('你大爷').charCodeAt(0) // 返回在指定的位置的字符的 Unicode 编码。
	
	\w	匹配包括下划线的任何单词字符。等价于'[A-Za-z0-9_]'
	\d 任何数字，等价于'[0-9]'
	/\w{6,18}/.test('nidaye12') // 匹配密码
	/^1[\d]{10}$/.test('18668055229') // 匹配手机号

	这里介绍得挺详细 → http://segmentfault.com/a/1190000000699097
					 → http://www.css119.com/book/RegExp/

	----------------------------------------------------------------------------------

	js获取高度:

	obj.style.width(height);//除非在css中设置了width，才能获取到

	element.offsetWidth(offsetHeight); //offsetWidth得到的是width值+padding值+border值

	element.clientWidth(clientHeight); //clientWidth 得到的是width值+padding值

	element.scrollHeight // 获取滚动条高度，其最小值为 window.innerHeight

	getComputedStyle 与 currentStyle; //getComputedStyle 与 currentStyle是处理兼容性的两个方法，获取到的值都是图片在屏幕上显示的仅仅图片的高宽值，不会获取到img标签的padding及border值；但其中getComputedStyle适用于Firefox/IE9/Safari/Chrome/Opera浏览器，currentStyle适用于IE6/7/8。但是如果img标签即使没有设置style属性也没有引入样式表，那么只有getComputedStyle能获取到值，即为图片本身高宽值，currentStyle则返回auto。

	obj.naturalWidth(naturalHeight); //这是HTML5里新添加的一个获取元素高宽的方法，但只适用于Firefox/IE9/Safari/Chrome/Opera浏览器。

	注意: 如果一个图片没有加载完毕，是无法获取到他的高度的！

	获取document【网页】高度
	单纯的document.offsetWidth或者其他是获取不到的
	如果想获取可以通过 document.documentElement / document.body 来获取

	document 并不是一个element对象， document.documentElement 返回的是一个文档的【root element】 一半是指 <html></html>

	--------------------------------------------------------------------------------------------
	placeholder样式设定
	[placeholder] { font-family: 'Microsoft yahei'; } //字体
	::-moz-placeholder {
		color: mediumvioletred; //颜色值
		text-indent: 5px; /* 没有用 */
		opacity: 1!important; //透明度？
	}
	:-ms-input-placeholder {
		color: mediumvioletred;
		text-indent: 5px;
	}
	::-webkit-input-placeholder {
		color: mediumvioletred;
		text-indent: 5px; //顾名思义，placeholder的缩进
	}

	-----------------------------------------------------------------------------------------------

	css文本溢出后，显示省略号
	{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;height:100px;width:100px;} /* 高度是必需的 */

	overflow:hidden;;/* 内容超出宽度时隐藏超出部分的内容 */
	text-overflow:ellipsis;;/* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
	white-space:nowrap;/* 不换行 */

	上面的只适用于但行文本
	多行文本用下方法

	overflow:hidden; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient: vertical; text-overflow: ellipsis;
	-webkit-line-clamp:2;数字表示行数

	-----------------------------------------------------------------------------------------------

	删除对象属性
	bitch = new Object();
	bitch.name = 'nihao';

	现在我想删除bitch的name属性，就用delete方法
	delete bitch.name
	console.log(typeof(bitch.name)) //输出undefined

	直接用delelte删除不了变量
    删除不了原型链中的变量

	创建一个对象 可以用【new Object()】
	也可以用函数构造一个 
	
		function bitch(){
			console.log(arguments.length)//输出函数形参个数
			this.name = "nihao";
			this.log = function (str){
				console.log(str);
				//console.log(arguments.length)
			}
		}
		var bitch1 = new bitch(1,2,3); //arguments.length = 3
		var allProperty = Object.getOwnPropertyNames(bitch1);//获取对象所有属性【可枚举，不可枚举】，以数组形式返回 不可枚举指的是内建对象的属性
															//我们能创建的对象，都是内建对象的一个引用（的引用（的引用。。。）），都是可以枚举的……
		var keys = Object.keys(bitch1) ; //获取对象可枚举的属性，以数组形式返回
										//数组中属性名的排列顺序和使用for-in循环遍历该对象时返回的顺序一致（两者的主要区别是 for-in 还会遍历出一个对象从其原型链上继承到的可枚举属性）。
		Object.freeze(object) // 方法可以冻结一个对象。冻结对象是指那些不能添加新的属性，不能修改已有属性的值，不能删除已有属性，以及不能修改已有属性的可枚举性、可配置性、可写性的对象。
								//也就是说，这个对象永远是不可变的。该方法返回被冻结的对象。
		Object.isFreeze(object) // 判断对象是否冻结

		bitch1.log(bitch1.name); 
		bitch1.log(allProperty); 
		bitch1.log(keys);

		var ni = new String();
		console.log(ni.hasOwnProperty('length')); //新建的string对象拥有自己的length属性
		console.log(ni.hasOwnProperty('substring')); //新建的string不拥有substring属性
		console.log(String.prototype.hasOwnProperty('substring')); //string原型拥有substring属性

		var input = document.createElement('input');//用js创建一个dom对象
		console.log('type' in input);
		console.log(input.hasOwnProperty('placeholder'));

		Object.defineProperties//有时间再msdn上看一看，主要是用于对象属性的更改 
		//getOwnPropertyNames,keys是ECMAScript5新增

		判断对象是否拥有一个属性
		两种方法： object.hasOwnProperty(proName) 或者 proName in object //proName为字符串
		如果含有该属性，返回true，否则返回false

		//设置一个不可被更改的属性
	--------------------------------------------------------------------------
	
	数组Array

	直接在末端添加元素,并返回素组更新后的长度 array.push()
	直接在首端添加元素,并返回素组更新后的长度 array.unshift()
	array[index] = bula

	array.slice(start,end) 返回一个子数组end【可选,如果没有则一直到结尾处】，不包含【end】
	array.splice(index,howmany,item1,item2····) 从index开始删除元素，howmany表示要删除多少个元素【可为0】，item表示插入再index位置的元素

	array.join('分隔符')	把数组的所有元素放入一个字符串。元素通过指定的分隔符进行分隔。
	array.concat(array1/item1) 连接【数组/具体的值】

	array.reverse() 反转数组

	eg: array = [0,1,2];
		array.splice(1,0,'a','b','c');
		console.log(array);//输出[0,'a','b','c',1,2]
		array[10]=1;
		console.log(array.length);//输出为11，也就是说此时数组被拉长，array[7]=undefined
		array.pop();// pop() 方法将删除 arrayObject 的最后一个元素，把数组长度减 1，并且返回它删除的元素的值。如果数组已经为空，则 pop() 不改变数组，并返回 undefined 值。
		array.shift();// shift() 方法将删除 arrayObject 的第一个元素，把数组长度减 1，并且返回它删除的元素的值。如果数组已经为空，则 pop() 不改变数组，并返回 undefined 值。
		array.join('-----');//如果没有参数，默认逗号分隔元素
		array.toString();//元素间以逗号分隔

		array.sort() //如果没有回调函数，会对数组进行【万国码排序？】
					// eg:[1,0,5,21] 结果[0,1,21,5]
			对数组按大小排序
				array.sort(function(a,b){
					return a-b
				})
			随机排序
				array.sort(function(a,b){
					return Math.random()>.5 ? -1 : 1; 
				})
	ecmascript5
		array.filter(function(element){ //按条件对元素进行过滤，返回一个新数组
			return true/false
		});
		array.map(function(element,index,array){
			//map() 方法返回一个由原数组中的每个元素调用一个指定方法后的返回值组成的新数组。
			//callback 函数会被自动传入三个参数：数组元素，元素索引，原数组本身
			return sth ;
		})
		array.forEach(function(element,index,array){
			//forEach() 方法让数组的每一项都执行一次给定的函数。
		})

   --------------------------------------------------------------------------
   max-width\max-height /min-height/min-width 非css3啊，我去你大爷的
   max-width和max-width联合使用

   background-size,background-clip,background-orign属于css新增属性

   块级元素margin问题
   <div id="parent" class="" style="">
		<div id="child" class="" style="margin:50px 0;height:50px;background:pink;width:100%;"></div>
		<div id="child2" class="" style="margin:50px 0;height:50px;background:pink;width:100%;"></div>
		<div id="child3" class="" style="margin:40px 0;height:50px;background:pink;width:100%;"></div>
		<div id="child4" class="" style="margin:150px 0;height:50px;background:pink;width:100%;"></div>
	</div>
	发现【child】的margin-top,margin-bottom冒泡到【parent】，但是console.log一下parent的margin-top为0px//解决方法是为父级元素添加【padding:1px/border:1px】可解决，但是对于没有padding/border的父级元素呢、可以通过float或者position:absolute解决
	【child】和【child2】间的margin不是50+50=100 ,依然是50px


	在这个说明中，“collapsing margins”（折叠margin）的意思是：2个或以上盒模型之间（关系可以是相邻或嵌套）相邻的margin属性（这之间不能有非空内容、padding区域、border边框
	或使用清除分离方法）结合表示为一个单独的margin。
	在css2.1中，水平的margin不会被折叠。
	垂直margin可能在一些盒模型中被折叠：
	1、在常规文档流中，2个或以上的块级盒模型相邻的垂直margin会被折叠。
	最终的margin值计算方法如下：
	a、全部都为正值，取最大者；
	b、不全是正值，则都取绝对值，然后用正值减去最大值；
	c、没有正值，则都取绝对值，然后用0减去最大值。
	注意：相邻的盒模型可能由DOM元素动态产生并没有相邻或继承关系。
	2、相邻的盒模型中，如果其中的一个是浮动的（floated），垂直margin不会被折叠，甚至一个浮动的盒模型和它的子元素之间也是这样。
	3、设置了overflow属性的元素和它的子元素之间的margin不会被折叠（overflow取值为visible除外）。
	4、设置了绝对定位（position:absolute）的盒模型，垂直margin不会被折叠，甚至和他们的子元素之间也是一样。
	5、设置了display:inline-block的元素，垂直margin不会被折叠，甚至和他们的子元素之间也是一样。
	6、如果一个盒模型的上下margin相邻，这时它的margin可能折叠覆盖（collapse through）它。在这种情况下，元素的位置（position）取决于它的相邻元素的margin是否被折叠。
	a、如果元素的margin和它的父元素的margin-top折叠在一起，盒模型border-top的边界定义和它的父元素相同。
	b、另外，任意元素的父元素不参与margin的折叠，或者说只有父元素的margin-bottom是参与计算的。如果元素的border-top非零，那么元素的border-top边界位置和原来一样。
	一个应用了清除操作的元素的margin-top绝不会和它的块级父元素的margin-bottom折叠。
	注意，那些已经被折叠覆盖的元素的位置对其他已经被折叠的元素的位置没有任何影响；只有在对这些元素的子元素定位时，border-top边界位置才是必需的。
	7、根元素的垂直margin不会被折叠。
	浮动的块级元素的margin-bottom总是与它后面的浮动块级兄弟元素（floated next in-flow block-level sibling）的margin-top相邻，除非那个同级元素使用了清除操作。
	浮动的块级元素的margin-top和它的第一个浮动块级子元素（floated first in-flow block-level child）的margin-top相邻（如果该元素没有border-top，没有padding-top，并且子元素没有使用清除操作）。
	浮动的块级元素的margin-bottom如果符合下列条件，那么它和它的最后一个浮动块级子元素的margin-bottom相邻（如果该元素没有指定padding-bottom或border）：
	a、指定了height:auto
	b、min-height小于元素的实际使用高度（height）
	c、max-height大于元素的实际使用高度（height）
	如果一个元素的min-height属性设置为0，那么它所拥有的margin是相邻的，并且它既没有border-top和border- bottom，也没有padding-top和padding-bottom，它的height属性可以是0或auto，它不能包含一个内联的盒模型 （line box），它所有的浮动子元素（如果有的话）的margin也都是相邻的。
	当一个元素拥有的margin折叠了，并且它使用了清除操作，那么它的margin-top会和紧随其后的兄弟元素的相邻margin折叠，但结果是它的margin将无法和其块级父元素的margin-bottom折叠。
	折叠操作是以padding、margin、border的值为基础的（即在浏览器解析所有这些值之后），折叠后的margin计算将覆盖已使用的不同margin的值。

	-------------------------------------------------------------------------------------------------------------------------
	避免被双击选中元素
	对于ie和chrome、Safari添加属性 onselectstart="return false;" 
	对于Firefox添加样式 style="-moz-user-select:none;"

	----------------------------------------------------------
	在做手机端开发时候，渐渐对像素级的差别变得敏感、
	手机端默认字体大小是16px，那么假设我们设置了一个12px的字体，那他的line-height依然是16px
	这实在令人恶心，故而当设置了元素的字体后，最好跟上他的line-height，以防万一
	font-size:12px;line-height:12px;
    要注意【line-height】的继承问题
	------------------------------------------------------------------
	关于手机端的滑动问题
	event.stopPropagation()阻止冒泡
	event.preventDefault() 阻止默认事件【在滑动方面主要是浏览器提供的默认事件，比如返回上一页等】
	具体安排是这样的
	id.addEventListener('touchstart',function(event){
		event.stopPropagation();
		event.targetTouches[0].screenX //获取X坐标
		event.targetTouches[0].screenY //获取Y坐标
	});
	id.addEventListener('touchmove',function(event){
		event.stopPropagation();
		event.preventDefault();
	});
	id.addEventListener('touchstart',function(event){
		event.stopPropagation();
	});

	----------------------------------------------------
	关于cookie存储中文的问题
	经过测试cookie经过js内部提供的对象【escape等】编码中文，存储，在获取，解码，还是乱码。
	在【segmentfault】上看到要使用【Base64】来编解码。//这是为什么呢？

	cookie编码续
	经过测试【base64】也会出现问题，主要是因为对于【字母，数字】的解码问题，有时候会在后面跟上一个【补全字符】 //故而，有时间还是要研究一下编码方式的【阮一峰有关于这方面的博客】

	最后的解决方是: 不对要存储的字符串进行编码处理，而是直接存储，提取的时候进行【unescape】解码，就可以得到正常的字符串了  //对中英文混输也有效
	难道这不是因为默认对字符串进行了escape处理吗？

	---------------------------------------------------------------------------

	ajax请求
	ajax 请求可分为【get/post】两类
	post对传递数据大小没有限制，而get有
	post默认使用utf-8编码，而get不是,因此如果有传递中文的需要可使用post【也可以加上 contentType:'application/x-www-form-urlencoded; charset=UTF-8'】//【application/x-www-form-urlencoded】是什么意思呢
	关于跨域请求需要使用jsonp【dateType:jsonp】
	post不支持跨域请求，get支持。【在chrome上测试发现post跨域请求会被转成get请求】

	使用post跨域请求
	现代浏览器将其转换成get请求，而又因为get请求默认的不是utf-8编码，故而此时如果传递中文，在服务器端接受到的将是乱码
	因此需要加上【contentType:'application/x-www-form-urlencoded; charset=UTF-8'】

	或者直接 【encodeURI(str)】//对可能含有中文字符的字符串进行编码，以方面后台解码

-------------------------------------------------------------------------------------------------
	滑动问题
	以前总是以为，如果一个div可以左右滑动，那么他的上下滑动就不能使用浏览器的默认事件了
	今日发下错矣。
	var xx,yy,XX,YY,swipeX,swipeY;
	div.addEventListener('touchstart',function(event){
		xx = event.targetTouches[0].screenX;
		yy = event.targetTouches[0].screenY;
		XX = xx ;
		YY = yy ;
		swipeX = true ;
		swipeY = true ;
	});
	div.addEventListener('touchmove',function(event){
		XX = event.targetTouches[0].screenX;
		YY = event.targetTouches[0].screenY;
		if(swipeX && Math.abs(XX-xx)-Math.abs(YY-yy)>0){
			swipeY = false ;
			event.stopPropagation();
			event.preventDefault();
		}
		if(swipeY && Math.abs(XX-xx)-Math.abs(YY-yy)<0){
			swipeX = false ;
		}
	})

	-----------------------------------------------------------------------------------
	在dom不没加载完的时候，使用可以往【代码所处script区下面写，且不会清空dom】
	document.write()
	<script type="text/javascript">
		document.write('<script type="text/javascript" src="js/jquery.10.0.min.js"></script>');
	</script>
	/*  执行结果类似这样
		<script type="text/javascript">
			document.write('<script type="text/javascript" src="js/jquery.10.0.min.js"></script>');
		</script>
		<script type="text/javascript" src="js/jquery.10.0.min.js"></script>
	*/
	反则会清空dom，
	因此在jquery的

	$(function(){
		//这里不可使用document.write(),否则会清空dom
	})

	--------------------------------------------------------------------------------------------------------------------
	移动端如何点击input弹出数字输入界面
	可以用type="tel"来实现
	<input type="tel" placeholder="输入手机号"/> 

	关于input的一些介绍
	上传图片
	<input type="file" accept="image/*"/> 

	文件和其他数据同时异步上传，要用到html5新特性 FormData
	设置每个需要上传数据的input的name
	<form id="info">
		<input type="file" name="file1" accept="image/*"/> 
		<input type="file" name="file2" accept="image/*"/> 
		<input type="password" name="password"/> 
		<input type="tel" name="username"/> 
		<div contentEidtable="true" id="message"></div>
	</form>

	var formdata = new FormData(document.getElementById('info'));//此初始化可以把所有带有name属性的input所包含的信息带上
	//如果想同时上传【message的text()】，要用到formdata的【append】方法
	var message = $('#message').text();
	//添加
	formdata.append('message',message);//如果存在，在value后新增一个value，不存在就新增一个
	//删除可以用delete方法
	formdata.delete('message');
	//查询是否已经含有
	formdata.has('message');//返回一个boolean值
	//设置
	formdata.set('message','12333');//如果key存在，就复写value，如果不存在就新增一个
	//获取
	formdata.get('message');//或取第一个value值
	formdata.getAll('message');//以数组形式返回此key对应的所有value值
		
	原生处理方法---------------------------------------------------------------------------------------

	var xhr = new XMLHttpRequest();
　　xhr.open('POST', $(this).attr('action'));
　　　　// 定义上传完成后的回调函数
　　xhr.onload = function () {
　　　　if (xhr.status === 200) {
　　　　　　console.log('上传成功');
　　　　} else {
　　　　　　　console.log('出错了');
　　　　}
　　};
　　xhr.send(formdata);

	jquery处理方法	-----------------------------------------------------------------------------------------

	$.ajax({
	  url: "http://192.168.16.13:8080/master/api/merchant/register.op",
	  type: "POST",
	  data: formdata,
	  processData: false,  // 告诉jQuery不要去处理发送的数据
	  contentType: false ,  // 告诉jQuery不要去设置Content-Type请求头
	  success:function(data){
		location.href="register-next.html?"+data.merchantId;
	  }
	});
----------------------------------------------------------------------------------------------------------
	JSON.parse(jsonstr); //可以将json字符串转换成json对象 
	JSON.stringify(jsonobj); //可以将json对象转换成json对符串 

	$.parseJSON( jsonstr ); //jQuery.parseJSON(jsonstr),可以将json字符串转换成json对象 

---------------------------------------------------------------------------------------------------------------------
	【localStorage】html5新提供的新特性
	浏览器支持IE8

	localStorage.setItem('bitch','周恩来');//存储一个
	console.log(localStorage.getItem('virgn'))//如果该key不存在，则返回null
	localStorage.removeItem('bitch'); //takes a single argument — the key of the data item you want to remove — and removes it from the storage object for that domain.
	localStorage.clear();//清楚所有数据
	console.log(localStorage)//输出为object

	也可以通过 localStorage.key 或者localStorage[key]的形式【赋值/获取】
	如果要想使用localStorage存储图片的话，需要对文件进行编码【base64】

	Responding to storage changes with the StorageEvent
	The StorageEvent is fired whenever a change is made to the Storage object. 
	This won't work on the same page that is making the changes — it is really a way for other pages on the domain using the storage to sync any changes that are made. 
	Pages on other domains can't access the same storage objects.
	大致意思是可以监听localStorage的key-value变化，但所产生的变化不会发生在本页面上，但在其他页面上可以发生。

	window.addEventListener('storage', function(e) {  
	  document.querySelector('.my-key').textContent = e.key;
	  document.querySelector('.my-old').textContent = e.oldValue;
	  document.querySelector('.my-new').textContent = e.newValue;
	  document.querySelector('.my-url').textContent = e.url;
	  document.querySelector('.my-storage').textContent = e.storageArea;
	});

-------------------------------------------------------------------------------------------------------------------
	select
	获取select标签内部的option 这里有详细介绍 【http://www.w3school.com.cn/jsref/dom_obj_select.asp】
	$(select).find('option:selected')//获取选中的option
	在移动端定义select的位置宽高会有一些bug，值不准确
	解决方法是：在select外部包裹一个div，定义div的宽高位置，然后让select的css{width:100%;height:100%;}
	如果定义div的width:auto;或导致当option的宽度比select的默认宽度宽的时候，出现select宽被撑开的现象，因此需要定义div的宽度

---------------------------------------------------------------------------------------------------------------
	Ajax非异步加载数据
	var paren = function(){
		$.ajax({
			sccess:function(){
				child();
			}
		})
	}
	var child = function(){
		$.ajax({
			sccess:function(){
				console.log(t2 = new Date().getTime());
			}
		})
	}
	
	parent();
	console.log(t1 = new Date().getTime());
	//-----------------------------------结果显示t2>t1
	这说明js并非按行执行

	如果说在parent();执行后，要调用child的加载到的数据，就需要使用callback
	直接 
	parent(); 
	doSth(); //这样是不行的，因为js会在执行child

	var bitch = function(callback){
		if (callback) //先判断参数是否进来
		{
			callback();
		}
		console.log(typeof(callback))
	}
	bitch(function(){
		console.log('我进来了')
	})

------------------------------------------------------------------------------------------------------------------
	.99 表示0.99
	number>>2 表示将其二进制数据右移两位
	number>>2 表示将其二进制数据左移两位

------------------------------------------------------------------------------------------------------------------------
	css3
	-webkit-filter:blur(5px) 对于任何元素都可以 IE不支持

-----------------------------------------------------------------------------------------------------------------------
	var bitch = window.open(url,name,'width=500,height=500');
	bitch.document.getElementById('id').dosth ;//父窗口，访问子窗口
	window.opener.document.getElementById('id').dosth ;//子窗口，访问父窗口

----------------------------------------------------------------------------------------------
	
	js原型模式的执行流程：

	1.先查找构造函数实例里的属性或方法，如果有，就立即返回。
	2.如果构造函数的实例没有，就去它的原型对象里找，如果有，就立即返回

	第一题

	var fun = function(){
		this.name = 'peter';
		return {
		name: 'jack'
		};
	}

	var p = new fun();
	//请问p.name是： jack
	第二题

	var fun = function(){
		this.name = 'peter';

		return 'jack';    
		}

	var p = new fun();
	//请问p.name是： peter
	第三题

	var fun = function(){}

	fun.prototype = {
		info : {
		name : 'peter',
		age : 25
		}
	}

	var a = new fun();
	var b = new fun();

	a.info.name = 'jack';
	b.info.name = 'tom';

	//请问a.info.name和b.info.name分别是：tom,tom
	第四题

	var fun = function(){
		this.info = {
		name : 'peter',
		age : 25
		}
	}

	var a = new fun();
	var b = new fun();

	a.info.name = 'jack';
	b.info.name = 'tom';
	//请问a.info.name和b.info.name分别是：jack tom
	第五题

	var fun = function(){}

	fun.prototype = {    
		name : 'peter',    
		age : 25    
	}

	var a = new fun();
	var b = new fun();

	a.name = 'jack';
	b.name = 'tom';
	//请问a.name和b.name分别是： jack tom
	第六题

	var fun = function(){
		this.info = {
		name : 'peter',
		age : 25
		}
	}

	fun.prototype = {
		info : {
		name : 'peter',
		age : 25
		}
	}

	var a = new fun();
	var b = new fun();

	a.info.name = 'jack';
	b.info.name = 'tom';
	//请问a.info.name和b.info.name分别是： jack tom

	----------------------------------------------------------------------------------------
	segmentfalut 上看到的一个问题
	var array = [1,2,3];
	function clear(arr){
		arr = []
	}
	console.log(array) // 结果为[1,2,3]
	//为什么array的值没有变化呢？
	//在JS中，除了undefined、null、boolean、string、number这五种原始数据类型，其他的都是对象数据类型，也就是说，array、function、date等等这些其实本质上都是JS对象。
    //使用等号（=）将 a 数组赋值到 ary ，等于是 ary 对数组 a 的引用，同理再将 ary = []，改变的是 ary 的引用，不是改变 a 数组本身。
	更进一步来说
	//array = [1,2,3]
	array是对内存中[1,2,3]的地址引用，类似于指针
	在function clear(arr){}中
	形参arr和变量array一样,都是类指针，一开始也指向[1,2,3]
	arr=[];//arr指向一个空数组，并没有对[1,2,3]进行任何操作
	arr.length = 0 ;//arr操作了被引用的数组，而array也引用了这个数组，因此array也会改变

	----------------------------------------------------------------------------------------------------------
	多列
	column
	column-count	规定元素应该被分隔的列数。	
	column-fill	规定如何填充列。	
	column-gap	规定列之间的间隔。	
	column-rule	设置所有 column-rule-* 属性的简写属性。	
	column-rule-color	规定列之间规则的颜色。	
	column-rule-style	规定列之间规则的样式。	
	column-rule-width	规定列之间规则的宽度。	
	column-span	规定元素应该横跨的列数。	
	column-width	规定列的宽度。	
	columns	规定设置 column-width 和 column-count 的简写属性。

	--------------------------------------------------------------------------------
	栅栏结构
	父元素 { display:flex ; display:-webkit-flex ; display: -ms-flex ; display:-moz-flex ; }
	子元素 { flex:auto; flex:20%; flex:1; flex:1em; flex:100px; }

	--------------------------------------------------------------------------
	伪类
	伪类:nth-clild(an+b)匹配在文档树中前面有an+b-1个兄弟元素的元素，此时n大于或等于0，并且该元素具有父元素。简而言之，该选择器匹配多个位置满足an+b的子元素。第一个子元素的位置为1
	:nth-child(3) 表示第三个元素
	:nth-child(odd) 所有奇元素 1,3,5
	:nth-child(2n+1) 所有奇元素 1,3,5
	:nth-child(even) 所有偶元素 2,4,6
	:nth-child(2n) 所有偶元素 2,4,6

	---------------------------------------------------------------------------------
	
	运算模式

	var a = {n:1};  
	var b = a;   
	a.x = a = {n:2};  
	console.log(a.x);// --> undefined  
	console.log(b.x);// --> [object Object]  

	a.x = a = {n:2}; 等同于
	a.x = a ; // a的新增x属性指向自身
	a = {n:2} ; // a又指向一个新对象

	var a , b ;
	a = b =2 ;
	console.log(a) // --> 2
	b = {}
	console.log(a) // ---> {}

	a = b ={}
	b = 1
	console.log(a) // --> {}

	---------------------------------------------------------------------------------
	this 指针，指向当前运行环境
	如果在javascript语言里没有通过new（包括对象字面量定义）、call和apply改变函数的this指针，函数的this指针都是指向window的。
	一个例子
		var name = "蒋中正"
		var obj = {
			name:'abc',
			method:{
				log:function(){
					console.log(this.name);
				},
				name:'周恩来'
			}
		}
		obj.method.log(); //周恩来 在method对象中调用log方法，this指向method，其实this就是method的克隆
		var song = obj.method.log; 
		song(); //蒋中正 在window中运行log方法，this指向window
		var bitch = new obj.method.log(); //uindefined 直接新建了一个log方法，无运行环境？

	call,apply 改变函数的this指针
		其作用一样，只是参数形式有所区别
		call(obj,arguments[0],arguments[1],arguments[2])
		apply(obj,[arguments[0],arguments[1],arguments[2]])

		function a(xx) {
			this.b = xx;
		}
		var o = {};
		a.apply(o, [5]); //首先将a的指针this指向【0】，执行方法a(),a的参数xx=5，也就是为o添加了一个property【b=5】
		alert(b);    // undefined 因此并没有给a的property【b】赋值 
		alert(o.b);    // 5
		a('你大爷');
		console.log(b) //全局对象window下的变量 b='你大爷' ; 等同于 console.log(window.b)

	 "use strict" //使用严格模式
	 在正常模式下，js 函数里那些你没有声明就使用的变量，其实是访问的全局对象的属性，
	 比如说上面正常函数调用的时候，函数里的 this ，就访问的是全局对象。
	 但是在严格模式下，不允许这种语法，所有变量都必须要显示声明，
	 所以如果你不用 call() 传递 this 给这个函数，那么就会报错了。

	 --------------------------------------------------------------------------------------------------------
	 作用域：
	 (function() {
		console.log(a); // undefined 这是因为【变量，函数的定义】会先提升到运行环境的顶部 因此不会显示 a is not defined [a没有被定义]
		console.log(haha()); // '我笑诸葛亮少智，周公瑾无谋' ; a is undefined ;c is not defined ; 由此可见变量要先于function 不然a应该显示a is not defined?
		var a = b = 5;
		function haha(){
			console.log('我笑诸葛亮少智，周公瑾无谋');
			console.log(a)
			console.log(c)
		}
	  })();//写法等同于一下
		 
	 console.log(b); // b=5 
		/*
			var a = b = 5;  //等同于,
			var a ;
			b = 5 ;
			a = b ;
		*/
	 console.log(a); // a is not defined 因为a是一个局部变量

	 (function() { // IIFE （Imdiately Invoked Function Expression 立即执行的函数表达式）。
		var a ;
		function haha(){
			console.log('我笑诸葛亮少智，周公瑾无谋')
		}
		console.log(a); 
		console.log(haha()); 
		a = b = 5;
	  })();
	 
	 严格模式下的写法
	 (function() {
		var a = window.b = 5;
	  })();

	语言定义的命名：比如 this 或者 arguments，它们在所有作用域内都有效且优先级最高，所以在任何地方你都不能把变量命名为 this 之类的，这样是没有意义的
	形式参数：函数定义时声明的形式参数会作为变量被 hoisting 至该函数的作用域内。所以形式参数是本地的，不是外部的或者全局的。当然你可以在执行函数的时候把外部变量传进来，但是传进来之后就是本地的了
	函数声明：函数体内部还可以声明函数，不过它们也都是本地的了
	变量声明：这个优先级其实还是最低的，不过它们也都是最常用的

		var x =1000;
		function a(x,y){
			y = function(){ x = 2};
			(function(){
				var x =3;
				y();
				console.log(x); // 3
			}).apply(this) // this指向环境a
			this.x = 50
			console.log(x) // 2
		}
		a();
		console.log(x) //50
	 IIFE （Imdiately Invoked Function Expression 立即执行的函数表达式）。

	 方式1，调用函数，得到返回值。强制运算符使函数调用执行

	(function(x,y){
		alert(x+y);
		return x+y;
	}(3,4)); 
	方式2，调用函数，得到返回值。强制函数直接量执行再返回一个引用，引用再去调用执行

	(function(x,y){
		alert(x+y);
		return x+y;
	})(3,4);
	方式3，使用void

	void function(x) {
		  x = x-1;
		  alert(x);
	}(9);
	---------------------------------------------------------------------------------------

	变量提前
	根据JS中的语法特性（注意哦，是js的语法特点，要记住）：
  	在javascript函数体内（执行作用域）声明的变量，无论在函数体何处声明，它将都会被提升到函数的顶部，
  	我们称这种现象为变量提升。
  	 函数呢，它也有这种特性，即无论在函数体何处声明另一个函数，它将都会被提升到函数的顶部。
  	 只是采用函数表达式和函数声明所体现的函数提升的内容是有差别的：
  	 函数表达式和变量提升类似，只会提升函数的变量，不提升函数的定义；
  	 而函数声明提升时，不仅仅会提升函数的声明，函数的定义也会被提升；

  	 函数声明：
  	 function a(){
  	 	console.log(b)
  	 }
  	 函数表达式：其本质还是变量
  	 var a = function(){
  	 	consol.log(b)
  	 }

  	--------------------------------------------------------------------------------------
  	复制一个对象
  	对于object，function , array 这类引用型对象，变量值只是引用了这个对象，而不是把对象复制一遍
  	var a = [123] ;
  	var b = a ;
  	b.length = 0 ;
  	console.log(a) // ----->[] 空数组

  	如何复制一个对象呢？
  	b = [].slice.call(a) ;
  	b.length = 0 ;
  	console.log(a) ; // ------> [123]

	---------------------------------------------------------------------------------------

	闭包
	var hei={} ;
	(function($){
		var nidaye = 1 ;
		$.jia = function(){ nidaye++,console.log(nidaye)}
		console.log('立即执行')
	})(hei);
	hei.jia(); // 2 
	var nidaye = 1000 ;
	hei.jia(); // 3
	//变量nidaye会一直在内存中驻留，不被回收

	--------------------------------------------------------------------------------------

	arguments

	arguments 是一个类数组对象。代表传给一个function的参数列表。
	arguments 对象是函数内部的【本地变量】; arguments 已经不再是函数的属性了。

	例1:
	function nidaye(){console.log(arguments[0])}
	nidaye(1,213,3) // 输出1

	例2:
	var arr = 11 ;
	function clear(arr){ arr=456 }
	clear(arr);
	console.log(arr); // 输出11，这是因为 arguments 对象是函数内部的【本地变量】，clear内部形参与外部变量无关系

	-----------------------------------------------------------------------------------------
	html5 history

	history.forward();
	history.back();
	history.go();
	history.pushState(null,'',url); //添加一个
	history.replaceStateState(null,'',url); //替换当前
	window.onpopstate = function(event){ // 点击浏览器【返回、下一页】时触发
		//根据已改变的url，做一些事情
	}

--------------------------------------------------------------------------------------

	括号元算符
	var angular = window.angular || (window.angular={}) ;
	// 如果存在 【window.angular】 就把window.angular赋值给 angular 
	// 不存在执行括号内部 把{} 付给window.angular 再把{}赋给angular
	// 括号运算符会返回最后一个表达式的结果
	var angular = (1,2) ; // --> 2
----------------------------------------------------------------------------------------------------------------
	ajax的实现

	1.jsonp跨域
	/*
	// 跨域是因为同源策略的限制，导致js只能获取同域下的窗口属性
	// 如果想获取不同网站下的资源，就需要用到跨域
	// html的script标签可以跨域访问，jquery、zepto就是这么实现跨域的
	// script跨域访问，会返回一段js代码，这需要服务器端做相应的配合
	// url?callback=callbackFun 一般而言是通过url.search 去传递参数，服务器会将字符串做解析 key=value&key=value&key=value 
	// 服务器在解析search字符串如果含有callback，会返回一段处理过的数据
	// 又因为返回的js数据是全局的，即callbackFun是一个全局对象
	// 因此在回调的时候可需要定义一个全局的对象来接收，window就是全局
	*/
	var ling = {};
	ling.jsonp = function(arg){
		var script = document.createElement('script');
		script.setAttribute("type","text/javascript");
		script.id = '1233333';

		var cbFunction = new Date().getTime();
		var url = arg.url + '?callback=' + cbFunction ;
		script.src = url ;
		document.head.appendChild(script);
		 //自定义的回调函数result
		 if (arg.success)
		 {
			window[cbFunction] = arg.success;
		 }
		setTimeout(function(){
			document.head.removeChild(script);
			if (arg.error)
			{
				arg.error();
			}
		},3000)
	}
	 window.onload = function(){
		 
		 ling.jsonp({
			 url:"http://app.nacute.com/api/ajax/chosen/detail/600/",
			 data:{a:'bitch'},
			 success:function(data){
				console.log(data)
			 }
		 });
	 }

	 2.在服务器端设置 Access-Control-Allow-Origin
		这种方式只要服务端把response的header头中设置Access-Control-Allow-Origin为制定可请求当前域名下数据的域名即可。一般情况下设为即可。这样客户端就不需要使用jsonp来获取数据。

	3.xmlhttprequest
		method的几种方法
			0 GET // 用于获取数据
			1 POST // 提交数据
			2 DELETE // 删除数据
			3 PUT // 提交？
		readysate的几种状态
			0	UNSENT (未打开)	open()方法还未被调用.
			1	OPENED  (未发送)	send()方法还未被调用.
			2	HEADERS_RECEIVED (已获取响应头)	send()方法已经被调用, 响应头和响应状态已经返回.
			3	LOADING (正在下载响应体)	响应体下载中; responseText中已经获取了部分数据.
			4	DONE (请求完成)	整个请求过程已经完毕.

		responseText
			此次请求的响应为文本，或是当请求未成功或还未发送时为 null。只读。

		response
			响应实体的类型由 responseType 来指定， 可以是 ArrayBuffer， Blob， Document， JavaScript 对象 (即 "json")， 或者是字符串。如果请求未完成或失败，则该值为 null。

		upload
			可以在 upload 上添加一个事件监听来跟踪上传过程。
			req.upload.addEventListener("progress", updateProgress, false); //上传中
			req.upload.addEventListener("load", transferComplete, false); //上传完成
			req.upload.addEventListener("error", transferFailed, false); //上传出错
			req.upload.addEventListener("abort", transferCanceled, false); //上传中断

	ling.ajax = function(arg){
		var xhr = new XMLHttpRequest();
		var type = arg.type || 'POST' ,
			url = arg.url ,
			asyn = arg.asyn || true ;
		xhr.open(arg.type,arg.url,arg.asyn);
		xhr.responseType = "json" // json arraybuffer text document blob 设置返回的几种类型
		xhr.timeout=3000;//设置响应时间
		xhr.ontimeout = function(){
			alert('请求超时');
		}
		xhr.onreadystatechange = function(){ // readystate变化时触发
			if (xhr.readyState===2)//
			{
				console.log('以获取相应')
			}else if (xhr.readyState === 4)
			{
					console.log(xhr.responseType,xhr.responseText)
			}
		}
		xhr.send();//可发送Array，string，document，blob，formdata
	}
		
---------------------------------------------------------------------------------------------------
!!强制转boolen
	强制将语句转为表达式 ：

	语句值为number：

	!!1 // true
	!!(4-2) // true
	!!(4-4) // false
	语句值为string：

	!!"str" // true
	!!""    // false
	语句值为object:

	var obj = {}
	!!obj // true
	obj = null
	!!obj // false
	语句值未定义 undefined：

	var temp;
	!!temp // false
	temp = 1;
	!!temp // true
	语句值为null ：

	!!null // false
	原因：

	"解析器"没有想象中智能，所以用这种方式来告诉"它"。

-------------------------------------------------------------------------------
	音乐播放器
	首先要在普通页面，点击链接的时候，判断播放页面是否打开
	可以通过过localStorage来判断
		具体做法是，如果播放页面存在，就每隔1000ms，向localStorage内写值【时间戳】
		但点击链接的时候，用当前事件减去从localStorage中获取到的时间戳，如果小于1000ms，说明页面存在，反则不存在 //这个判断规则有点问题
	通信问题，就是播放某首歌【音乐id】
		也可以通过将其写入localStorage，让后让播放页面监听storage的变化，来更新页面的当前播放曲目
		window.addEventListener('srorage',function(e){
			if (e.key=='curentSongId')
			{
				// doSth
				//e.key,e.oldValue,e.newValue,e.url,e.storageArea
			}
		})
----------------------------------------------------------------------------------
	
	判断类型

	其实typeof是不太靠谱的，// 这是在看requirejs源码时候看到的

	var ob = Object.prototype.toString ;
	var fb = Function.prototype.toString ;
	var a = function(){alert(1111)}
	var b = [1,23] 
	var c ='1234'
	var d = 123 
	var e = true
	var f = {}
	console.log( a.toString() , fb.call(a) ) // 前面两个是把函数代码转换成字符串，a.toString()继承自Function
	console.log( ob.call(a) ) // ----> [object Function]
	console.log( ob.call(b) ) // ----> [object Array]
	console.log( ob.call(c) ) // ----> [object String]
	console.log( ob.call(d) ) // ----> [object Number]
	console.log( ob.call(e) ) // ----> [object Boolean]
	console.log( ob.call(f) ) // ----> [object Object]

	instanceof typeof

	instanceof 运算符可以用来判断某个构造函数的prototype属性是否存在另外一个要检测对象的原型链上
	object instanceof constructor
	object 被检测的对象
	constructor 某个构造函数
	
	eg: 
	var sb = {};
	var hah = function(hei){
		var hei = hei ;
		hei.__proto__ = sb ;
		return hei;
	}
	hah.prototype = sb ;
	var bu = hah({}) ;
	console.log(bu instanceof hah) // 输出为 true

	dom instanceof HTMLElement ; // 判断是不是一个dom对象
	typeof(string) // string 
	typeof(boolean) // boolean 
	typeof(function) // function 
	typeof(obj) // obj 
	typeof dom // obj
	typeof(array) // array 
	typeof(Number) // Number 
	typeof(undefined) // undefined 

----------------------------------------------------------------------------
	
	Visibility 页面可见性
		H5新API，切换标签页的时候触发
		这两个属性会变化 
			document.visibilityState  有四个状态 hidden visible prerender【页面在后台加载的，对用户不可见】 unloaded【页面即将关闭（用户正在从当前页面跳转到其他页面）】
			document.hidden 有两个状态 true false
	 document.addEventListener('visibilitychange',function(){
		if (document.hidden)
		{
			console.log('我刚才被隐藏了；额')
		}else{
			console.log('我又出来了，哈哈哈')
		}
	})


-----------------------------------------------------------------------------

	js在新标签页打开一个页面

	//var b = $('<a href="http:/www.baidu.com" target="_blank"></a>')[0];
	var a = document.createDocumentFragment();
	var anch = document.createElement('a');
	anch.href = 'http:/www.baidu.com' ;
	anch.target = 'baidu' ;
	a.appendChild(anch)
	var b = a.querySelector('a');

	creatEvent
	var e = document.createEvent('MouseEvents');  
	e.initEvent('click',true,true); // 初始化事件
	b.dispatchEvent(e) // 执行事件

------------------------------------------------------------------------------

	mouse事件

	mousemove/mouseover/mouseout/mouseleave/mouseenter/mousedown/mouseup/mousewheel/click/dblclick

	mouseover/mouseout 与 mouseleave/mouseenter 的区别在于
	比如说存在这样一个元素 
		<div id="main">
			<div id="child"></div>
		</div>
	$('#main').mouseover(function(){ console.log('鼠标刚才经过我') })
	// 我们大多时候期望的是只在鼠标刚刚进入main的时候触发这个事件，但是如果给【main】添加一个【mouseover/mouseout】的监听事件，他也会在进入【child】的时候触发
	// WTF
	// 【mouseenter/mouseleave】 就只会触发一次，不会在进入【child】的时候也触发

	// 滚轮事件
	function wheel(dom,doSth){
		if (dom.addEventListener)
		{
			dom.addEventListener('mousewheel',doSth) // addEventListener是现代浏览器的方法，ie9以下下用attachEvent，又因为ie9以上兼容attachEvent，所以if(!dom.addEventListener && dom.attachEvent)
			dom.addEventListener('DOMMouseScroll',doSth) // Firefox的滚轮事件
		}else if (!dom.addEventListener && dom.attachEvent)
		{
			dom.attchEvent('mousewheel',doSth)
		}else{
			dom.onmousewheel = doSth ;
		}
	}
	function doSth(event){
		var e = event || window.event ; // ie9以下的事件是一个全局的事件，为window.event 
		var detal =  -e.wheelDelta || e.detail ; // wheelDelta 为chrome、IE、Safari的事件属性 detail为Firefox的事件属性
		console.log( detal )	
	}
---------------------------------------------------------------------------------

	addEventListener

	target.addEventListener(type, listener[, useCapture]);
	type:事件类型
	listener:监听函数
	useCapture:如果值为true， useCapture 表示用户希望发起捕获。
				在发起捕获之后， 只要Dom子树下发生了该事件类型，都会先被派发到该注册监听器，然后再被派发到Dom子树中的注册监听器中。
				并且向上冒泡的事件不会触发那些发起捕获的事件监听器。如果没有指定， useCapture 默认为false 。

	outDiv.addEventListener("click", function () { info.innerHTML += "outDiv" + "<br>"; }, false);
	middleDiv.addEventListener("click", function () { info.innerHTML += "middleDiv" + "<br>"; }, false);
	inDiv.addEventListener("click", function () { info.innerHTML += "inDiv" + "<br>"; }, false);

	•全为 false 时，触发顺序为：inDiv、middleDiv、outDiv；
	•全为 true 时，触发顺序为：outDiv、middleDiv、inDiv；
	•outDiv 为 true，其他为 false 时，触发顺序为：outDiv、inDiv、middleDiv；
	•middleDiv 为 true，其他为 false 时，触发顺序为：middleDiv、inDiv、outDiv；

	最终得出如下结论：
	•true 的触发顺序总是在 false 之前；
	•如果多个均为 true，则外层的触发先于内层；
	•如果多个均为 false，则内层的触发先于外层。

	 // 如果发起捕获，即便子元素已经stopPropagation，但还是会先触发此元素事件

-------------------------------------------------------------------------------

	获取浏览器标志userAgent
	native App 是可以修改webview的userAgent的，如此一来便可以知道，此页面是不是在应用内打开

	检测不同浏览器
	function userAgent(){
		var ua = navigator.userAgent.toLowerCase();
		var flag = {} ;
		flag.phone = !!ua.match(/android|phone|pad|ipod/g) ; // 检测是不是移动端
		if(flag.phone){
			flag.iphone = !!ua.match(/safari/g)	; 
			flag.android = !!ua.match(/android/g) ; 
		}else{
			flag.chrome = !!ua.match(/chrome/g) ;
			flag.firefox = !!ua.match(/firefox/g) ;
			flag.ie = !!ua.match(/msie/g) ;
			flag.edge = !!ua.match(/edge/g) ;
			flag.safari = !!ua.match(/safari/g) ;
		}
		return flag ;
	}
	
-------------------------------------------------------------------------------
		<div id="main"></div>
		document.getElementById('main').addEventListener('click',function(event){
			console.log(event)
			    //altKey: false
				//bubbles: true
				//button: 0
				//cancelBubble: false
				//cancelable: true
				//charCode: 0
				//clientX: 14
				//clientY: 25
				//ctrlKey: false
				//currentTarget: null
				//dataTransfer: null
				//defaultPrevented: false
				//detail: 1
				//eventPhase: 0
				//fromElement: null
				//keyCode: 0
				//layerX: 14
				//layerY: 25
				//metaKey: false
				//movementX: 0
				//movementY: 0
				//offsetX: 14
				//offsetY: 25
				//pageX: 14
				//pageY: 25
				//path: Array[6]
				//relatedTarget: null
				//returnValue: true
				//screenX: 14
				//screenY: 110
				//shiftKey: false
				//srcElement: div#main.main
				//target: div#main.main
				//timeStamp: 1430812288501
				//toElement: div#main.main
				//type: "click"
				//view: Window
				//webkitMovementX: 0
				//webkitMovementY: 0
				//which: 1
				//x: 14
				//y: 25

				---------------------------------------------------
				srcElement
					accessKey: ""
					align: ""
					attributes: NamedNodeMap
					baseURI: (...)
					childElementCount: 0
					childNodes: (...)
					children: HTMLCollection[0]
					classList: DOMTokenList[1]
					className: "main"
					clientHeight: 50
					clientLeft: 0
					clientTop: 0
					clientWidth: 50
					contentEditable: "inherit"
					dataset: DOMStringMap
					dir: ""
					draggable: false
					firstChild: (...)
					firstElementChild: null
					hidden: false
					id: (...)
					innerHTML: (...)
					innerText: ""
					isContentEditable: false
					lang: ""
					lastChild: (...)
					lastElementChild: null
					localName: "div"
					namespaceURI: "http://www.w3.org/1999/xhtml"
					nextElementSibling: null
					nextSibling: (...)
					nodeName: "DIV"
					nodeType: 1
					nodeValue: null
					offsetHeight: 50
					offsetLeft: 0
					offsetParent: body
					offsetTop: 0
					offsetWidth: 50
					onabort: null
					onautocomplete: null
					onautocompleteerror: null
					onbeforecopy: null
					onbeforecut: null
					onbeforepaste: null
					onblur: null
					oncancel: null
					oncanplay: null
					oncanplaythrough: null
					onchange: null
					onclick: null
					onclose: null
					oncontextmenu: null
					oncopy: null
					oncuechange: null
					oncut: null
					ondblclick: null
					ondrag: null
					ondragend: null
					ondragenter: null
					ondragleave: null
					ondragover: null
					ondragstart: null
					ondrop: null
					ondurationchange: null
					onemptied: null
					onended: null
					onerror: null
					onfocus: null
					oninput: null
					oninvalid: null
					onkeydown: null
					onkeypress: null
					onkeyup: null
					onload: null
					onloadeddata: null
					onloadedmetadata: null
					onloadstart: null
					onmousedown: null
					onmouseenter: null
					onmouseleave: null
					onmousemove: null
					onmouseout: null
					onmouseover: null
					onmouseup: null
					onmousewheel: null
					onpaste: null
					onpause: null
					onplay: null
					onplaying: null
					onprogress: null
					onratechange: null
					onreset: null
					onresize: null
					onscroll: null
					onsearch: null
					onseeked: null
					onseeking: null
					onselect: null
					onselectstart: null
					onshow: null
					onstalled: null
					onsubmit: null
					onsuspend: null
					ontimeupdate: null
					ontoggle: null
					onvolumechange: null
					onwaiting: null
					onwebkitfullscreenchange: null
					onwebkitfullscreenerror: null
					onwheel: null
					outerHTML: "<div id="main" class="main" style="height:50px;width:50px;background:rgba(247,105,105,1);"></div>"
					outerText: ""
					ownerDocument: (...)
					parentElement: div#wrap.wrap
					parentNode: (...)
					prefix: null
					previousElementSibling: null
					previousSibling: (...)
					scrollHeight: 50
					scrollLeft: 0
					scrollTop: 0
					scrollWidth: 50
					shadowRoot: null
					spellcheck: true
					style: CSSStyleDeclaration
					tabIndex: -1
					tagName: "DIV"
					textContent: ""
					title: ""
					translate: true
					webkitdropzone: ""
					__proto__: HTMLDivElement
		})
	-------------------------------------------------------
	Object.keys(document.querySelector('div')).toString()
	打印出所有的属性
		align,onautocompleteerror,onautocomplete,onwaiting,onvolumechange,ontoggle,ontimeupdate,onsuspend,onsubmit,
		onstalled,onshow,onselect,onseeking,onseeked,onscroll,onresize,onreset,onratechange,onprogress,onplaying,onplay,
		onpause,onmousewheel,onmouseup,onmouseover,onmouseout,onmousemove,onmouseleave,onmouseenter,onmousedown,onloadstart,
		onloadedmetadata,onloadeddata,onload,onkeyup,onkeypress,onkeydown,oninvalid,oninput,onfocus,onerror,onended,onemptied,
		ondurationchange,ondrop,ondragstart,ondragover,ondragleave,ondragenter,ondragend,ondrag,ondblclick,oncuechange,oncontextmenu,
		onclose,onclick,onchange,oncanplaythrough,oncanplay,oncancel,onblur,onabort,spellcheck,isContentEditable,contentEditable,outerText,
		innerText,accessKey,hidden,webkitdropzone,draggable,tabIndex,dir,translate,lang,title,childElementCount,lastElementChild,firstElementChild,
		children,nextElementSibling,previousElementSibling,onwebkitfullscreenerror,onwebkitfullscreenchange,onwheel,onselectstart,onsearch,onpaste,
		oncut,oncopy,onbeforepaste,onbeforecut,onbeforecopy,shadowRoot,dataset,classList,className,outerHTML,scrollHeight,scrollWidth,scrollTop,scrollLeft,
		clientHeight,clientWidth,clientTop,clientLeft,offsetParent,offsetHeight,offsetWidth,offsetTop,offsetLeft,localName,prefix,namespaceURI,
		style,attributes,tagName,parentElement,textContent,nodeType,nodeValue,nodeName