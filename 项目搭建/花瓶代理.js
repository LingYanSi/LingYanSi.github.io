/*
* @Author: zikong
* @Date:   2015-11-03 11:39:26
* @Last Modified by:   zikong
* @Last Modified time: 2015-11-18 13:46:07
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
