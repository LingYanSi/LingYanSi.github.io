var app = app || {} ;

(function(){

	var Notes = Backbone.Collection.extend({
		model : app.Note ,// collection是model的集合，因此在这里model是用来声明此collection指向哪个model
		localStorage : new Backbone.LocalStorage('note-hhhh') ,
					// 一般情况下 如果使用backbone之类的MV*框架，都是需要后台接口实现restful
					// 在生产环境都是使用 url ，这里为了测试方便就用了backbone.localStorage这个插件
		notHidden : function(){ 
			return this.where({'hidden':'false'}) ; // 返回所有含hidden:false的model
		}
	});

	app.notes = new Notes();
	// localStorage.clear();
	// console.log(app.notes.length)

})();