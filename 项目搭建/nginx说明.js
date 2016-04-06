/*
* @Author: zikong
* @Date:   2015-10-10 09:57:47
* @Last Modified by:   zikong
* @Last Modified time: 2015-10-10 09:58:14
*/

'use strict';
----------------------------------------------------------
nginx
是一个高性能的 HTTP 和 反向代理 服务器
也就是说一般的静态文件，直接由nginx服务器返回
而对于接口的请求，则使用PHP/java/nodejs/ruby/python之类的后端语言来实现

nginx的配置
默认情况下，nginx的请求在 servers文件夹下/在windows下，可能是在html文件夹下
nginx会有一个 nginx.conf 配置文件，它有自己的默认配置
当然，我们需要自己配置

nginx 的命令很简单
nginx -s reload  // 重新加载config
nginx -s stop // 停止
nginx -s quit  // 退出
nginx -s reopen  // 重新打开

// nginx 配置
#user  nobody;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;

    autoindex on;
    autoindex_exact_size off;
    autoindex_localtime on;

    server {
        listen       8080;
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
            root   html;
            index  index.html index.htm;
        }

        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

        # proxy the PHP scripts to Apache listening on 127.0.0.1:80
        #
        #location ~ \.php$ {
        #    proxy_pass   http://127.0.0.1;
        #}

        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        #location ~ \.php$ {
        #    root           html;
        #    fastcgi_pass   127.0.0.1:9000;
        #    fastcgi_index  index.php;
        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        #    include        fastcgi_params;
        #}

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #    deny  all;
        #}
    }


    # another virtual host using mix of IP-, name-, and port-based configuration
    #
    #server {
    #    listen       8000;
    #    listen       somename:8080;
    #    server_name  somename  alias  another.alias;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}


    # HTTPS server
    #
    #server {
    #    listen       443 ssl;
    #    server_name  localhost;

    #    ssl_certificate      cert.pem;
    #    ssl_certificate_key  cert.key;

    #    ssl_session_cache    shared:SSL:1m;
    #    ssl_session_timeout  5m;

    #    ssl_ciphers  HIGH:!aNULL:!MD5;
    #    ssl_prefer_server_ciphers  on;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}
    #include servers/*;
    include vhosts/*.conf;

}

// 项目配置 */

server {
    listen 80;
    server_name dev.xiaodian.com;
    root /data/app/gitlab/f-day/;
    index index.php;

    rewrite ^(?!\/(app|dist|node_modules)\/).*$  /index.php;


    location ~ \.php$ {
        fastcgi_pass  127.0.0.1:9000;
        fastcgi_index index.php;
        fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        include     /usr/local/etc/nginx/fastcgi.conf;
    }

     location ~ \.(js|css)?$ {
        expires    7d;
        access_log off;
        if (!-e $request_filename) {
            rewrite ^/(.+)$ /concat.php last;
       }
    }

    location ~ \.(js|css|less)?$ {
        ssi on;
        ssi_silent_errors on;
    }

    location /pc/shopadmin/tool/addpic {
            proxy_pass    http://www.xiaodian.com/pc/shopadmin/tool/addpic;
    }

    location /pc/shopadmin/tool/uploadimage {
            proxy_pass    http://www.xiaodian.com/pc/shopadmin/tool/uploadimage;
    }
 }

-> 请求代理
把指域名的请求代理到本地

server{
    listen 80;
    server_name dev.xiaodian.com;
    location / {
        proxy_redirect off;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://localhost:3000 ;
    }
    # access_log logs/songxiaofan.log;
}

-> 代理转发至指定ip
http://www.iteye.com/problems/94450
server{
    listen 80;
    server_name www.mogujie.com;

    location / {
        proxy_pass  http://127.0.0.1:8000;
    }
}
