var app = app || {};

$(function(){
	new app.appView();
	Backbone.history.start();
})