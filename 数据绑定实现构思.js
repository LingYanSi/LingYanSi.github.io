谈一谈数据绑定

在ecmascript7中会增加observe特性，可以监听属性的变化
感觉angular，react之类的数据变化监听，也都是自己的一个polyfill

具体可以看看 https://github.com/Polymer/observe-js
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

});

--->怎么知道数据在变化，这里面有三种途径：
1.使用get,set方法来修改属性值，这样每次修改属性的时候，据可以监听得到了，据说backbone就是这么做的
var person = {
	name:'周恩来',
	get:function(){
		return this.name ;
	},
	set:function(name){
		this.name = name ;
	}
}
上面这一种方式的弊端在于，每新增一个对象，要在这个对象上加上get,set方法，有点麻烦，
在ES5中，新增的Object.defineProperty(obj,property,decription)可以比较优雅的解决这个问题

Object.defineProperty(person,'name',{
	get:function(){
		return this.value ;
	},
	set:function(newValue){
		this.value = newValue ;
	},
});

2.脏检测。

以Angular 1.x为代表的框架使用了脏检测来获知数据变更，这个机制的大致原理是：
保存数据的新旧值，每当有一些DOM或者网络、定时器之类的事件产生，用这个事件之后的数据去跟之前保存的数据进行比对，如果相同，就不触发界面刷新，否则就刷新。
并不是网上有人所传的每隔多少ms，去遍历所有需要监听的数据，其实想想也明白，如果真的这么做的话，性能小号就太大了

3.ES7的新特性 Object.observe

需要解决
1：传递一个对象进来后，下次对比的时候，如何在获取？
(function(){
	var cache = [] ; // 缓存数据
	function $wtach(obj,fun){
		cache
	}
})();

所谓双向绑定

view <---> model <---> 服务器

view的dom操作，会触发model改变，model的改变会向服务器发送请求

服务器响应成功，改变model，model改变改变dom

model会有哪些改变呢，增删改，add,remove,属性的改变
add,remove上面都可以绑定一些事件，触发view或者服务器层面的改变
属性改变可以使用get/set或者Object.defineProperty来解决

var collection = [
	{
		name:'周恩来'
	},
	{
		name:'邓颖超'
	},
];

我现在需要集合的增删改监的听功能

collection.add = function(){

};
collection.remove = function(){
	// model的销毁destory
}

需要对单一model的修改

model.save({
	key:value ; // 以键值对形式修改
})

model[index]
