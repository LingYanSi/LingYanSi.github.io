# 玩一玩服务器

- 系统: Centos
- 云: 腾讯云 新加坡

## 登录
ssh登录

## 安装环境

### Git
直接安装吧
```
yum install git
```
### node
安装最新版本
- 安装gcc c语言编译
yum -y install gcc make gcc-c++ openssl-devel wget

- 下载
```bash
# 下载文件
wget 官网复制

# 解压文件
tar -xvzf 文件名

# 进入解压好的文件夹
cd 文件夹
# 生成配置文件
./configure
# 编译？
make install

# 检测是否安装成功
node -v
```
## node安装

### 下载该版本：
[淘宝镜像](https://npm.taobao.org/mirrors/node)
node的下载文件有三种
- node.exe/dmg 等点击安装包
- node-v7.1.0.tar.gz   源码，未编译
- node-v7.1.0-linux-x64.tar.gz  已编译，只需下载下来设置soft link即可

wget 任意版本

### 解压缩：
tar xf node-v0.10.36-linux-x64.tar.gz

### 更改目录名称
mv node-v0.10.36-linux-x64 nodejs

### 移动到指定目录
mv nodejs /data/

cd /data/nodejs/bin

### 设置软链接
ln -s /data/nodejs/bin/node /usr/local/bin/node
ln -s /data/nodejs/bin/npm /usr/local/bin/npm

### 查看当前安装的Node的版本：
node -v
