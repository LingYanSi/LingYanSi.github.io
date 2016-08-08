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
tar -xvzr 文件名

# 进入解压好的文件夹
cd 文件夹
# 生成配置文件
./config
# 编译？
make install

# 检测是否安装成功
node -v
```
