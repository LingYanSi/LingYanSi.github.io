　  require.config({
　　　　paths: {
　　　　　　"jquery": "jquery",
　　　　　　"rotate": "rotate"
　　　　}
　　});
	require(['jquery', 'rotate'], function ($, rotate){
　　　　rotate.run();
		$('.rotate').click(function(e){
			console.log(e)
		})
		console.log(require);
　　});