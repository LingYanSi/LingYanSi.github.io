	
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

	-------------------------------------------------------------------------------

	box-sizing:border-box;padding:10px;width:100%;

	如果没有用css设置height，而是用js设置，那么div的高度为height+padding，也就是说此时border-box对height方向的padding已不再有约束力

	js是无法获取到【:before】之类的为元素的
	jquery 提供的伪类选择器都是针对html元素的，而 css 中 :after 和 :before 这些是伪元素，jquery 中并不能获取这些伪元素。
	
    -----------------------------------------------------------------------------------
	js获取高度:

	obj.style.width(height);//除非在css中设置了width，才能获取到

	obj.offsetWidth(offsetHeight); //offsetWidth得到的是width值+padding值+border值

	obj.clientWidth(clientHeight); //offsetWidth得到的是width值+padding值

	getComputedStyle 与 currentStyle; //getComputedStyle 与 currentStyle是处理兼容性的两个方法，获取到的值都是图片在屏幕上显示的仅仅图片的高宽值，不会获取到img标签的padding及border值；但其中getComputedStyle适用于Firefox/IE9/Safari/Chrome/Opera浏览器，currentStyle适用于IE6/7/8。但是如果img标签即使没有设置style属性也没有引入样式表，那么只有getComputedStyle能获取到值，即为图片本身高宽值，currentStyle则返回auto。

	obj.naturalWidth(naturalHeight); //这是HTML5里新添加的一个获取元素高宽的方法，但只适用于Firefox/IE9/Safari/Chrome/Opera浏览器。

	注意: 如果一个图片没有加载完毕，是无法获取到他的高度的！

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
		var allProperty = Object.getOwnPropertyNames(bitch1);//获取对象所有属性，以数组形式返回
		var keys = Object.keys(bitch1) ; //获取对象可枚举的属性，以数组形式返回
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
		//这里不可使用document.write(),否则会情况dom
	})