<?php
    $request = $_SERVER["REQUEST_URI"];
    // 根据url来render不同的内容

    function render($name=""){
        $url = parse_url( $_SERVER["REQUEST_URI"] );
        $data = array('path'=>$url['path'] );
        extract($data) ;

        include './render/'. $name .'.php';
    }

    // 静态资源文件
    // 返回静态文件，查询文件是否存在

    render('home');
?>
