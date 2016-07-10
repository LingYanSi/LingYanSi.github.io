

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
