<?php
	header("Content-Type:text/html; charset=utf-8");
	
	$user = $_REQUEST['username'];
	$pass = $_REQUEST['password'];
	$info = file_get_contents('per-info.json');//获取文本内容
	echo  $info;
?>