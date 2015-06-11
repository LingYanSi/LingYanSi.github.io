var app = app || {} ;

(function($){

	app.noteView = Backbone.View.extend({
		tagName : 'li' ,
		template : _.template($('#wife').html()) ,
		render: function(){
			console.log(this.model.toJSON())
			this.$el.html(this.template(this.model.toJSON()));
			console.log(this.el)
			return this ;
		} ,
		initialize:function(){
			this.$delete = this.$('.delete') ;

			this.listenTo(this.model,'change',this.render);
			this.listenTo(this.model,'destroy',this.remove);
			this.listenTo(this.model,'visible',this.hide) ;
		} ,
		events : {
			'click .delete':'del'
		} ,
		del : function(){
			this.model.destroy();
		} ,
		hide : function(){
			console.log('大便了')
			if( parseInt( this.model.get('age') ) < parseInt(app.NoteFilter) ){
				this.$el.hide()
			}else{
				this.$el.show()
			}
		} ,
		dabian : function(){
			console.log('是谁在大便')
		}
	});
	console.log(app)

})(jQuery);