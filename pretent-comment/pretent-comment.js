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
/*
	思考，从某种程度上来说，作为一个类似于backbone之类的库，维护一个data
	data改变然后将数据更新到view层
	如何合理的执行这个逻辑呢
	数据的改变无非增删改查
	并且，只有是重复性的数据才有双向绑定的需求
	说到这里插一句，状态机，为什么需要提供状态机呢，也就是在【改变前，改变后】做一些事情
	我想这其中的一些原因可以是为了提供动画

	所以，一般而言一个data的维护的对象都是对象数组
	数组中的一个对象会对应一个view，而且这个view有普适性，就像一条微博，一个评论一样
	这个对象数组会对应一个templete和dom元素

	举个例子，一个用户会有多条微博，一条微博会有多个评论
	多条微博和多条评论的区别在于templete和父元素。

	因此一个backbone对象理应对应一个dom元素，以及一个templete，如此这样才能在数据被修改后重新渲染view
	这其中还有一个东西就是需要绑定http
	因为数据修改后，不仅要更新到view上面，还要保存到服务器层面
	如何做好这一点也是一个问题。
	是不是需要给每一个backbone对象绑定一个请求地址呢？
	但只是绑定一个请求地址怕是不够，还需要一些参数呢，我新增一条评论，我需要把哪些参数发送给服务器
	需不需要带上用户信息呢？
	这个方面，如果后端接口设计得当，其实在templete设定的时候，就可以完成一些事情了

	flux的思想当然是很不错的
	所有的view层操作，所产生的改动，先改动到data，然后再更新到服务器(有时候不一定是必须的)，再更新到view
	库或者框架所做的事情就是，不去人为的操作更新到data，更新的服务器，重新渲染view
	只用绑定一个唯一标识，绑定一个templete，绑定一个url即可，剩下的一切交给库来做

	像jsx之类的语言，把js和html写在一起，个人认为也只是templete的一种进化，其中的逻辑也只是在templete发生渲染的时候，去判断

	prevent.bind({
		id:,
		url:,
		templete: //templete分两部分，一部分是展示区，一部分是添加评论区

	});
*/
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
