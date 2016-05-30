# php学习笔记

## 常用框架
- laravel

## 快速开启一个web服务
[参考文档](http://php.net/manual/zh/features.commandline.webserver.php)
```bash
cd dir # 工程目录
php -S localhost:8000
```
php会寻找工程目录下的 dir/index.php 作为入口文件，类似于node的app.js

## 遇到的问题
- 模板中的syntax问题
    ``` php
        <?php if( $a > 1 ): ?>
            <span>不拉拉</span>
        <?php elseif( $a < 3 ): ?>
            <span>注意要写成elseif而不能写成else if</span>
        <?php else: ?>
            <span>嘿嘿</span>
        <? endif; ?>

        <?php foreach ($variable as $key => $value): ?>
            code
        <?php endforeach ?>
    ```
    和一般的php语法不一样，这么做的好处在于更好服务于模板所要渲染的语言

- 模板变量？
    ```php
        <?php
            include 'tpl.php';
            // 在tpl中存在变量，如何把变量转成数据呢？
         ?>
        <?php
            function render(Array $data){
                // extract 会把数组的key转换成局部变量，value就是对应局部变量的值
                extract($data) ;
                include 'tpl.php';
            }
         ?>
    ```
