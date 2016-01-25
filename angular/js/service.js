var appSer = angular.module('appSer',[]);

/*
provider定义的东西，都可以通过$injector在[controller,filter,dirctive等]中注入
provider实际上是两种设计模式的综合体:工厂模式、策略模式
其目的是为了接口和实现的分离，我的理解是就是写一个对象，以供其他使用

provider、factory、service、constant、value
后面的四种形式，其实都是对provider的一个封装实现，类似于$ajax(),$get()，只是为了方便调用

controller注入的是service，像$http等都是内置的service
*/

appSer.provider('game',function(){
	return {
		$get: function(){
			function run(){
				console.log('provider兽人必须死开始了')
			}
			return {
				name:'兽人必须死',
				run:run
			}
		}
	}
});
/*
appSer.factory('game',function(){
	function run(){
		console.log('factory江西剿匪记开始了')
	}
	return {
		name:'兽人必须死' ,
		run:run
	}
});
*/
/*
appSer.service('game',function(){
	this.name = '兽人必须死' ;
	this.name = '江西剿匪记' ;
	this.run = function(){
		console.log('service江西剿匪记开始了')
	}
})
*/
/*
var game = {
	name:'兽人必须死',
	run:function(){
		console.log('兽人必须死开始了')
	}
}
appSer.constant('game',('constant兽人必须死',123456789));
appSer.constant('game',game);
//constant表示常量的意思,他和value方法没什么差别，都可以传递【string，boolean，number，object】

appSer.value('game',game)
*/