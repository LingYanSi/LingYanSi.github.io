# PHP环境搭建

## Mac
Mac自带php，目前自带版本为5.6，为了用上最新的7.1版本，我们决定自己安装
```
brew install php
```
完全不符合我的预期
>brew 默认没有 php 安装包

很好，怎么办呢？
```
brew tap homebrew/dupes
brew tap josegonzalez/homebrew-php
```

现在可以安装php了
```
brew install php71 --with-imap --with-tidy --with-debug --with-mysql --with-fpm
```
- php71 表示php7.1
- with-mysql
- with-fpm

另一个需要注意的是对于web服务，我们一般是使用nginx代理，fpm起一个php服务
虽然php内部自带了一个http服务，但官方也说了只是用于开发环境
因为我们还是自己搞一个吧

## 启动应用
- 启动php-fpm
```
/usr/local/opt/php71/sbin/php-fpm
```
- 启动nginx代理

nginx中新建配置
```nginx
server {
        listen       8889;
        server_name  localhost;

        root /Users/wangyong/me/c-study/php/; # 该项要修改为你准备存放相关网页的路径

        # 所有请求都指向php文件，然后在这里对请求做处理 binggo
        location ~ {
            include /usr/local/etc/nginx/fastcgi.conf;
            fastcgi_intercept_errors on;
            # php-fpm默认监听9000
            fastcgi_pass   127.0.0.1:9000;
            # fastcgi_index  index.php;
            # 都执行同一个入口文件
            fastcgi_param SCRIPT_FILENAME /Users/wangyong/me/c-study/php/index.php;
        }

        #proxy the php scripts to php-fpm
    }

```
[mac下的环境配置](http://yansu.org/2013/12/11/lamp-in-mac.html)
[cgi与php-fpm关系](https://segmentfault.com/q/1010000000256516)
[为什么 PHP 必须依赖 web 服务器？](https://segmentfault.com/q/1010000000669165)

## 如何支持restful api
[这里](https://www.v2ex.com/t/278121)
网上教程 关于nginx config这一步，一般都只会说对于 location ~\.php$ 指向指定php文件
这当然是不好的，因为我们希望由php逻辑来决定，到底如何处理请求，这样我们才能获取完全的控制权嘛

## 语法教程
[教程](http://php.net/manual/zh/langref.php)
