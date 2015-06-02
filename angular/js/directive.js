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
				scope.$apply(attr.hey);
			}
		}
	}
});