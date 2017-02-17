# Linux

## 快捷键

ctrl + p 显示历史

## 设置或显示环境变量

export key=value

删除指定key export -n key

列出所有的shell赋予程序的环境变量。 export -p

其作用在于，为后面对的命令提供全局变量，以node距离，可以通过process.env来获取

## 软连接 ln

npm install -g所安装的包的软连接，会放在node安装文件夹下的bin中 因此重新下载一个node的时候，需要重新添加一个PATH，如果使用的是nvm，会在你安装node的时候，自动为新增一个PATH

要知道linux下的所有命令，都是以link的形势存在于PATH下 link类似于json name -> real file path，执行的时候会执行real file path文件

这里有一个问题是，系统怎么知道用什么来解释执行 real file path的内容 所以，在real file path的头部，会有

```bash
#!/usr/bin/env node
```

这句话表示，系统会用node来执行本文件，当然他也可以是python/java/rust/go etc等其他语言

```
ln -s /path/to/your/bin/name /usr/local/bin/name
```

which command 可以查看指定命令的link位置

-s表示软连接，不加表示硬链接，软硬链接都不会占用磁盘空间，
1.硬链接，以文件副本的形式存在。但不占用实际空间。
2.不允许给目录创建硬链接
3.硬链接只有在同一个文件系统中才能创建

-b 强制覆盖原有软连接
-v 显示过程

因此建议在使用过程中
```
ln -sbv /origin/file/name /link/file/nam
```

## PATH

查看所有PATH

- echo $PATH
- export -p

新增path vim ~/.bash_profile

```
export = /your/new/path:$PATH
```

让path生效 source ~/.bash_profile

## 退出远程服务器

exit

## sed编辑文本

[mac sed与linux下的sed是有区别的](http://xiaorui.cc/2016/01/14/%E8%AE%BAmac%E4%BD%BF%E7%94%A8sed%E4%BF%AE%E6%94%B9%E6%96%87%E4%BB%B6%E7%9A%84%E6%AD%A3%E7%A1%AE%E5%A7%BF%E5%8A%BF/)

### 替换文本字符串

- mac

  ```
  sed -i "" 's/正则表达式/替换后字符串/g' path/filename
  ```

- linux

  ```
  sed -i 's/正则表达式/替换后字符串/g' path/filename
  ```

## 杀进程 kill

```
ps aux | grep webpack | grep -v "grep" | awk '{print $2}' | xargs kill -9
```

命令详解

命令               | 解释
---------------- | ------------------------------------------------
ps aux           | 拿到正在运行的所有进程
grep webpack     | 匹配含有webpack的行
grep -v "grep"   | 匹配不包含grep的行
awk '{print $2}' | awk会把字符串按\n分行，然后在每一行内split空白符，$0表示str，$n表示arr[n]
xargs kill -9    | xargs按行将执行kill -9

## 按行对字符串进行分割，并对分割结果进行处理 awk
-f scriptfile
-F 后面接指定分隔符，默认是\s+
-v 后面接变量
```
awk -F: -va=1 -vb=2 '{print $1, $2+a, $3+b}'
```

## 搜索文件 find

查找指定目录及其子目录下的文件

```
find . -name "*.log" -ctime -20
```

命令详解 命令 | 解释 ---|-- . | .表示当前目录，也可以指定目录 -name | 文件名

## 创建文件夹 mkdir

-p 确保目录名称存在，不存在的就建一个。

```
mdir -p /xx/11/22/333
```

## 显示后几行 tail
-n 表示行数 -f 表示会持续侦测后面 .log表示文件
```
tial -n 100 -f /xx/xxx.log
```

## 显示前几行 head
-n 表示行数
```
head -n 100 /xx/xxx.log
```

## 显示行号 nl
```
nl xx.log
```

## tac
相对于cat，导航显示

## du 显示文件夹大小
-h 以友好的方式为单位[K/M/G]
-a 显示所有文件
-s 显示整个文件夹大小
-m 以M为单位
-b 以byte为单位
```
du -h
```

## 比对文件 vimdiff
```
vimdiff xx.log aa.log
```

## 显示内存使用情况 free
-m 以M为单位
-s 多少秒刷新一次
```
free -m -s 3
```
## 延时执行sleep
后面跟的单位可以是[s/m/h/d]
```
sleep 5s; echo "fuck";
```

## 别名alias
alias只在但绘画窗口有效，如果想在每个会话窗口都有效的话，需要在profile/zshrc中进行配置
```
alias fuck=ll
unalias fuck
```
## ssh服务器间文件操作 scp
scp是 secure copy的缩写, scp是linux系统下基于ssh登陆进行安全的远程文件拷贝命令。
-r 复制整个目录
-C 允许压缩
```
scp file_source file_target
```
文件地址类型
local_file remote_username@remote_ip:remote_folder

## cut
Linux cut命令用于显示每行从开头算起 num1 到 num2 的文字。

cut -d: -f1

## 输出 > 与 >>
文件不存在就新建，文件存在就覆盖
```
echo "111" > a.log
```
文件不存在就新建，文件存在就追加
```
echo "111" >> a.log
```
## 快捷键

在shell命令终端中，Ctrl+n相当于方向向下的方向键，Ctrl+p相当于方向向上的方向键。

在命令终端中通过它们或者方向键可以实现对历史命令的快速查找。这也是快速输入命令的技巧。

在命令终端中可以通过Ctrl+r 实现快速检索使用过的历史命令。Ctrl+r中r是retrieve中r。

Ctrl+a：光标回到命令行首。 （a：ahead）

Ctrl+e：光标回到命令行尾。 （e：end）

Ctrl+b：光标向行首移动一个字符。 （b：backwards）

Ctrl+ f：光标向行尾移动一个字符。 （f：forwards）

Ctrl+w: 删除光标处到行首的字符。

Ctrl+k：删除光标处到行尾的字符。

Ctrl+u：删除整个命令行文本字符。

Ctrl+h：向行首删除一个字符。

Ctrl+d：向行尾删除一个字符。

Ctrl+y:：粘贴Ctrl+u，Ctrl+k，Ctrl+w删除的文本。

Ctrl+p: 上一个使用的历史命令。 （p：previous）

Ctrl+n： 下一个使用的历史命令。（n：next ）

Ctrl+r：快速检索历史命令。（r：retrieve）。

Ctrl+t： 交换光标所在字符和其前的字符。

Ctrl+i：相当于Tab键。

Ctrl+o：相当于Ctrl+m.

Ctrl+m：相当Enter键。

其他控制键：

Ctrl+s:使终端发呆，静止，可以使快速输出的终端屏幕停下来。

Ctrl+q：退出Ctrl+s引起的发呆。

Ctrl+z：使正在运行在终端的任务，运行于后台。 （可用fg恢复）

Ctrl+c：中断终端中正在执行的任务。

Ctrl+d: 在空命令行的情况下可以退出终端。

Ctrl+[ ：相当于Esc键。

Esc键：连续按3次显示所有的支持的终端命令。

Tab键：命令、文件名等自动补全功能。

## 时间同步
- yum install ntp
- ntpdate 0.centos.pool.ntp.org

## 📂文件夹
- /etc 配置文件
- /var 日志log
- /bin 执行文件
- /usr/bin 程序
- /usr/local/bin 用户安装程序
- /tmp 存放临时文件的目录

## 查看端口占用
lsof -i tcp:80
