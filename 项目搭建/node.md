## nodejs

### 下载
brew install node

### 升级
两种途径
1. brew update node
2. nvm
    - npm install nvm
    - nvm install 5.0 // 最新稳定版本
    - nvm use 5.0 // 使用最新版本

### 使用
node file.js

### 在服务器上运行
使用forever
1. 登录服务器：```ssh -p10022 zikong@10.11.2.103```
2. npm install forever
3. forever start app.js &
4. forever stopAll
5. 其他详见Github

### 框架Koa/Express
1. Koa
2. Express

### 模板引擎
1. jade
> jade是根据[缩进/空格]来解析的，因此要关闭编辑器的【在保存时，删除行尾空白字符】功能

2. ejs

### 跑在服务器上
