var app = app || {} ;

(function(){
	app.Note = Backbone.Model.extend({
		default : { // 所谓default就是让所有新建的note/model都会有的属性
			name:'',
			age:'',
			hidden:false
		} 
	});
})();
