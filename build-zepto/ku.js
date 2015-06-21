
var Zepto = (function(){
	var $ = function (dom){
		return zepto.init(dom)
	}
	var zepto = {};
	zepto.init = function(selector){
		if (typeof(selector) == 'string')
		{
			var arr = document.querySelectorAll(selector);
			dom = [].slice.call(arr);
		}else if (typeof(selector) == 'function')
		{
			$(document).ready(function(){
				selector();
			});
		}else if (selector instanceof HTMLElement || selector instanceof HTMLDocument || selector === window)
		{
			dom = [selector] ;
		}else if (zepto.isZ(selector))
		{
			return selector ;
		}else if (Array.isArray(selector)) // 其实这里还是要判断，此对象是不是这个库原型的实例
		{
			dom = dom.fliter(function(){
				if(this instanceof HTMLElement) return true ;
				return false ;
			}) ;
		}
		return zepto.Z(dom)
	}
	zepto.Z = function(dom){
		var hei = {};
		hei.elements = dom || [] ;
		hei[0] = dom.length === 1 ? dom[0] : dom ;
		hei.__proto__ = $.fn ; // ie11以下不支持修改原型链，将原型链指向$.fn
		return hei
	}
	zepto.isZ = function(dom){
		return dom instanceof zepto.Z // 运算符可以用来判断某个构造函数的prototype属性是否存在另外一个要检测对象的原型链上
	}
	var slice = [].slice ;
	function deleteRepeat(arr){ // 删除数组中的重复元素
		arr.forEach(function(ele,index,arr){
			for (var i=index+1,len=arr.length;i<len ;i++ )
			{
				if (ele===arr[i]) arr.splice(i,1)
			}
		});
	}
	$.fn = {
		ready:function(fun){ // $(document).ready()
			if(this.elements.length===1 && this.elements[0]===document){
				document.addEventListener('readystatechange',function(){
					if(document.readyState === 'complete') // dom加载完毕
						fun()
				});
			}else{
				console.log('只有document才有此方法')
			}
		},
		userAgent:function(){
			var user = {};
			var nav = navigator.userAgent.toLowerCase();
			user.webkit = !!nav.match(/webkit/g);
			user.moz = !!nav.match(/firefox/g);
			user.phone = !!nav.match(/phone|android|pad/g);
			user.ie = !!nav.match(/ie/g);
			return user ;
		},
		selector:function(str){
			if( /^\.[\w-]+$/.test(str) )
			{
				return 'class';
			}else if (/^\#[\w-]+$/.test(str))
			{
				return 'id'
			}else if ( /^\w+$/.test(str))
			{
				return 'tagName'
			}
			return false ;
		},
		each:function(fun){
			this.elements.forEach(function(element){
				fun.call(element);
			});
		},
		addClass:function(className){
			this.each(function(){
				this.classList.add(className)
			});
			return this ;
		},
		removeClass:function(className){
			this.each(function(){
				this.classList.remove(className)
			});
			return this ;
		},
		css:function(obj){
			if (typeof(obj)==='string')
			{
				return window.getComputedStyle(this.elements[0],null).getPropertyValue(obj); 
			}else if (obj instanceof Object)
			{
				this.each(function(){
					for (key in obj)
					{
						this.style[key] = obj[key]
					}
				});
				return this ;
			}
		},
		attr:function(obj){
			if (typeof(obj) =="object")
			{
				this.each(function(){
					for (key in obj)
					{
						this.setAttribute(key,obj[key]);
					}
				});
				return this ;
			}else if (typeof(obj) == 'string')
			{
				return this.elements[0].getAttribute(obj)
			}
		},
		height:function(str){
			if (str === undefined)
			{
				return this.elements[0].offsetHeight || this.elements[0].innerHeight; // 还要考虑window情况

			}else{
				this.each(function(){
					this.style.height = str ;
				});
			}
		},
		width:function(str){
			if (str === undefined)
			{
				return this.elements[0].offsetWidth || this.elements[0].innerWidth;
			}else{
				this.each(function(){
					this.style.width = str ;
				});
			}
		},
		html:function(str){
			if (str === undefined)
			{
				return this.elements[0].innerHTML 
			}else{
				this.each(function(element){
					this.innerHTML = str
				});
				return this ;
			}
		},
		text:function(str){
			if (str === undefined)
			{
				return this.elements[0].textContent 
			}else{
				this.each(function(element){
					this.textContent = str
				});
				return this ;
			}
		},
		val:function(str){
			if (str === undefined)
			{
				return this.elements[0].value() ;
			}else{
				this.each(function(){
					this.value(str);
				});
				return this ;
			}
		},
		//--------------------- parent/find/children/parents 
		eq:function(index){
			return $(this.elements[index]);
		},
		parent:function(selector){ //外层包裹的父元素
			var type = this.selector(selector);
			var parent =[];
			this.each(function(){
				var thisParent = this.parentElement ;
				if (type==='tagName')
				{
					if(thisParent.tagName === selector.toUpperCase()) parent.push(thisParent)
				}else if (type === 'id')
				{
					if(thisParent.id === selector ) parent.push(thisParent)
				}else if (type === 'class')
				{
					if(thisParent.classList.contain(selector) ) parent.push(thisParent)
				}
			});
			this.elements = parent ;
			return this
		},
		parents:function(selector){  // 需要一直向上遍历出所有符合条件的元素，要出去数组中重复的元素
			var type = this.selector(selector);
			var parent =[];
			this.each(function(){
				var thisParent = this.parentElement ;
				if (type==='tagName')
				{
					while (thisParent.tagName != 'HTML')
					{
						if(thisParent.tagName === selector.toUpperCase()) parent.push(thisParent)
						thisParent = thisParent.parentElement
					}
				}else if (type === 'id')
				{
					while (thisParent.tagName != 'HTML')
					{
						if(thisParent.id === selector ) parent.push(thisParent)
						thisParent = thisParent.parentElement
					}
				}else if (type === 'class')
				{
					while (thisParent.tagName != 'HTML')
					{
						if(thisParent.classList.contain(selector) ) parent.push(thisParent)
						thisParent = thisParent.parentElement
					}
				}
			});
			deleteRepeat(parent); // 删除重复元素
			this.elements = parent ;
			return this
		},
		children:function(selector){
			var children = [] ;
			if(!!selector){
				var type = this.selector(selector);
				this.each(function(){
					if (type==='tagName')
					{
						children = slice.call(this.children).filter(function(ele){
							if (ele.tagName === selector.toUpperCase()) return true
							return false
						})
					}else if (type === 'id')
					{
						children = slice.call(this.children).filter(function(ele){
							if (ele.id === selector) return true
							return false
						})
					}else if (type === 'class')
					{
						children = slice.call(this.children).filter(function(ele){
							if (ele.classList.contain(selector)) return true
							return false
						})
					}
				});
			}else{
				this.each(function(){
					var thisChildren = slice.call(this.children) ;
					children = children.concat(thisChildren)
				})
			}
			deleteRepeat(children); // 删除重复元素
			this.elements = children ;
			return this
		},
		find:function(dom){
			var arr = [];
			this.each(function(){
				var arrDom = this.querySelectorAll(dom);
				var haha = [].slice.call(arrDom) ;
				arr = arr.concat(haha);
			});
			deleteRepeat(arr); // 删除重复元素
			this.elements = arr ;
			return this ;
		},
		length: function(){
			return this.elements.length ;
		},
		// ------------------------------------- 前一个/后一个/兄弟元素 -----------------------------------
		prev:function(index){
			var previousSibling = this.elements[0].previousSibling ;
			while (previousSibling.nodeType !== 1 && !!previousSibling)
			{
				previousSibling = previousSibling.previousSibling ;
			}
			return $(previousSibling)
		},
		next:function(index){
			var nextSibling = this.elements[0].nextSibling ;
			while (nextSibling.nodeType !== 1 && !!nextSibling)
			{
				nextSibling = nextSibling.nextSibling ;
			}
			return $(nextSibling)
		},
		siblings:function(){ // 删除本元素
			var arr = slice.call(this.elements[0].parentNode.children);
			arr.splice(arr.indexOf(this.elements[0]),1);
			this.elements = arr ;
			return this ;
		},
		//----------------- append/prepend/wrap/empty/remove -----------
		append:function(str){
			if (typeof(str) == 'string')
			{
				this.each(function(){
					this.innerHTML = this.innerHTML + str;
				})
			}
			return this ;
		},
		prepend:function(str){
			if (typeof(str) == 'string')
			{
				this.each(function(){
					this.innerHTML =  str + this.innerHTML;
				})
			}
			return this ;
		},
		before:function(str){
			if (typeof(str) == 'string')
			{
				var _this = this ;
				this.each(function(){
					var html = _this.fragment(str); // 之所以每次都要生成一个新的DocumentFragment是因为，insertBefore所新增的节点，同一个节点一次只能添加一个，负责会覆盖掉前面的
					var that = this ;
					html.forEach(function(ele){
						that.parentNode.insertBefore(ele,that)
					});
				})
			}
			return this ;
		},
		after:function(str){ //不能去改变outerHTML，因为这样原来this的已经改变了，zepto的方案是将传入的字符串进行解析生成【documentFragment】然后再操作
			if (typeof(str) == 'string')
			{
				var _this = this ;
				this.each(function(){
					var html = _this.fragment(str);
					var that = this ;
					html.forEach(function(ele){
						that.parentNode.insertBefore(ele,that.nextSibling)
					});
				})
			}
			return this ;
		},
		empty:function(){
			this.each(function(){
				this.innerHTML =  null;
			})
			return this ;
		},
		remove:function(){
			this.each(function(){
				this.parentNode.removeChild(this);
			})
		},
		//---------------- hide show
		hide:function(){
			this.each(function(){
				this.style.display = "none"
			})
		},
		show:function(){
			this.each(function(){
				this.style.display = "block"
				//这里有坑，如果是行内元素，show()岂不是要溢出，
				//先要判断其是否可见，如果可见，不做处理，如果不可见，获取data-display值，因此需要将其display值保存到哪个地方
			})
		},
		fragment:function(html){
			var fragment = document.createDocumentFragment();
			var div = document.createElement('div');
			fragment.appendChild(div);
			var div = fragment.querySelector('div');
			div.innerHTML = html ;
			return [].slice.call(div.childNodes);
		},
		// ------------------- offset/position -----------
		offset:function(){
			var rect = this.elements[0].getBoundingClientRect(); // getBoundingClientRect 返回的有width/height/top/bottom/left/right 其中bottom指的是top+height right指的是left+width
			return {'top':rect.top,'left':rect.left}
		},
		position:function(){ // 获取父元素，子元素的getBoundingClientRect，
			var rectParent,rectChild ;
			rectChild = this.elements[0].getBoundingClientRect();
			if (this.elements[0].parentElement)
			{
				rectParent = this.elements[0].parentElement.getBoundingClientRect();
			}
			return {'top':rectChild.top-rectParent.top ,
					'left':rectChild.left-rectParent.left }
		}
		// ------------------- innerwrap/outerwrap ----------- 包裹分为内包裹，外包裹 -------------
	}
	zepto.Z.prototype = $.fn ;
	return $ ;
})();

// ------------------------------ 事件 ----------
;(function($){
	var _zid = 1 ,handlers={};
	var isId = /^#[\w-]+$/ ;
	var isClass = /^\.[\w-]+$/ ;
	var isTagName = /^[\w]+$/ ;
	var userAgent = $.fn.userAgent();//输出一些有关客户端的信息

	function zid(element){
		return element._zid || (element._zid = _zid++ );
	}
	// --------- event ----------
		// 现在利用event.target可以实现事件委托了，但如说是添加的事件函数是匿名的，要想removeEventListener怎么办呢
		// zepto的解决方案是，把所有的时间函数，都存储到一个对象handlers里
		// 当需要执行的时候，从handlers内部查找，然后遍历出所有的方法，再执行
		// 步骤1：为对象添加唯一的标识符，也就是给对象添加一个对象【_zid=唯一Id】，当为对象添加事件的时候，先判断下对象时候存在这个【_zid】，存在的话就给对象添加事件【click】、【fun】
		// 步骤2：事件移除，removeEventListener(type,functionName)//如果是匿名的函数，那么就没有函数名了，只能将这个时间的所有响应函数移除掉
	function appendHanlder(type,that,selector,fun,usecaptrue){ //新增监听
		var id = zid(that);
		if (!!fun) // 事件监听
		{
			var handler = {};
			handler.fun = fun ;
			handler.funName = fun.name ;
			handler.type = type ;
			handler.selector = selector ;
			handler.usecaptrue = !!usecaptrue ; //是否捕捉事件
			handler.proxy = function(event){ // 在代理处要考虑四种情况，1，没有selector、selector为id、selector为class、selector为tagName
				if (!!selector)
				{
					if(isId.test(selector))
					{
						if(event.target.id === selector) fun.call(event.target,event)
					}else if (isClass.test(selector))
					{
						if(event.target.classList.contains(selector)) fun.call(event.target,event)
					}else if (isTagName.test(selector))
					{
						if(event.target.tagName.toLowerCase() === selector.toLowerCase()) fun.call(event.target,event)
					}
				}else fun.call(that,event)
			}
			if (handlers[id]) handlers[id].push(handler)
			else{
				handlers[id] = [handler];
			}
			that.addEventListener(type,handler.proxy,handler.usecaptrue);
		}else{ //直接触发事件
			(handlers[id] || []).forEach(function(element){
				var type = element.type ;
				var event = document.createEvent('Event');
				event.initEvent(type,true,true,null,null); // 初始化时间
				!!type && that.dispatchEvent(event) ; // 派发事件，事件立即执行
			})
		}
	}
	function removeHanlder(type,that,selector,funName){ //移除事件
		var id = zid(that);
		var handler = handlers[id] ;
		if (!!funName)
		{
			handler = (handler || []).filter(function(element){
				if(element.type === type && element.selector === selector && element.funName === funName){
					that.removeEventListener(type,element.proxy)
					return false 
				}
				return true ;
			 })
		}else{
			 handler = (handler || []).filter(function(element){
				if(element.type === type && element.selector === selector){
					that.removeEventListener(type,element.proxy)
					return false 
				}
				return true ;
			 })
		}
		handlers[id] = handler ;
	}
	$.fn.on=function(type,children,fun,usecaptrue){ // 事件委托的实现
		if (!(!!fun))  fun = children ,children = undefined ;
		this.each(function(){
			appendHanlder(type,this,children,fun,usecaptrue);
		});
		return this ;
	}
	$.fn.off = function(type,children,funName,usecaptrue){ // 如何删除事件匿名函数
		this.each(function(){
			removeHanlder(type,this,children,funName);
		})
		return this ;
	}
	$.fn.click = function(fun,usecaptrue){
		this.each(function(){
			appendHanlder('click',this,null,fun,usecaptrue);
		});
	}
	$.fn.dblclick = function(fun,usecaptrue){
		this.each(function(){
			appendHanlder('dblclick',this,null,fun,usecaptrue);
		});
	}
	$.fn.tap = function(fun,usecaptrue){
		this.each(function(){
			var touchmove = false ;
			appendHanlder('touchmove',this,null,function(){
				touchmove = true ;
			});
			appendHanlder('touchend',this,null,function(event){
				if(touchmove){
					touchmove = false ;
					return ;
				}
				console.log(touchmove)
				fun;
			},usecaptrue);
		});
		return this ;
	}
	$.fn.dblTap = function(dosth,usecaptrue){
		this.each(function(){
			var timeEnd1,timeEnd2 ;
			timeEnd1 = timeEnd2 = 0 ;
			this.addEventListener('touchend',function(event){
				timeEnd2 = timeEnd1 ;
				timeEnd1 = new Date().getTime();
				if (timeEnd1 - timeEnd2<300)
				{
					dosth.call(this); 
				}
			},usecaptrue);
		});
		return this ;
	}
	$.fn.focus = function(fun,usecaptrue){
		if(userAgent.moz){
			this.each(function(){
				appendHanlder('focus',this,null,fun,usecaptrue);
			})
		}else{
			this.each(function(){
				appendHanlder('focusin',this,null,fun,usecaptrue);
			})
		}
		return this ;
	}
	$.fn.blur = function(fun,usecaptrue){
		if(userAgent.moz){
			this.each(function(){
				appendHanlder('blur',this,null,fun,usecaptrue);
			})
		}else{
			this.each(function(){
				appendHanlder('focusout',this,null,fun,usecaptrue);
			})
		}
		return this ;
	}
})(Zepto);

window.$ = Zepto

// ------------- ajax ---------------------------- 对form元素的序列化
// ------------- 实现promise形式的ajax ---------------------
;(function($){
	$.isZ = function(object){
		return object instanceof Zepto
	}
	$.ajax = function(arg){
		if (typeof(arg) == "object"){
			var xhr = new XMLHttpRequest();
			var type = arg.type || 'POST' ,
			      dataType = arg.dataType || 'json',
			       url = arg.url ,
			       asyn = arg.asyn || true ;
			xhr.open(arg.type,arg.url,arg.asyn); 
			// xhr.timeout= 3000;//设置响应时间
			// xhr.ontimeout = function(){ // 请求超时的处理
			// 	xhr.abort() // 终止请求
			// 	console.log('请求超时');
			// }
			// xhr.responseType = dataType ;  // 设置返回数据
			xhr.onreadystatechange = function(){ // readystate变化时触发
				if (xhr.readyState===2)//
				{
					//console.log('以获取相应')
				}else if (xhr.readyState === 4) // 请求成功
				{
					//console.log(xhr.responseType,xhr.responseText)
					if (arg.success) arg.success(xhr.response) //将返回的数据，传入回调函数
				}
			}
			var formId = arg.formId ,formData,formObj; // 使用formdata 发送数 ， 优点在于可以多文件异步上传
			if (typeof(formId)=='string')
			{
				formObj = document.getElementById(formId)
				formData = new FormData(formObj);
			}else{
				formData = new FormData();
			}

			var data = arg.data ;
			if (typeof(data) == 'object')
			{
				for (key in data)
				{
					formData.append(key,data[key])
				}
			}

			xhr.send(formData);//可发送Array，string，document，blob，formdata
		}
	}
	//---------------------------- jsonp --------------------------
	$.jsonp = function(arg){
		var script = document.createElement('script') ,
			cbFunction = 'Jquery'+new Date().getTime() ,
			url = arg.url + '?callback=' + cbFunction  ,
			data = arg.data ;

		if (data) // 如果需要传递数据，就将数据添加到url 后面
		{ 
			for (key in data)
			{
				url = url +'&'+key+'='+data[key]
			}
		}
		script.setAttribute("type","text/javascript");
		script.src = url ;
		document.head.appendChild(script); // 启动请求
		 //自定义的回调函数result
		 if (arg.success)  window[cbFunction] = arg.success; 

		setTimeout(function(){ 
			document.head.removeChild(script);
			if (arg.error) arg.error(); // 请求失败
		},3000); // 设置请求时间
	}
})(Zepto)
