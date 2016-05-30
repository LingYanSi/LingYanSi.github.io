<?php

class DEMO{
    var $name;
    // static不能被实例调用，不能以->形式被调用
    public static $wife = '彭丽媛';

    function __construct($name=""){
        $this->name = $name;
    }
    // 可在任何地方被调用
    public function run(){
        echo $this->name .'跑起来了';
        $this->fuck();
        $this->ass();
    }
    // 自能在类本身，子类，父类中被调用
    protected function ass(){
        echo $this->name . '是被保护的';
    }
    // 自能在类本身中被调用
    private function fuck(){
        echo $this->name . '被fuck了';
    }

    // 未声明public private protected的方法默认为public
    function testPublic(){
        // DEMO::run();
        echo self::$wife ;
    }
}

class child extends DEMO {
    var $name = "周恩来";
    function __construct($name=""){
        // 父类的__construct函数必须被显示调用，才会被执行
        parent::__construct($name.'这个傻逼');
    }

    // 子类可以override父类的public/protected的属性与方法
}

$d = new child('习近平');
$d->run();
DEMO::testPublic();
// __construct方法不是静态方法
try{
    throw new Exception( "嘿嘿嘿IEhi诶嘿");
    child::__construct('胡锦涛');
}catch(Exception $e){
    echo '异常:'. $e->getMessage();
}

?>
