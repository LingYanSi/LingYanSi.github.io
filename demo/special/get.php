<?php
	header("Content-Type:text/html; charset=utf-8");
	
	$user = $_REQUEST['username'];
	$pass = $_REQUEST['password'];
	$login = file_get_contents('sp-item.json');//获取文本内容
	echo $login ;
?>