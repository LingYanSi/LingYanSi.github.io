var app = app || {} ;

(function($){
	app.appView = Backbone.View.extend({
		el : '#sxf' , // 定义当前view的root element
			// 使用underscore提供的模板引擎，也就是在html中可使用【javascript】类似于服务端的ejs
		template : $('#template-footer').html() ,
		initialize : function(){	// 初始化
			this.$wName = this.$('#wName') ;
			this.$wAge = this.$('#wAge') ;
			this.$info = this.$('#info') ;

			this.listenTo(app.notes,'add',this.add);
			this.listenTo(app.notes,'reset',this.addAll);
			this.listenTo(app.notes,'filter',this.filterAll); // 这里只是给notes添加一个方法而已
			this.listenTo(app.notes, 'all', _.debounce(this.render, 0));
			// this.listenTo(app.notes,'all', _.debounce(this.addAll,0) )

			app.notes.fetch({reset: true});

			// this.render()
		} ,
		render : function(){ // 渲染
			this.$('#footer').html( this.template );
			console.log(app.NoteFilter)
			this.$('#footer a').removeClass('current').filter('[href="#/'+(app.NoteFilter||'')+'"]').addClass('current')
		} ,
		events : {
			'click #append':'appendOne' ,
			'keydown #wName':'appendOne' ,
			'keydown #wAge':'appendOne' ,
			'change #select':'select'
		},
		newAttribute : function(){
			return {
				name : this.$('#wName').val() ,
				age : this.$('#wAge').val() ,
				show : false
			} ;
		},
		appendOne : function(event){
			if(event.target.id != 'append' && event.which != 13){ // 用于检测是否是输入框的，并检测是不是enter按键
				return
			}
			if( !(this.$wName.val() && this.$wAge.val()) )  // 用于检测信息是不是完整
			{
				alert('信息不完整');
				return ;
			}
			app.notes.create(this.newAttribute());
			this.$wName.val('');
			this.$wAge.val('');
			this.$wName.focus();
		} ,
		add : function(note){ // 如果新添加一个item，就需要重新渲染一个上去
			// console.log(app);
			var view = new app.noteView( {model:note} );
			this.$info.prepend( view.render().el );
		},
		addAll : function(){
			console.log('我把localstorage加载了一遍')
			app.notes.each(this.add,this)
		} ,
		filterOne : function(note){
			note.trigger('visible')
		},
		filterAll : function(){
			app.notes.each(this.filterOne,this)
		}

	})
})(jQuery);