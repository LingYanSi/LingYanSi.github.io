jquery
1. $(dom).serialize() ; 
	生成一个字符串，但jquery会默认对其进行encodeURIComponent编码 
	这会造成中文乱码，因此需要对其生成的字符串进行解码 decodeURIComponenet(str,true);