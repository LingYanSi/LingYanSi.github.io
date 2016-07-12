# HOST

## 修改hosts文件

- windows
hosts文件位置
```
windows/system32/drivers/etc/hosts
```
工具: SwitchHosts

windows修改hosts文件可能会提示没有权限，[这里有一个教程，解除权限](http://jingyan.baidu.com/article/e5c39bf56564a539d7603312.html)
如果每次，都自己手动切换host是一件很蛋疼的事情，因此会用到一些工具win下用SwitchHosts，github上有下载
这些工具的原理其实很简单，就是切换环境的时候，去修改host文件

- mac
hosts文件位置
```
/etc/hosts
```
工具: GasMask等

## 其他原理
浏览器访问一个网址，首先要去进行域名的DNS解析，如果hosts文件中有配置，就直接去访问配置过的ip

nginx起了一个本地服务之后，会根据相关域名，把请求指向不同的文件夹，也就是服务

之前犯的一个错误是以为，不同的服务肯定会占据一个端口，这里面其实有问题
