var app = angular.module('app',['ui.router']);
// ---------- 创建一个service ---------------
app.factory('listService',['$http', function($http){
	return {
		getList:function(name){
			return $http({
				method:'get',
				url:'json/'+name+'.json'
			})
		}
	}
}])
// ----------$http ---------
app.controller('loadList2',['$scope','$http','listService', function($scope,$http,listService){
	// $scope.wife = "宋小帆" ;
	listService.getList(
		'list'
	).success(function(data,status,headers,config){
		 console.log(data.list[0].name);
		$scope.haha = data.list ;
	}).error(function(data,status,headers,config){
		console.log('出错了');
	});
}])
// ----------$http ---------
app.controller('loadList',['$scope','$http',function($scope,$http){
	// $scope.wife = "宋小帆" ;
	$http({
		method:'get',
		url:'json/list.json'
	}).success(function(data,status,headers,config){
		 console.log(data.list[0].name);
		$scope.haha = data.list ;
	}).error(function(data,status,headers,config){
		console.log('出错了');
	});
}])
// ------- 控制器 ------------
app.controller('woShi',['$scope',function($scope){
	$scope.info = {
		name:"习近平",
		password:'1234564'
	}
	$scope.clear = function(){
		$scope.info = {
			name:null,
			password:null
		}
	}
	$scope.reset = function(){
		$scope.info = {
			name:"习近平",
			password:'1234564'
		}
	}
	$scope.set = function(){
		$scope.info = {
			name:"胡锦涛",
			password:'江泽民'
		}
	}
	$scope.consoleInfo = function(){
		console.log($scope.info)
	}

	$scope.menu = {show:false}
	$scope.menuToggle = function(){
		$scope.menu.show = !$scope.menu.show ;
	}

	$scope.list1Show = function(){
		$scope.list = [{name:'薄熙来'},{name:'周永康'},{name:'江泽民'},{name:'徐才厚'}]
	}
	$scope.list2Show = function(){
		$scope.list = [{name:'胡锦涛'},{name:'习近平'},{name:'习明泽'},{name:'王岐山'}]
	}
	
	$scope.sm = "控制器与指令的绑定" ;
	$scope.conSm = function(name){
		$scope.sm = name ;
	}
}])
app.controller('taShi',['$scope',function($scope){
	$scope.set2 = function(){
		alert('控制器taShi的set方法')
	}
	$scope.arr = ['张无忌']
}])
//  ----- 自定义filter
app.filter('smile',function(){
	return function(item){
		return item + '彭丽媛不是他第一任' ;
	}
});

// ------ 指令
app.directive('hello',function(){
	return {
		restrict:'AE' , // AEMC A指的是attribute E指的是element M指的是comment注释 C指的是class
		scope:{ // 因为每个控制器都有一个scope,这里为指令设置了一个独立的scope,不会影响其他同指令
			bang:'&' // 此绑定可传递对象
			,sm:'@'
		},
		transclude:true,
		template:'<div ng-transclude></div><input ng-model="sm" type="text" /><button ng-click="bang({name:he8i})">哈哈哈</button><span>我是hello</span>' 
		//看样子貌似template中的
		/*
		link:function(scope,ele,attr){
			scope.bang = attr.bang
		}
		*/
	}
});

app.directive('bye',function(){
	return {
		restrict:'AE',
		scope:{
			en:'=' // 双向绑定
		},
		template:'<br><input type="text" ng-model="en"><span>我是bye</span>'
	}
});

app.directive('ao',function(){
	return {
		restrict:'AE',
		scope:{
			ao:'@' //@绑定，传递的是字符串，将控制器的属性传递给ao
		},
		template:'<br><input type="text" ng-model="ao"><span>我是ao</span>',
		link:function(scope,element,attr){ // link属性所指向的函数会立即执行
			element.bind('click',function(){
				alert('我是通过指令中的link触发的')
			})
		}
	}
})
app.directive('fu',function(){
	return {
		scope:{}, // 创建私有scope
		restrict:'AE',
		controller:function($scope){ // controller会把方法暴露出去，供其他指令调用，感觉有点类似prototype，后面的指令对其继承
			$scope.arr = [] ;
			this.addfly = function(){
				$scope.arr.push('我会飞')
			}
			this.addfire = function(){
				$scope.arr.push('我会吐火')
			}
		},
		link:function(scope,element,attrs){ // scope指的是controller的$scope，element指的是被封装过的dom，attrs指的是属性
			element.on('mouseenter',function(){
				console.log(scope.arr)
			})
			element.on('click',function(){ // 此方法不执行，是因为创建了私有scope，致使scope不再指向控制器的scope
				scope.$apply(attrs.howtoload)
			})
		}
	}
})
app.directive('fly',function(){
	return {
		require:'^fu', // require表示依赖
		link:function(scope,element,attrs,fuCtrl){ // fuCtrl表示指令fu，他可以调用fu的controller提供的方法
			fuCtrl.addfly();
			element.on('click',function(){ // 
				scope.$apply(attrs.howtoload)
			})
		}
	}
})
app.directive('fire',function(){
	return {
		require:'^fu',
		link:function(scope,element,attrs,fuCtrl){
			fuCtrl.addfire();
		}
	}
})
// ------ 路由 -----------
app.config(function($stateProvider,$urlRouterProvider){
	$urlRouterProvider.otherwise('/index'); //除了下面规定外的路由处理
	$stateProvider
		.state('index',{ //针对不同的路由
		url:'/index',
		views:{
			'':{ //如果标签带有空的ui-view属性
				templateUrl:'template/index.html'
			},
			'other@index':{ // 模版内部嵌套的模板
				templateUrl:'template/other.html'
			}
		}
	})
	.state('book',{
		url:'/book',
		views:{
			'':{  //如果标签带有空的ui-view属性
				templateUrl:'template/other.html'
			}
		}
	})
})