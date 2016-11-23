## Shell
Shell 是一个用C语言编写的程序，它是用户使用Linux的桥梁。Shell既是一种命令语言，又是一种程序设计语言。
Shell 是指一种应用程序，这个应用程序提供了一个界面，用户通过这个界面访问操作系统内核的服务。
Ken Thompson的sh是第一种Unix Shell，Windows Explorer是一个典型的图形界面Shell

### 坑
    - 保留变量：
        今天在写一个脚本的时候，定义了一个PATH变量，然后脚本就跑不通了。。。
        有一个保险的做法是，变量都使用xx_yy形式，就不会与系统变量冲突了

## 命令连接符
[参考](https://linux.cn/article-2469-1.html)
```
& 后台执行: 用是使命令在后台运行。
| 管道，会把前一个命令的执行结果当做参数，传递给后一个命令
{} 命令合并操作符： 感觉和()没有什么区别
|| 或，只有前一个命令执行错后的时候参会执行后一个
&& 于，只有前一个执行成功，后一个执行
; 不论前一个执行是否成功，都会执行
() 优先操作符：在shell内没有一般编程语言的优先级，而是从左至右按顺序执行 touch a || touch b && touch c || touch d 他的执行时 a = false -> b = true -> c = false -> d
! 非: 删除除了.js外的所有文件 rm -r !(*.js)
\ 连接符: 用于换行
```

## 判断文件是否存在
文件不存在就新建文件，文件存在就执行ls
```bash
([ -f xx.js ] || touch xx.js) && ls
```

## 忽略错误，不退出
场景:
```bash
git pull | grep package.json && cnpm i
npm run pro
```
如上，假设更新下来的文件，不包含package.json，
那么git pull | grep package.json 就会返回一个不等于0的错误码，然后make退出执行
显然，这和我们的预期是不一致的，我们希望的是：无论安装不安装npm包，都执行npm run pro

因此，我么需要忽略git pull那一行的错误
有两种方式
```bash
- git pull | grep package.json && cnpm i
```
或者在make后面加参数，这种方式不好的地方在于，会将所有的错误信息都忽略掉
make xx --ignore-errors
