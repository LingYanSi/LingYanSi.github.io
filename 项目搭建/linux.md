# Linux

## 快捷键
ctrl + p 显示历史

## 设置或显示环境变量
export key=value

删除指定key
export -n key

列出所有的shell赋予程序的环境变量。
export　-p 　

其作用在于，为后面对的命令提供全局变量，以node距离，可以通过process.env来获取

## 软连接
npm install -g所安装的包的软连接，会放在node安装文件夹下的bin中
因此重新下载一个node的时候，需要重新添加一个PATH，如果使用的是nvm，会在你安装node的时候，自动为新增一个PATH

要知道linux下的所有命令，都是以link的形势存在于PATH下
link类似于json name -> real file path，执行的时候会执行real file path文件

这里有一个问题是，系统怎么知道用什么来解释执行 real file path的内容
所以，在real file path的头部，会有
```bash
#!/usr/bin/env node
```
这句话表示，系统会用node来执行本文件，当然他也可以是python/java/rust/go etc等其他语言

```
ln -s /path/to/your/bin/name /usr/local/bin/name
```
which command 可以查看指定命令的link位置

## PATH
查看所有PATH
- echo $PATH
- export -p

新增path
vim ~/.bash_profile
```
export = /your/new/path:$PATH
```
让path生效
source ~/.bash_profile
