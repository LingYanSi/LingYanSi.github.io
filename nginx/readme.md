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


## 遇到的坑
nginx配置正确，却无法把请求转发出去
一般而言，如果配置正确，却出现与预期不符的现象，都是因为端口被占用
今天，就是因为nginx服务被启动的太过，导致的
打开任务管理器-》详细信息，结束相关进程
wind下 netstat -o 显示所有被占用的端口
