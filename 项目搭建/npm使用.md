
# npm工作机制
[阮一峰](http://www.ruanyifeng.com/blog/2016/01/npm-install.html)

## 常用命令
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
## npm install
[这里](http://www.cnblogs.com/chyingp/p/npm-install-difference-between-local-global.html)
本地安装 npm
1. 将安装包放在 ./node_modules 下（运行npm时所在的目录）
2. 可以通过 require() 来引入本地安装的包

全局安装 npm i -g
1. 将安装包放在 /usr/local 下
2. 可以直接在命令行里使用

这就是为什么webpack/gulp之类的需要全局安装也需要本地安装的原因了

## 发布npm包

- npm init 填写必要的package.json信息
```js
{
  "name": "lyftp",
  // 每次npm publish的时候version需要不同
  "version": "1.0.2",
  "description": "lyftp is ftp package, you can upload an entire folder or a file",
  // 包依赖的入口文件
  "main": "index.js",
  // 命令行调用
  "bin": {
    //   需要注意如果想要在命令行使用，此key需要和package.name 相同
     "lyftp": "index.js"
  } ,
  "repositories": {

  },
  // npm run test 会执行对应的bash命令
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "wlingyan",
  "keywords": "ftp lyftp",
  "license": "ISC",
  // 开始时候的依赖的包
  "devDependencies": {
    "ftp": "^0.3.10"
  },
  // 被npm install安装的时候，会被一起下载的包
  "dependencies": {
    "ftp": "^0.3.10"
  }
}
```
## node-sass安装失败
[这里有解决方案](http://cnodejs.org/topic/5637549fd426a1404cbd0614)
node-sass的一个坑，直接使用npm安装后，还需要对原文件进行编译，这两个尝试安装一直提示 download form http://xxxx 失败
后来看到cnpm把node-sass也镜像了，然后使用cnpm安装，速度挺快

## npm升级包
```
npm i npm-check -g
```
使用三方包``` npm-check -u ```来升级安装包

## centos安装node

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

### 安装beta版本
安装最版本
npm i packagename@beta

### npm包位置
本地安装包的位置就在当前目录下的node_modules内
```bash
# 全局安装包使用--save，如此，在安装pack的时候，也会把依赖包安装进去
npm i xx --save  
# 一般业务用--save-dev
npm i xx --save-dev
```
全局安装包在 ~/.npm/下，对于cnpm来说，其位置在包安装结束的时候会被打印出来
