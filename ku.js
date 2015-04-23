(function(){
	function _$(dom){
		var arr = document.querySelectorAll(dom);
		this.elements = [].slice.call(arr);
	}
	_$.prototype = {
		addClass:function(className){
			this.elements.forEach(function(element,index,array){
				array[index].classList.add(className)
			});
			return this ;
		},
		removeClass:function(className){
			this.elements.forEach(function(element,index,array){
				array[index].classList.remove(className)
			});
			return this ;
		}
	}
	 window.$ = function(arguments) {
		 return new _$(arguments);
	 }
})();