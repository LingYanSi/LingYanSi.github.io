

### npm工作机制
[阮一峰](http://www.ruanyifeng.com/blog/2016/01/npm-install.html)

```bash
npm config set loglevel=http # 打印所有http请求

# 官方仓库
npm config set registry https://registry.npmjs.org/

# 淘宝镜像
npm config set registry https://registry.npm.taobao.org

npm list packageName

npm update

npm i / install

npm uninstall

# 初始化一个npm项目
npm init

# npm升级
npm update -g npm

# npm卸载
npm uninstall -g npm

```

#### node-sass安装失败
[这里有解决方案](http://cnodejs.org/topic/5637549fd426a1404cbd0614)
node-sass的一个坑，直接使用npm安装后，还需要对原文件进行编译，这两个尝试安装一直提示 download form http://xxxx 失败
后来看到cnpm把node-sass也镜像了，然后使用cnpm安装，速度挺快

# centos安装node

在linux下，用yum安装的一般是稳定版本，如果要安装最新版本的话，需要使用自己编译
- wget 下载gz文件
- tar -xvcf 解压文件
- cd 文件夹
- ./configure 执行makefile文件
- make
- make install 如果这里安装不成功，一般是需要安装gcc
- yum install gcc
- yum install gcc-c++
- 再去make install 这时候可以去看集美剧，回来就安装好了
