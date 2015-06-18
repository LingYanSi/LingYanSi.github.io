
function router(){
	// var r = routerSet ; // 这里有个问题，如果说在多处调用了router，并且对同一路由做出了
	// console.log('新建了一个路由') // 只能有一个路由，路由有一个事件集合

	var caches = [] ; // 用于缓存事件
	this.add = function(routerSet){
		var this_rs = [routerSet]; // 当添加一个routerSet时，只load这个
		load(this_rs);
		caches.push(routerSet); //把路由routerSet缓存起来
	}

	window.addEventListener('hashchange',function(){
		load(caches); // 当hash值变化时，执行所有缓存起来的routerSet
	}); 

	function load(arrS){ // 把[routerSet]数组传进来，然后遍历
		var router = location.hash.slice(1) ;
		if(router.indexOf('/')!==0){
			location.href = "#/"
		}
		// 事件的触发是因为 hashchange ,hash值改变以后，就把新的hash值解析一遍
		var arr = router.split(/\/+/) ; // 解析当前路由

		arrS.forEach(function(ele,index){
			var routerSet = ele ;
			var rsArr = Object.keys(routerSet) ; // 获取事件的所有属性，也就是获取到所有设置的路由
			var LEN = rsArr.length ;	// 路由数组的长度
			var matched = false ; // 是否已匹配到路由

			rsArr.forEach(function(ele,index){ // 遍历路由集合，然后做出相应处理
				var items = ele.split(/\/+/); // 判断长度，然后与arr做比较，得出是否符合路由，然后执行相关函数，还要判断是不是含有id
				var param ;
				if(items.length !== arr.length) return
				if(matched) return
				for( var i=0,len=items.length ;i<len;i++){
					if( items[i] === ':id'){ // 这里有问题，如果还需要后面的值也想等呢，这里应该先把arr[i]缓存起来
						param = arr[i] ; // 如果等于:id就把相对应的hash值，作为参数传递
						continue ;		// 还有个问题：如果有多个参数呢？
					}
					if(items[i] !== arr[i]){
						if(index == LEN-1) routerSet.others ? routerSet.others() : '' ;
						return
					}
				}
				param ? routerSet[ele](param) : routerSet[ele]() ;

				matched = true ;
			});
		});
	}
};

var Router = new router();
