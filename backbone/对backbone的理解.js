对backbone的理解

backbone
下面大致可分为【 view / model / collection / router /event 】
1. view
	view.render() 
	用来渲染template，template需要自定义
	render的触发也是手动的，也就是说，你必须要去监听collection或者model数据的变化，以此来触发render
	然后就得到view和model的一个绑定
	对于表单来说，用户的的【输入、点击】产生互动数据，这些数据是要保存在model/collection中
	因此需要在view中对一些元素做出监听，view中的el就表示这个view的root element
	研究todo的例子后，发现，如果用户要提交数据，是先把数据保存到model，然后model变化，触发view重新渲染
		view ---> model ---> view.render
		view ---> collection ---> view.render
	view可使用listenTo监听【model、collection】的变化

	其实view有了点MVC中controller的功能

2. model
	我自己理解为数据元，collection为数据集合
	model可这样定义
	var People = Backbone.Model.extend({
		default : {
			name : '周恩来' ,
			duty : '国务院总理'
		}
	});
	var people = new People();
	model 可以监听数据的变化，但观察todo的例子，没有在model中直接监听变化
		  只是，提供了一些【save，find】之类的方法
		  也就是说，在model层，只提供数据，做一些数据处理
		  但是监听数据变化的事情就交给了view层

3.collection
	算是同类型model的集合
	以todo为例子，一个collection保存的是一个item的集合，其数据类型完全相同
	todo的view分为appView和todoView
		appView负责整体表现,appView监听collection
		todoView负责某一细节表现，todoView监听model
		appView和todoView间的互动通过model实现

4. router
	路由
	var Router = new Backbone.Router.extend({
		router : {
			'index':'index' ,
			'book/:id':'book'
		} ,
		index : function(){
			dosth()
		} ,
		book : function(id){
			dosth();
		}
	})


如果要在页面【查找、过滤】某些内容，这是要用到router的，因为这算是页面的变化
如果在页面只是【增、删、改】，只使用view之类就可以了

