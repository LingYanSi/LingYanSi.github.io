/*
* @Author: zikong
* @Date:   2015-12-16 11:30:22
* @Last Modified by:   zikong
* @Last Modified time: 2015-12-16 11:37:11
*/

'use strict';

 开发人员： 让你可以访问机房中的特定服务器、可以让你在公司以外的地方访问内网（mogujie.org 以及后缀为这个的内网地址）
 一般人员： 可以让你在公司以外的地方访问内网（mogujie.org 以及后缀为这个的内网地址）

vpn工具，在mac上一般用的是Tunnelblick

Tunnelblick的配置

client
dev tun
proto tcp
# 远程
remote tunnel.juangua.com 1194
nobind
persist-key
persist-tun
auth-user-pass
ca ca.crt
comp-lzo
