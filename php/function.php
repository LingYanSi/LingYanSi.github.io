<?php
class test {
    var $name, $age  ;
    function __construct($name="哈哈", $age=18){
        echo "构造函数" . PHP_EOL;
        echo "姓名:".$name ."年级:". $age . PHP_EOL ;
    }
    function __destruct(){
        echo "函数生命周期结束" . PHP_EOL;
    }
}

$con = new test ;
 ?>
