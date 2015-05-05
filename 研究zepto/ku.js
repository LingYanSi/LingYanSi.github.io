(function(){
	function _$(dom){
		if (typeof(dom) == 'string')
		{
			var arr = document.querySelector(dom);
			this.elements = [arr];
		}else if (typeof(dom) == 'function')
		{
			$(document).ready(function(){
				dom();
			});
		}else if (dom instanceof HTMLElement)
		{
			this.elements = [dom] ;
		}else if (Array.isArray(dom))
		{
			this.elements = dom ;
		}
	}
	_$.prototype = {
		selector:function(str){
			if( /\.[\w]+/.test(str) )
			{
				return 'class';
			}else if (/\#[\w]+/.test(str))
			{
				return 'id'
			}else if ( /\w+/.test(str))
			{
				return 'tagName'
			}
			return false ;
		},
		each:function(fun){
			this.elements.forEach(function(element){
				fun.call(element)
			});
		},
		addClass:function(className){
			this.elements.forEach(function(element,index,array){
				element.classList.add(className)
			});
			return this ;
		},
		removeClass:function(className){
			this.elements.forEach(function(element,index,array){
				element.classList.remove(className)
			});
			return this ;
		},
		css:function(obj){
			if (typeof(obj)==='string')
			{
				return window.getComputedStyle(this.elements[0],null).getPropertyValue(obj); 
			}else if (obj instanceof Object)
			{
				this.elements.forEach(function(element,index,array){
					for (key in obj)
					{
						element.style[key] = obj[key]
					}
				});
				return this ;
			}
		},
		attr:function(obj){
			if (typeof(obj) =="object")
			{
				this.elements.forEach(function(element,index,array){
					for (key in obj)
					{
						element.setAttribute(key,obj[key]);
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
				return this.elements[0].offsetHeight;
			}else{
				this.elements.forEach(function(element){
					element.style.height = str ;
				});
			}
		},
		width:function(str){
			if (str === undefined)
			{
				return this.elements[0].offsetWidth;
			}else{
				this.elements.forEach(function(element){
					element.style.width = str ;
				});
			}
		},
		html:function(str){
			if (str === undefined)
			{
				return this.elements[0].innerHTML 
			}else{
				this.elements.forEach(function(element){
					element.innerHTML = str
				});
				return this ;
			}
		},
		text:function(str){
			if (str === undefined)
			{
				return this.elements[0].textContent 
			}else{
				this.elements.forEach(function(element){
					element.textContent = str
				});
				return this ;
			}
		},
		val:function(str){
			if (str === undefined)
			{
				return this.elements[0].value() ;
			}else{
				this.elements.forEach(function(element){
					element.value(str);
				});
				return this ;
			}
		},
		//--------------------- parent/find/child/parents 
		find:function(dom){
			var arr = [];
			this.elements.forEach(function(element,index,array){
				var arrDom = element.querySelectorAll(dom);
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
				this.elements.forEach(function(element){
					element.innerHTML = element.innerHTML + str;
				})
			}
			return this ;
		},
		prepend:function(str){
			if (typeof(str) == 'string')
			{
				this.elements.forEach(function(element){
					element.innerHTML =  str + element.innerHTML;
				})
			}
			return this ;
		},
		after:function(str){
			if (typeof(str) == 'string')
			{
				this.elements.forEach(function(element){
					element.outerHTML =  element.outerHTML + str ;
				})
			}
			return this ;
		},
		before:function(str){
			if (typeof(str) == 'string')
			{
				this.elements.forEach(function(element){
					element.outerHTML = str +  element.outerHTML ;
				})
			}
			return this ;
		},
		empty:function(){
			this.elements.forEach(function(element){
				element.innerHTML =  null;
			})
			return this ;
		},
		remove:function(){
			this.elements.forEach(function(element){
				element.parentNode.removeChild(element);
			})
		},
		//---------------- hide show
		hide:function(){
			this.elements.forEach(function(element){
				element.style.display = "node"
			})
		},
		show:function(){
			this.elements.forEach(function(element){
				element.style.display = "block"
				//这里有坑，如果是行内元素，show()岂不是要溢出，
				//先要判断其是否可见，如果可见，不做处理，如果不可见，获取data-display值，因此需要将其display值保存到哪个地方
			})
		},
		// --------- event ----------
		on:function(type,children,fun){ // 事件委托的实现
			if (!(!!fun)) // 如果没有后代
			{
				this.elements.forEach(function(element){
					element.addEventListener(type,function(e){  // 选择器就那几种 tagName,class,id,name 然后就可以判断选择器是哪一种，
							console.log(e)
						children.call(this);//指针指向被点击对象
						//	console.log(element.events['click'])
					});
				});
			}else{
				if (this.selector(children) == 'id')
				{
					this.elements.forEach(function(element){
						element.addEventListener(type,function(e){  // 选择器就那几种 tagName,class,id,name 然后就可以判断选择器是哪一种，
							if (e.target.id == children.slice(1) )
							{
								fun.call(e.target);//指针指向被点击对象
							}
						});
					});
				}else if (this.selector(children) == 'class')
				{
					this.elements.forEach(function(element){
						element.addEventListener(type,function(e){  // 选择器就那几种 tagName,class,id,name 然后就可以判断选择器是哪一种，
							if (e.target.classList.contains(children.slice(1)))
							{
								fun.call(e.target);//指针指向被点击对象
							}
						});
					});
				}else if (this.selector(children) == 'tagName')
				{
					children = children.toUpperCase();
					this.elements.forEach(function(element){
						element.addEventListener(type,function(e){  // 选择器就那几种 tagName,class,id,name 然后就可以判断选择器是哪一种，
							if (e.target.tagName == children )
							{
								fun.call(e.target);//指针指向被点击对象
							}
						});
					});
				}
			}
			return this ;
		},
		off:function(type,children,fun){ // 如何删除事件匿名函数
			if (!(!!fun)) // 如果没有后代
			{
				this.elements.forEach(function(element){
					element.removeEventListener(type,function(e){  // 选择器就那几种 tagName,class,id,name 然后就可以判断选择器是哪一种，
						children.call(this);//指针指向被点击对象
					});
				});
			}else{
				if (this.selector(children) == 'id')
				{
					this.elements.forEach(function(element){
						element.removeEventListener(type,function(e){  // 选择器就那几种 tagName,class,id,name 然后就可以判断选择器是哪一种，
							if (e.target.id == children.slice(1) )
							{
								fun.call(e.target);//指针指向被点击对象
							}
						});
					});
				}else if (this.selector(children) == 'class')
				{
					this.elements.forEach(function(element){
						element.removeEventListener(type,function(e){  // 选择器就那几种 tagName,class,id,name 然后就可以判断选择器是哪一种，
							if (e.target.classList.contains(children.slice(1)))
							{
								fun.call(e.target);//指针指向被点击对象
							}
						});
					});
				}else if (this.selector(children) == 'tagName')
				{
					children = children.toUpperCase();
					this.elements.forEach(function(element){
						element.removeEventListener(type,function(e){  // 选择器就那几种 tagName,class,id,name 然后就可以判断选择器是哪一种，
							if (e.target.tagName == children )
							{
								fun.call(e.target);//指针指向被点击对象
							}
						});
					});
				}
			}
			return this ;
		},
		tap:function(dosth){
			this.elements.forEach(function(element){
				element.addEventListener('touchend',function(event){
						dosth.call(this); 
				});
			});
		},
		dbTap:function(dosth){
			this.elements.forEach(function(element){
				var timeEnd1,timeEnd2 ;
				timeEnd1 = timeEnd2 = 0 ;
				element.addEventListener('touchend',function(event){
					timeEnd2 = timeEnd1 ;
					timeEnd1 = new Date().getTime();
					if (timeEnd1 - timeEnd2<300)
					{
						dosth.call(element); 
					}
				});
			});
		}
		// ------------------------------ ajax ----------
	}
	 window.$ = function(arguments) {
		 return new _$(arguments);
	 }

	 // ------------- ajax ----------------------------
	 window.$.ajax = function(arg){
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
	window.$.jsonp = function(arg){
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

})();