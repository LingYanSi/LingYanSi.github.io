　  require.config({
　　　　paths: {
　　　　　　"jquery": "jquery",
　　　　　　"rotate": "rotate"
　　　　}
　　});
	require(['jquery', 'rotate'], function ($, rotate){
　　　　rotate.run();
　　});