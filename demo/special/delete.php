<?php
	header("Content-Type:text/html; charset=utf-8");
	
	$pos = $_REQUEST['pos'];
	$array = explode('_',$pos);
	$len = count($array)-2;
	$haha = $array[$len];
	//获取数组中的每个值，然后再获得到的json文件中，获取每个图片地址。然后删除图片，删除对象。
	if (file_exists('sp-item.json'))
	{
		$up = file_get_contents('sp-item.json');
		$login = json_decode($up,true);//将json对象转换成关联数组，关联数组的取值通过下面$up[0]['username']形式取出
		
		for($i=0;$i<=$len;$i++)
		{
			if (file_exists($login[$array[$i]]['img_add']))
			{
				unlink($login[$array[$i]]['img_add']);
				array_splice($login,$array[$i],1);
			}
			else{array_splice($login,$array[$i],1);	}	//array_splice($up,$floor,1);$floor声明删除起始位置，1表示所要删除的长度，如果没有则删除全部，若为负值，则是倒着计算
		}
		file_put_contents('sp-item.json',ch_json_encode($login));//之所以不用json_encode是因为在将php数组转化成json时候，会导致再用文本查看json的时候，中文不能正常显示。因此用ch_json_encode;把一个空数组转化成json对象，输出为[]
	}
	

	echo $array[0];
	function ch_json_encode($data) {
	   function ch_urlencode($data) {
		   if (is_array($data) || is_object($data)) {
			   foreach ($data as $k => $v) {
				   if (is_scalar($v)) {
					   if (is_array($data)) {
						   $data[$k] = urlencode($v);
					   } else if (is_object($data)) {
						   $data->$k = urlencode($v);
					   }
				   } else if (is_array($data)) {
					   $data[$k] = ch_urlencode($v); //递归调用该函数
				   } else if (is_object($data)) {
					   $data->$k = ch_urlencode($v);
				   }
			   }
		   }
		   return $data;
	   }
	   
	   $ret = ch_urlencode($data);
	   $ret = json_encode($ret);
	   return urldecode($ret);
	}
	
?>