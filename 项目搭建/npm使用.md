
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
