var app = angular.module('app',['ui.router']);

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
		console.log(name)
	}
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
		restrict:'AE' ,
		scope:{
			bang:'&'
		},
		template:'<input ng-model="he8i" type="text" /><button ng-click="bang({name:he8i})">哈哈哈</button>' 
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
			en:'='
		},
		template:'<br><input type="text" ng-model="en">'
	}
});

app.directive('ao',function(){
	return {
		restrict:'AE',
		scope:{
			ao:'@'
		},
		template:'<br><input type="text" ng-model="ao">'
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
				templateUrl:'template/index.html'
			}
		}
	})
})