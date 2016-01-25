/*
* @Author: zikong
* @Date:   2015-11-03 11:39:26
* @Last Modified by:   zikong
* @Last Modified time: 2016-01-13 15:32:38
*/

'use strict';

有的时候，需要别的机器代理到自己的主机上，访问本机的项目环境【其实可以用个360wifi来实现】
需要使用: charles

ie浏览器
工具-> Internet选项 -> 连接 -> 局域网设置 -> 代理服务器 -> 为LAN使用代理服务器
地址：本机的ip地址 端口：花瓶【8888】自定义 ，有时候端口可能被占用，需要使用其他端口

chrome
设置 -> 网络 -> 更改代理服务器设置 // 设下的步骤和ie一样

花瓶
在proxy setting中设置端口【port】

如果没有证书，正版花瓶会每30分钟重启一次。


破解版
v: 3.10.1

需要java环境
安装jdk

安装结束后
java -version // 检测是否安装成功

step:
替换Licence
cd /Applications/Charles.app/Contents/Java
wget https://raw.githubusercontent.com/100apps/charles-hacking/master/Licence.java
javac -source 1.6 -target 1.6 -d . Licence.java
jar -uvf charles.jar com/xk72/charles/gui/Licence*
rm -rf com
rm Licence.java
open /Applications/Charles.app
#此时启动的是已经注册过的版本了。

