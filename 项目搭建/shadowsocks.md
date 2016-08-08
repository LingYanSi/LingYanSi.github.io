# shadowsocks

[项目](https://github.com/shadowsocks/shadowsocks/wiki)
[介绍](http://www.barretlee.com/blog/2016/08/03/shadowsocks/)

## 服务器端配置

安装
```
apt-get install python-pip
pip install shadowsocks
```

添加配置文件到 /etc/shadowsocks.json
```json
{
  "server": "0.0.0.0",
  "server_port": 8388,  
  "local_address": "127.0.0.1",  
  "local_port": 1080,  
  "password": "PASSWORD",
  "timeout": 300,  
  "method":"aes-256-cfb",  
}
```

启动
```
ssserver -c /etc/shadowsocks.json -d start
ssserver -c /etc/shadowsocks.json -d stop
ssserver -c /etc/shadowsocks.json -d restart
```

打印日志
```
ssserver -c /etc/shadowsocks.json --log-file /tmp/ss.log -d start

cat /tmp/ss.log
# live log
tail -f /tmp/ss.log
```

## 客户端配置
[下载](https://github.com/shadowsocks/shadowsocks/wiki) 相对应的客户端
- 添加相应的配置字段：
- 开启系统代理：开启后小飞机icon会由灰色变成白色
- 系统代理模式：PAC模式，查看本地的PAC文件，可以知道他是一个多域名的数组，shadowsocks拦截系统内的所有请求，如果和PAC中的域名相匹配，就会走代理模式
