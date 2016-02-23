## 一般命令
```
command  k //清屏

vim filename //新建并编辑文件

touch filename // 新建文件

rm filename // 移除文件

rm -r dirname // 一处文件夹

mkdir pathname //新建文件夹

mv filename/dirname filename/dirname // 文件/文件夹重命名

pwd // 显示当前所处路径

cd $alias //进入自定义文件路径

top // 显示所有进程

tab // 自动补全

whoami // 显示当前用户

ls // 文件夹下目录

ll // 按行显示文件夹下所有文件 及其权限等信息

cd /data/  //从根目录查询

cd data/  // 从当前目录查询

command + c // 撤销，终止进程

⬆️ ⬇ // 按钮用户切换命令记录️

pkill processname // 通过进程名，关闭进程

kill id // 通过进程id，关闭进程

chmod -R 755 pathname // 修改文件夹下所有文件的读写权限

chown -R zikong pathname // 修改文件夹下所有文件的归属人

```

## 配置环境变量
```
open ~/.bash_profile
```
--然后添加以下 ---
```
export fday=/data/app/gitlab/f-day/
export lys=~/lingyansi.github.io/
```
5、修改立即生效：source ~/.bash_profile
6、查看环境变量的值：echo $PATH

>注意：
1、~/.bash_profile中有个点
2、如果是新增环境变量或者是修改环境变量的值，都需要source一下才能立即生效。
如果是删除一个环境变量，必须输入exit以logout当前shell，然后再重新打开一个新的shell并login才能生效。

## 使用zsh  
brew install zsh
[教程](http://zhuanlan.zhihu.com/mactalk/19556676)

## iterm2 新版本改动
[博客](http://wdxtub.com/2016/02/21/iterm-v3-preview/)
[官网](https://iterm2.com/version3.html?src=4)

## 使用
[基本](http://www.boiajs.com/2014/11/02/iterm2-guide)

## 查看端口被占用
sudo lsof -i :9000
```
COMMAND   PID    USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
java    61342 a  313u  IPv6 0x1111111111111     0t0  TCP *:cslistener (LISTEN)
```

然后根据PID杀进程：
```
sudo kill -9 61342
```

## 修改host
gas mask的原理：
    在切换host的时候，去复写 **/etc/hosts** 文件

>一个奇怪的事情，今天帮别人修改host的时候，提示readonly 文法保存，
使用了 **sudo chmod 755 /etc/hosts** 还是不行
最后使用 **sudo vim /etc/hosts** 才成功

## 查看文件大小
1. 文件夹或文件大小
```
du -ks filename/dirname
```
2. 查看文件夹下所有文件的大小
```
du -ks dirname/*
```
3. 文件夹下指定后缀的所有文件大小
```
du -ks dirname/*.js
```
