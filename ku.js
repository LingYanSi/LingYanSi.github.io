(function(){
	function _$(dom){
		this.element = [].slice.call(document.querySelectorAll(dom));
		console.log(this.element)
	}
	_$.prototype={
		addClass:function(className){
			this.element.forEach(function(ele){
				ele.classList.add(className);
			});
			return this
		},
		removeClass:function(className){
			this.element.forEach(function(ele){
				ele.classList.remove(className);
			});
			return this
		},
		hasClass:function(className){
			this.element[0].classList.contain(className);
			return this
		},
		
		find:function(dom){
			
		}
	}
	window.$ = function(dom){
		return new _$(dom)
	}
})()