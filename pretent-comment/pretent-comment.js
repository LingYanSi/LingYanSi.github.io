/*
* date: 2015-08-04
* 使用localstorage来进行数据存储。
* 数据格式
	{
		name:'胡锦涛'
		time:1234556,
		content:'what the fuck'
	}
*/
// localStorage.clear();

var prevent = (function(){
	var dataStr ;
	var preventStr ;
	var preventObj ;
	var arr ;
	var $id,$idWrite,$idPresent ,
		$inputName , $textareaContent ;

	return {
		bind:function(id,arg1){
			dataStr = 'data'+( arg1||'' ) ;
			preventStr = localStorage.getItem(dataStr);
			console.log(preventStr)
			preventObj = JSON.parse(preventStr)|| {} ;
			arr = Object.keys(preventObj) ;

			$id = document.querySelector(id);
			$id.innerHTML = '<div class="prevent-comment">'+
								'<div class="prevent-comment-present"></div>'+
								'<div class="prevent-comment-write"></div>'+
							'</div>';
			$idWrite = $id.querySelector('.prevent-comment-write');
			$idPresent = $id.querySelector('.prevent-comment-present');

			this.renderWriteComponent();
			this.renderPresentComponent();
			var _this = this ;
			// 删除评论
			$idPresent.addEventListener('click',function(event){
				if(event.target.className == 'prevent-comment-delete'){
					var siblings = [].slice.call($idPresent.children) ;
					var index = siblings.indexOf(event.target.parentElement.parentElement);
					_this.remove(index);
				}
			});
			// 新增一个批论
			$idWrite.addEventListener('click',function(event){
				if(event.target.className == 'prevent-cw-add'){
					_this.getwriteComment();
				}else if(event.target.className == "prevent-cw-cancel"){
					_this.clearWriteComment();
				}
			});
		},
		getwriteComment:function(){
			var obj = {};

			obj.name = $inputName.value ;
			obj.content = $textareaContent.value ;

			if(!obj.name || !obj.content){
				alert('用户名或者评论不能为空');
				return
			}

			obj.time = new Date().getTime() ;
			this.add(obj);
			this.clearWriteComment();
		},
		clearWriteComment:function(){
			// 晴空评论区
			$inputName.value = '';
			$textareaContent.value = '';
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
			localStorage.setItem( dataStr , JSON.stringify(preventObj) );
			arr = Object.keys(preventObj) ;
			this.renderPresentComponent();
		},
		renderWriteComponent:function(){
			var str = '<input class="prevent-cw-name" type="text" placeholder="用户名"/>'+
						'<textarea name="" id="" placeholder="写点什么吧" style="display:block;height:3em;margin:1em 0;"></textarea>'+
					'<button class="prevent-cw-cancel">取消</button><button class="prevent-cw-add">确认</button>';
			$idWrite.innerHTML = str ;
			$inputName = $idWrite.querySelector('input') ,
			$textareaContent = $idWrite.querySelector('textarea') ;
		},
		renderPresentComponent:function(){
			if(!$idPresent) return
			var _this = this ;
			var str = arr.map(function(element,index,arr){
				var obj = preventObj[arr[index]] ;
				return '<div class="prevent-comment-item">'+
							'<h2>'+obj.name+'</h2>'+
							'<p>'+
								'<span>'+_this.formatDate(obj.time)+'</span>'+
								'<span> '+ (index+1)+'楼 </span>'+
								'<span class="prevent-comment-delete" style="cursor:pointer;"> 删除 </span>'+
							'</p>'+
							'<p>'+obj.content+'</p>'+
						'</div>' ;
			}).join('');
			$idPresent.innerHTML = str ;
			// console.log( JSON.parse(localStorage.getItem('data')) );
		},
		formatDate:function(time){
			var date = new Date(time) ;
			var year = date.getFullYear() ,
				month = date.getMonth()+1,
				day = date.getDate(),
				hour = date.getHours(),
				min = date.getMinutes(),
				sec = date.getSeconds();

			return year+'-'+month+'-'+day+' '+hour+':'+min+':'+sec ;
		}
	}
})();

// prevent.bind('#comment');
 // prevent.add( {name:'赵敏',time:'1027年',content:'张无忌，赵敏啊'} );
