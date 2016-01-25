var appDir = angular.module('appDir',[]);

/*
* 在angular中directive的执行是分为两个阶段的compile和link
*/

/*
*其实ng-app也是一个directive
*1.加载阶段 
	加载angular.js，找到ng-app指令，确定应用便捷
*2.编译阶段
	遍历DOM，找到所有指令
	根据指令代码中的template、replace、transclue转换DOM结构
	如果存在compile函数则调用
*3.链接阶段
	对每一条指令运行link函数
	link函数一般用来操作DOM,绑定事件监听器

*** compile函数用来对模板自身进行转换，而link函数负责在模板和视图间进行动态关联
	作用域在链接阶段才会被绑定到编译之后的link函数上
	compile函数仅仅在编译阶段运行一次，而对于指令的每个实例，link函数都会执行一次
	compile可以返回preLink和postLink函数，而link只会返回postLink函数
	如果需要修改DOM结构，应该在postLink中来做这件事情，如果在preLink中作这件事情会导致错误
	大多时候我们只需要编写link函数即可
*/

appDir.directive('ajax',function(){
	return{
		restirct:'E' , // restrict：限定，表示限定指令？
					// E表示element，A表示attribute，EA顾名思义表示两者都可以，C表示class,M表示comment注释【后两种不建议使用】
		template:'<div>点击alert</div><div ng-transclude></div>' , 
		// templateUrl:'一个网址' , // 这里会加载模版
		// replace:false, // 是否替换指令内部的元素，只要含有此属性，就会替换
		transclude:true, // 表示可以把指令内部的元素，放在template内含有ng-transclude属性的元素内
		link:function(scope,element,attr){ // 表示指令连接
			// scope绑定，element这个元素，attr可获取属性，
			element.on('click',function(){
				alert('我被电击了')
			});
		} ,
		compile:function(element,scope){ // compile：编译，此函数表示指令编译，如果compile和link同时出现，执行compile
										// compile作用是对指令的模板进行转换
										// compile函数仅会在编译阶段执行一次
			element.append('<p>我是后面添加的</p>')
			console.log('我先执行') ; // 只会被执行一次，这是不是说明此次操作实在ng-repeat之前进行的？

			return function(scope,element,attr){ //return的就是link函数
												// link的作用是在模型和视图之间建立关联，包括在元素上注册监听事件，一般用来操作dom
												// link函数在编译结束后执行
				console.log('我是指令compile') ; // 会执行多次，这是不是说明此次操作实在ng-repeat之后进行的？
				element.append('<p>--------我是后面添加的</p>')
				element.on('click',function(){
					alert('天哪')
				});
				console.log(attr.hey)
				// scope.$apply(attr.hey);
				scope.run();
			}
		}
	}
});

/*
* 如何通过一个指令，修改另一个控制器的scope，或者使用另一个控制器的scope
* 这个其实可以通过指令的依赖来实现
 
* 指令主要是为了在不同的控制器内复用
*/
appDir.directive('parent1',function(){
	return {
		scope:{},
		restrict:"AE" ,
		controller:function($scope){
			this.setName = function(){
				// console.log('我被打印出来了')
				$scope.name = "宋小帆"
				console.log($scope)
			}
		} ,
		link:function(scope,element,attr){
			element.on('click',function(){
				scope.name = "heihei"
			})
		}
	}
});

appDir.directive('child1',function(){
	return {
		scope:{
			sb:'@' , // @用于传递字符串,当属性变化是，只有同指令内部属性会跟随变化，父controller的属性不会
			// ha:'=' , // = 用书双向绑定，传递字符串
			greet:'&' // & 用于绑定函数，如果函数需要传递参数则用 greet({name:value}) 键值对形式传递
		},
		restrict:'AE',
		// replace:false ,
		template:'<br /><span ng-bind="sb"></span><span ng-bind="sb" ng-click="greet()"></span><input type="text" ng-model="sb" /><br />' ,
		link:function(scope,element,attr){
			element.on('click',function(){
				// scope.resetName()
			});
		}
	}
});

appDir.directive("drink", function() {
    return {
    	restrict:'AE',
        scope:{
        	flavor:'='
        },
        template:'<input type="text" ng-model="flavor"/>'
    }
});
/*
	<child1 sb="{{name}}" greet="resetName()"></child1>
	<drink flavor="name"></drink>
	使用【@】绑定 -----> {{}}
	使用【=】绑定 -----> 直接写变量名
	使用【&】绑定 -----> 直接写function调用
*/

/*
	独立scope
	假设有如下，当我们点击元素的时候，发现数据并没有改变，但如果console.log(scope)
	会发现，scope其实已经变了，不是说好的双向绑定吗？
	segmentfault上的一个回答的解释是
		是因为click事件本身对于angular来讲是未知事件，
		也就是说，虽然你在callback里赋了值(实际上你的赋值操作也确实成功了)，
		但因为angular不知道这个变化，所以没有将你在页面上的引用也修改掉。 
		$apply的作用就是通知angular说“哥们儿，这变了，注意下”
	虽说可以这样做，但是不建议，因为如此一来会导致controller的$scope的属性变化，可能会引起多个directive下的同名属性的变化
	因此使用上面的写法，为每个directive创建一个独立scope

	appDir.directive('child1',function(){
		return {
			restrict:'AE',
			template:'<span ng-bind="name"></span>',
			link:function(scope,element,attr){
				element.on('click',function(){
					scope.name = "我变了" ;
					//因此要加上下面这句代码、
					console.log(scope.name)
					scope.$apply();
				})
			}
		}
	})
*/
