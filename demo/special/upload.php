<?php
	header("Content-Type:text/html; charset=utf-8");

	if ((($_FILES["file"]["type"] == "image/gif")|| ($_FILES["file"]["type"] == "image/jpeg")|| ($_FILES["file"]["type"] == "image/pjpeg")|| ($_FILES["file"]["type"] == "image/jpg"))&& ($_FILES["file"]["size"] < 1024*1024*1024))
	  {
	  if ($_FILES["file"]["error"] > 0)
		{
			echo "Return Code: " . $_FILES["file"]["error"] . "<br />";
		}
	  else
		{

			if (file_exists("img/".$_FILES["file"]["name"]))
			  {
				  $len = stripos($_FILES["file"]["name"],'.');
				  $name = time();
				  $type = substr($_FILES["file"]["name"],$len);
				  move_uploaded_file($_FILES["file"]["tmp_name"],"img/".$name.$type);
				  $haha = "img/".$name.$type;
				  echo "{ \"pos\" : \"$haha\"}";
			  }
			else
			  {
				  $len = stripos($_FILES["file"]["name"],'.');
				  $type = substr($_FILES["file"]["name"],$len);
				  move_uploaded_file($_FILES["file"]["tmp_name"],"img/".$_FILES["file"]["name"]);
				  $haha = "img/".$_FILES["file"]["name"] ;
				  echo "{ \"pos\" : \"$haha\"}";
			  }
		}
	  }
	else
	  {
	  echo "Invalid file";
	  }

?>