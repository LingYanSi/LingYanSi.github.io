<?php

// 一般数组
$arr = array(1,2,3) ;
echo $arr ;
// 数组长度
$arr_count = count($arr) ;
echo "数组长度:$arr_count\n" ;
// 遍历数组
for( $index=0; $index<$arr_count; $index++){
    echo $arr[$index],"\n";
}

// 关联数组
echo "关联数组";
$arr = array("color"=>"red", "num"=>"$arr_count");
// 遍历关联数组
foreach ($arr as $key => $value) {
    echo $key, $value , "\n";
}

 ?>
