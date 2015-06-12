var app = app || {} ;
(function(){
	var Router = Backbone.Router.extend({
		routes :{
			'*filter' : 'setFilter'
		},
		initialize : function(){
		},
		setFilter : function(parma){
			// console.log('路由变了');
			app.NoteFilter = parma || '' ; // 这里主要是为了给全局提供一个路由参数
			app.notes.trigger('filter') ; // 触发collection的过滤，然后再到每个model上去做出改变
										 // 其实这里也就是去调用notes的一个方法而已
		}
	});

	var router = new Router() ;
	Backbone.history.start();
	console.log('路由已启动');
})();