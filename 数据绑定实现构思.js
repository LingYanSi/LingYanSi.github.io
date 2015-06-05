谈一谈数据绑定

在ecmascript7中会增加observe特性，可以监听属性的变化
感觉angular，react之类的数据变化监听，也都是自己的一个polify

具体可以看看 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/observe
什么是【观察者模式？】

如何实现observe？
无非是不断的去对比数据，如果发生变化就做些事情

var obj = {
	a:0 ,
	b:2 ,
	c:3 
}

要监听数据变化，就先要备份数据，然后拿老数据和现在的数据做对比

如果要监听一个对象的某个属性，先声明，再缓存数据，然后按一定的时间频率去对比，angular的$scope.$watch，应该也是如此

格式如下，传递【对象，属性】属性可以不要，那么对应的值是不是只能是非引用型对象？
应该分为：obj.property 的监听，以及【数组、对象】的监听

$watch(obj,function(prev,now){

})

需要解决
1：传递一个对象进来后，下次对比的时候，如何在获取？
(function(){
	var cache = [] ; // 缓存数据
	function $wtach(obj,fun){
		cache
	}
})