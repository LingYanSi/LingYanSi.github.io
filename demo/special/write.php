<?php
	header("Content-Type:text/html; charset=utf-8");
	
	$add = $_REQUEST['add'];
	$href = $_REQUEST['href'];
	$title = $_REQUEST['title'];
	$content = $_REQUEST['content'];
	$nums = 'sp-item.json';
	$nums_content = file_get_contents($nums);
	if (strlen($nums_content)>4)
	{
		$nums_cont = substr($nums_content,0,-1);
		$json_item = $nums_cont.',{"img_add":"'.$add.'","href":"'.$href.'","title":"'.$title.'","content":"'.$content.'"}]' ;//以json对象形式写入json文件
	}
	else{//此条件对应无评论
		$nums_cont = substr($nums_content,0,-1);
		$json_item = $nums_cont.'{"img_add":"'.$add.'","href":"'.$href.'","title":"'.$title.'","content":"'.$content.'"}]' ;//以json对象形式写入json文件
		}
	file_put_contents($nums,$json_item);
	
	echo "{ \"user\" : \"hah\" }" ;
?>