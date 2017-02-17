## nginx使用

- mac
    - 启动 ``` nginx ```
    - 退出 ``` nginx -s quit ```
    - 重启 ``` nginx -s reload ```
    - 停止 ``` nginx -s stop ```

- windows
    - 下载，解压 ，进入相应目录
    - 启动 ```start nginx ```
    - 退出 ``` nginx -s quit ```
    - 重启 ``` nginx -s reload ```
    - 停止 ``` nginx -s stop ```

- linux
    - yum install nginx
    - wget [官网下载](https://nginx.org/en/download.html) gz文件
    - 解压 tar -xzvf nginx-1xxxx.gz
    - 进入文件夹
    - ./configure --prefix=/usr/local/nginx-1xxx --width-module
    - make
    - make install
    - 安装成功
    - 启动 /usr/local/nginx-1xxx/sbin/nginx
    - 退出 /usr/local/nginx-1xxx/sbin/nginx -s quit
    - 其他命令如上
    - 可以看得出来nginx被安装在/usr/local/nginx-1xxx

- mac
    Docroot is: /usr/local/var/www

    The default port has been set in /usr/local/etc/nginx/nginx.conf to 8080 so that
    nginx can run without sudo.

    nginx will load all files in /usr/local/etc/nginx/servers/.

## 遇到的坑
nginx配置正确，却无法把请求转发出去
一般而言，如果配置正确，却出现与预期不符的现象，都是因为端口被占用
今天，就是因为nginx服务被启动的太过，导致的
打开任务管理器-》详细信息，结束相关进程
wind下 netstat -o 显示所有被占用的端口

## 安装三方module
[一篇文章](http://www.ttlsa.com/nginx/how-to-install-nginx-third-modules/)

### 显示版本信息
/usr/local/nginx-1xxx/sbin/nginx -v

### 显示所有信息，包括configure信息
/usr/local/nginx-1xxx/sbin/nginx -V

当我们在安装三方包的时候，需要把原来的configure信息带上，因为从本质上讲，我们是从新打包了一个可执行的nginx文件
- 进入解压后的nginx文件夹
- ./configure --prefix=/usr/local/nginx-1.10 --with-http_ssl_module --with-pcre --add-module=三方包路径 --add-module=三方包路径
- make 打包
- /usr/local/nginx-1xxx/sbin/nginx -s stop
- cp objs/nginx /usr/local/nginx-1xxx/sbin/
- /usr/local/nginx-1xxx/sbin/nginx

## nginx常用module
[modules](https://www.nginx.com/resources/wiki/modules/)
- 待补充
