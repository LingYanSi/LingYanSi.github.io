var app = app || {} ;

(function($){

	app.noteView = Backbone.View.extend({
		tagName : 'li' ,
		template : _.template($('#wife').html()) ,
		render: function(){
			console.log(this.model.toJSON())
			this.$el.html(this.template(this.model.toJSON()));
			this.model.get('hidden') === 'true' ? this.$el.hide() : '' ;
			this.$delete = this.$('.delete') ;
			this.$name = this.$('.name');
			this.$age = this.$('.age') ;
			return this ;
		} ,
		initialize:function(){

			this.listenTo(this.model,'change',this.render);
			this.listenTo(this.model,'destroy',this.remove);
			this.listenTo(this.model,'visible',this.hide) ;
		} ,
		events : {
			'click .delete':'del' ,
			'dblclick .name':'nameEdit' ,
			'dblclick .age':'ageEdit' ,
			'keydown .name':'nameSave',
			'keydown .age':'ageSave',
			'blur .name':'nameSave',
			'blur .age':'ageSave'
		} ,
		del : function(){
			this.model.destroy();
		} ,
		nameEdit : function(){
			this.$name[0].setAttribute('contentEditable','true') ;
			this.$name[0].focus();
		},
		nameSave : function(){
			if(event.type=="keydown" && event.which!=13){
				return
			}
			this.$name[0].removeAttribute('contentEditable')  ;
			console.log(this.$name[0].textContent)
			if(this.$name[0].textContent !== this.model.get('name')){
				this.model.save({'name':this.$name[0].textContent});
				this.trigger('change')
			}
		},
		ageEdit : function(){
			this.$age[0].setAttribute('contentEditable','true') ;
			this.$age[0].focus();
		},
		ageSave : function(event){
			if(event.type=="keydown" && event.which!=13){
				return
			}
			this.$age[0].removeAttribute('contentEditable')  ;
			if(this.$age[0].textContent !== this.model.get('age')){
				this.model.save({'age':this.$age[0].textContent});
				this.trigger('change');
			}
		},
		hide : function(){
			console.log('大便了')
			if( parseInt( this.model.get('age') ) < parseInt(app.NoteFilter) ){
				this.model.save({'hidden':'true'});
				this.$el.hide()
			}else{
				this.model.save({'hidden':'false'});
				this.$el.show()
			}
		} ,
		dabian : function(){
			console.log('是谁在大便')
		}
	});
	console.log(app)

})(jQuery);