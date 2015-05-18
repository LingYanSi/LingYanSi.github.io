
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
			}else if (selector instanceof HTMLElement)
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
			hei.__proto__ = $.fn ;
			return hei
		}
		zepto.isZ = function(dom){
			return dom instanceof zepto.Z
		}
		$.fn = {
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
					return this.elements[0].offsetHeight ;

				}else{
					this.each(function(){
						this.style.height = str ;
					});
				}
			},
			width:function(str){
				if (str === undefined)
				{
					return this.elements[0].offsetWidth;
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
			//--------------------- parent/find/child/parents 
			find:function(dom){
				var arr = [];
				this.each(function(){
					var arrDom = this.querySelectorAll(dom);
					var haha = [].slice.call(arrDom) ;
					arr = arr.concat(haha);
				});
				this.elements = arr ;
				return this ;
			},
			//----------------- append/prepend/wrap/empty/remove
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
			fragment:function(html){
				var fragment = document.createDocumentFragment();
				var div = document.createElement('div');
				fragment.appendChild(div);
				var div = fragment.querySelector('div');
				div.innerHTML = html ;
				return [].slice.call(div.childNodes);
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
			// -------------------
			offset:function(){
				var rect = this.elements[0].getBoundingClientRect();
				return {'top':rect.top,'left':rect.left}
			},
			position:function(){
				var rectParent,rectChild ;
				rectChild = this.elements[0].getBoundingClientRect();
				if (this.elements[0].parentElement)
				{
					rectParent = this.elements[0].parentElement.getBoundingClientRect();
				}
				return {'top':rectChild.top-rectParent.top ,
						'left':rectChild.left-rectParent.left }
			}
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

		function zid(element){
			return element._zid || (element._zid = _zid++ );
		}
		// --------- event ----------
			// 现在利用event.target可以实现事件委托了，但如说是添加的事件函数是匿名的，要想removeEventListener怎么办呢
			// zepto的解决方案是，把所有的时间函数，都存储到一个对象handlers里
			// 当需要执行的时候，从handlers内部查找，然后遍历出所有的方法，再执行
			// 步骤1：为对象添加唯一的标识符，也就是给对象添加一个对象【_zid=唯一Id】，当为对象添加事件的时候，先判断下对象时候存在这个【_zid】，存在的话就给对象添加事件【click】、【fun】
			// 步骤2：事件移除，removeEventListener(type,functionName)//如果是匿名的函数，那么就没有函数名了，只能将这个时间的所有响应函数移除掉
		function appendHanlder(type,that,selector,fun){ //新增监听
			var id = zid(that);
			if (!!fun) // 事件监听
			{
				var handler = {};
				handler.fun = fun ;
				handler.funName = fun.name ;
				handler.type = type ;
				handler.selector = selector ;
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
				that.addEventListener(type,handler.proxy);
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
		$.fn.on=function(type,children,fun){ // 事件委托的实现
			if (!(!!fun))  fun = children ,children = undefined ;
			this.each(function(){
					appendHanlder(type,this,children,fun);
			});
			return this ;
		}
		$.fn.off = function(type,children,funName){ // 如何删除事件匿名函数
			this.each(function(){
				removeHanlder(type,this,children,funName);
			})
			return this ;
		}
		$.fn.click = function(fun){
			this.each(function(){
				appendHanlder('click',this,null,fun);
			});
		}
		$.fn.dblclick = function(fun){
			this.each(function(){
				appendHanlder('dblclick',this,null,fun);
			});
		}
		$.fn.tap = function(fun){
			this.each(function(){
				appendHanlder('touchend',this,null,fun);
			});
			return this ;
		}
		$.fn.dblTap = function(dosth){
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
				});
			});
		}
	})(Zepto);


	window.$ = Zepto
	
	// ------------- ajax ----------------------------
	;(function($){
		$.isZ = function(object){
			return object instanceof Zepto
		}
		$.ajax = function(arg){
				if (typeof(arg) == "object"){
					var xhr = new XMLHttpRequest();
					var type = arg.type || 'POST' ,
						url = arg.url ,
						asyn = arg.asyn || true ;
					xhr.open(arg.type,arg.url,arg.asyn); 
					xhr.timeout= 3000;//设置响应时间
					xhr.ontimeout = function(){ // 请求超时的处理
						xhr.abort() // 终止请求
						console.log('请求超时');
					}
					xhr.responseType = "json";  // 设置返回数据
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