var app = app || {} ;
(function(){
	var Router = Backbone.Router.extend({
		routes :{
			'*filter' : 'setFilter'
		},
		initialize : function(){
			console.log('路由变了');
		},
		setFilter : function(parma){
			console.log('路由变了');
			app.NoteFilter = parma || '' ;
			app.notes.trigger('filter') ; // 触发collection的过滤，然后再到每个model上去做出改变
		}
	});

	var router = new Router() ;
})();