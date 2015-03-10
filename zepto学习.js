//-----------------------------------------------------------------------------------------------------
	js链式操作的实现思路
	$('bit').css({'background':'red'}).parent().children().find('#nihao').show();
	1. $('bit')获取对象 css({'background':'red'}) 
	2. 调用css属性方法对其style进行设置
	3. parent();之所以还能继续操作是因为，每次执行完一个属性方法后，都会把这个对象返回。

	function _$(els){
		this.elements = [];
		for(var i=0, len=els.length; i<len; i++) {
            var element = els[i];
            if(typeof element === 'string') {
                element = document.getElementById(element);
            }
            this.elements.push(element);
        }
	}
// -----------在dom中获取元素-----------------------------------------------------------------
	document.getElementById(id)
	document.getElementsByClassName(classname)//html5新增特性
	document.getElementsByName(name)
	document.getElementsByTagName('标签名')
	
	querySelector,querySelectorAll //IE8及其以上，其他现代浏览器支持
	Document、DocumentFragment、Element都实现了NodeSelector接口。即这三种类型的元素都拥有者两个方法
	querySelector返回一个对象
	querySelectorAll返回一个集合(【NodeList】类数组)
	document.querySelector('#nihao')
	document.querySelectorAll('#nihao')[0]
	
	document.getElementsByClassName('.haha')
	document.querySelector('.haha')
	document.querySelectorAll('.haha')[0]

	querySelector,querySelectorAll查找子元素的时候，也会把自己包含进去
	而jquery的【$(selector)】并不会
	因此如果使用原生的时候需要注意这个问题
	jquery的解决方案是先用一个id替换原来的id，等到查询结束后再替换过来
//--------------------------------------------------------------------------------------------

instanceof // instanceof 用于判断一个变量是否某个对象的实例
var x = new Array() ;
console.log(x instanceof Array) ;//输出为true
console.log(x instanceof Object) ;//输出为true
function instance(){
	console.log(arguments[0])
	console.log(typeof(arguments)) ;//输出为Object
	console.log(arguments instanceof Array) //输出为false,也就是说【arguments】只是一个对象，而不是一个数组，但是他却有数组的某些特性
}
instance('haha')

//------------------------------------------------------------------------
	function $(classname){
		 if (document.getElementsByClassName) //getELementsByClassName用来获取带有此class的所有元素，并返回一个【HTMLCollection】对象 [getElementsByTagName，getElementByID也类同，都是返回一个HTMLCollection对象]
		 {
			 return document.getElementsByClassName(classname)
		 }else{
			 var haha = document.getElementsByTagName('*');
			 var array = new Array;
			 for (var i=0;i<haha.length ;i++ )
			 {
				 var classArray = haha[i].className.split(/\s+/) ;
				 for (var j=0 ;j<classArray.length ;j++ )
				 {
					 if (classname == classArray[j])
					 {
						 array.push(haha[i]) ;
					 }
				 }
			 }
			 return array ;
		 }
	 }
	
	console.log($('item')[0].innerHTML)

	//-- 关于【HTMLCollection】的介绍
		var c = document.forms;//这是 form 元素的一个 HTMLCollection 对象
		var firstform = c[0];//能够以数字数组来使用
		var lastform = c[c.length-1];//length 属性返回元素数
		var address = c["address"];//能够以关联数组来使用
		var address = c.address;//JavaScript 允许这样的表示法

	// --- HTMLCollection与NodeList有很大部分相似性
	/* 相同点:
		1、都是类数组对象,都有length属性，可以通过for循环迭代
		2、都是只读的
		3、都是实时的，即文档的更改会立即反映到相关对象上面,有一个例外，就是document.querySelectorAll返回的NodeList不是实时的
		5、可以通过属性的方式访问元素，如document.forms.f1（f1为form的id）
		不同点:
	*/

// ----------------------------------------------------------------------------------------------
	function a(name){
		this.name = name ;
		this.changeName = function(changName){
			this.name = changName
		}
	}

// ------------------------------------------------------------------------------------------------------
	addClass
	if (element.classList)
	{
		element.classList.add(classname)
	}else{
		element.className += ' '+classname
		}

	removeClass
	if (element.classList)
	{
		element.classList.remove(classname)
	}else{
		var array = className.split(' ');
		}
	