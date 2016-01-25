<?php
	header("Content-Type:text/html; charset=utf-8");
	//打开 images 目录
	$len = $_REQUEST['len'];
	
	$note = scandir("video");//获取note文件夹的目录，以数组形式返回
	$dir = (array)$note;
	array_splice($dir,0,2); //删除前两个元素.之所以大于1是因为，php数组前两个元素为‘.’‘..’
	$dir=array_reverse($dir);//反转数组
	if ($len>10){//滑轮下滑，动态加载
		if($len>count($dir))//如果所有日志加载完毕，不再输出
		{
			$dir='';
		}
		else
		{
			$dir=array_slice($dir,$len,$len+20);//每次加载20条
		}
	}
	else{//初次加载
		$dir=array_slice($dir,0,20);
	}
	echo json_encode($dir); 

	 
?> 