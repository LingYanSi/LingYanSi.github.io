(function(){
	function _$(dom){
		if (typeof(dom) == 'string')
		{
			var arr = document.querySelectorAll(dom);
			this.elements = [].slice.call(arr);
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
		each:function(fun){
			this.elements.forEach(function(element){
				fun.call(element)
			});
		},
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
		//----------------- append/prepend/wrap/empty/remove
		append:function(str){
			if (typeof(str) == 'string')
			{
				this.elements.forEach(function(element){
					element.parentNode.innerHTML = element.parentNode.innerHTML + str;
				})
			}
			return this ;
		},
		prepend:function(str){
			if (typeof(str) == 'string')
			{
				this.elements.forEach(function(element){
					element.parentNode.innerHTML =  str + element.parentNode.innerHTML;
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
				element.parentNode.removeChild(elements);
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
		on:function(type,children,fun){
			this.elements.forEach(function(element){
				// 需要先获取子元素，然后判断当前对象是不是子元素的 子元素 ，但这样的弊端在于新添加的元素怎么处理
				var haha =	$(element).find(children);
				element.addEventListener(type,function(e){
					haha.elements.forEach(function(element){
						if (e.target && element.contains(e.target))
						{
							fun.call(element);//指针指向element
						}
					});
				});
			});
			return this ;
		},
		tap:function(dosth){
			this.elements.forEach(function(element){
				var timeStart,timeEnd ;
				element.addEventListener('touchstart',function(event){
					timeStart = new Date().getTime();
				});
				element.addEventListener('touchend',function(event){
					timeEnd = new Date().getTime();
					if (timeEnd - timeStart<100)
					{
						dosth.call(element); 
					}
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
	}
	 window.$ = function(arguments) {
		 return new _$(arguments);
	 }
})();