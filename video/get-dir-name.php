<?php
	header("Content-Type:text/html; charset=utf-8");
	//�� images Ŀ¼
	$len = $_REQUEST['len'];
	
	$note = scandir("video");//��ȡnote�ļ��е�Ŀ¼����������ʽ����
	$dir = (array)$note;
	array_splice($dir,0,2); //ɾ��ǰ����Ԫ��.֮���Դ���1����Ϊ��php����ǰ����Ԫ��Ϊ��.����..��
	$dir=array_reverse($dir);//��ת����
	if ($len>10){//�����»�����̬����
		if($len>count($dir))//���������־������ϣ��������
		{
			$dir='';
		}
		else
		{
			$dir=array_slice($dir,$len,$len+20);//ÿ�μ���20��
		}
	}
	else{//���μ���
		$dir=array_slice($dir,0,20);
	}
	echo json_encode($dir); 

	 
?> 