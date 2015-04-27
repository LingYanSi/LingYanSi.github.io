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
		}
	}
	_$.prototype = {
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
		//----------------hide show
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
		// ---------event----------
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
						dosth() ;
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
						dosth() ;
					}
				});
			});
		}
	}
	 window.$ = function(arguments) {
		 return new _$(arguments);
	 }
})();