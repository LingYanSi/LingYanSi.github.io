/*
* 使用localstorage来进行数据存储
* 顾名思义，是假装可以评论。
*/
/*
{ 
	name:'胡锦涛'
	time:1234556,
	content:'what the fuck'
}
*/
// localStorage.clear();

var prevent = (function(){

	var preventStr = localStorage.getItem('data');
	var preventObj = JSON.parse(preventStr)|| {} ;
	var arr = Object.keys(preventObj) ;
	var $id ;

	return {
		bind:function(id){
			$id = document.querySelector(id);
			this.render();
			var _this = this ;
			$id.addEventListener('click',function(event){
				if(event.target.className == 'prevent-comment-delete'){
					var siblings = [].slice.call($id.children) ;
					var index = siblings.indexOf(event.target.parentElement); 
					_this.remove(index);
				}
			});
		},
		add:function(obj){
			preventObj[new Date().getTime()] = obj ;
			this.update();
		},
		remove:function(index){
			delete preventObj[arr[index]] ;
			this.update();
		},
		reset:function(index,obj){
			preventObj[arr[index]] = obj ;
			this.update();
		},
		update:function(){
			localStorage.setItem( 'data', JSON.stringify(preventObj) );
			arr = Object.keys(preventObj) ;
			this.render();
		},
		render:function(){
			if(!$id) return
			var str = arr.map(function(element,index,arr){
				var obj = preventObj[arr[index]] ;
				return '<div class="prevent-comment-item"><h2>'+
						obj.name+'</h2><span>'+
						obj.time+'</span><span class="prevent-comment-delete">删除</span><p>'+
						obj.content+
					'</p></div>' ;
			}).join('');
			$id.innerHTML = str ;
			// console.log( JSON.parse(localStorage.getItem('data')) );
		}
	}
})();

prevent.bind('#comment');
 // prevent.add( {name:'赵敏',time:'1027年',content:'张无忌，赵敏啊'} );