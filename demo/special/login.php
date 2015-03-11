<?php
	header("Content-Type:text/html; charset=utf-8");
	
	$user = $_REQUEST['username'];
	$pass = $_REQUEST['password'];
	$login = file_get_contents('login.json');//获取文本内容
	$up = json_decode($login,true);//将json对象转换成关联数组，关联数组的取值通过下面$up[0]['username']形式取出
	
	if ($up[0]['username'] == $user && $up[0]['password'] == $pass)
	{
		echo "{ \"user\" : \"通过\" }" ;
	}
	else{echo "{ \"user\" : \"失败\" }" ;}
	//$hah = $up[0]['1'];
	//echo "{ \"user\" : \"$hah\" }" ;
?>