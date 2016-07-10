
## git常用命令
[一篇文章](http://www.cnblogs.com/cspku/articles/Git_cmds.html)

### 1. 新建一个 .gitignore 文件
```
# 这里是注释，node_modules表示文件夹
node_modules
# readme.md 表示文件
readme.md
```
但有个问题，这个配置文件只有在还没有push本地文件的时候才有效，一旦readme.md文件被track了，他就不会忽略文件
解决方案是先把cached清除掉。这么做会删除掉线上相对应的文件。

    git rm --cached file/path/to/be/ignored
    git add .
    git commit -m "fixed untracked files"

[附录:一篇文章](http://www.jianshu.com/p/4a1f4b324823)


### 2. clone一个项目
```
git clone http://项目地址
```

### 3. 线上新建了一个项目，需要把本地的项目与线上合并
```
git remote add origin git@github.com:michaelliao/learngit.git  // 远程添加原生的
git push -u origin master // 将本地的master分支与线上分支合并关联
git push origin master // 以后就可以用这个命令提交本地的修改

git pull --rebase origin master
```
### 4. 使用客户端/可视化工具

目前时使用的是Tower，可视化工具的好处就不说了，但也有一些弊端

### 5. 其他命令
```
git reset //回滚
git merge // 合并
git checkout // 切换分支
git push // 提交
git pull // 下拉
git status // 查看工作区文件变动
git diff // 对比
git branch // 新建分支
git log // 查看提交信息
git stash // 保存修改
git stash apply --index // 恢复保存的修改
```

### 6. 遇到的问题

pull的时候Tower提示:

    could not read Username for 'https://github.com': Device not configured

解决方案
```
git remote set-url git@github.com:michaelliao/learngit.git
```
> [issues](https://github.com/kemayo/sublime-text-git/issues/176)

>ssh: connect to host github.com port 22: Connection refused

>If you get a connection refused, it means you actually got a packet back which states that your destination does not accept your connection. This could mean a few things:

>github.com is down (not too likely, but you could always check their status on https://status.github.com/)

>you have an invalid IP address for github.com (manual entry in /etc/hosts or your resolver) which blocks ssh from at least your IP address

>you have a firewall along the way to github.com which blocks the ssh traffic (eg. local firewall or corporate firewall)

### 7. 对比代码
```
-> 历史上的两个版本
    git diff -r 历史两个版本号 filename
-> 历史版本与本地
    git diff -r 历史版本号 filename

git log -10 --pretty=oneline filename 打印最近提交的

git diff // 对比整个项目本地与线上
git diff pathname // 对比文件夹

```

### 8. git status

### 9. 清除本地修改[指定文件、文件夹]
    git checkout -- filename/pathname

### 10. 问题： 大意是让你确定是否有权限access git项目 或者 git项目是否存在
    解决： 过十分钟，自己就好了

### 11. 获取git项目的线上地址
    git remote -v

### 12. 撤销add
    git reset .


### 13 .gitignore 配置文件
```
*.a       # 忽略所有 .a 结尾的文件
!lib.a    # 但 lib.a 除外
/TODO     # 仅仅忽略项目根目录下的 TODO 文件，不包括 subdir/TODO
build/    # 忽略 build/ 目录下的所有文件
doc/*.txt # 会忽略 doc/notes.txt 但不包括 doc/server/arch.txt

```

### 13. 显示文件内每行的最近提交人
    git blame filename

### 14. git config
```
filter.lfs.clean=git-lfs clean %f
filter.lfs.smudge=git-lfs smudge %f
filter.lfs.required=true
user.name=zikong
user.email=zikong@mogujie.com
url.https://.insteadof=git://
core.repositoryformatversion=0
core.filemode=false
core.bare=false
core.logallrefupdates=true
core.ignorecase=true
core.precomposeunicode=true
remote.origin.url=git@gitlab.mogujie.org:f2e/f-day.git
remote.origin.fetch=+refs/heads/*:refs/remotes/origin/*
branch.develop.remote=origin
branch.develop.merge=refs/heads/develop
mergetool.tower.cmd="/Applications/Tower.app/Contents/Resources/filemerge.sh" "$LOCAL" "$REMOTE" "$BASE" "$MERGED"
mergetool.tower.trustexitcode=true

```
显示 => git config --list
配置 => git config user.name zikong
        git config core.filemode false // 忽略文件权限修改 chmod 777/755 之类

为了避免每次都输入username,email的麻烦
    git config user.name zikong
    git config user.email zikong@mogujie.com


### 15.git hook 钩子
Git可以定制一些钩子，这些钩子可以在特定的情况下被执行，分为Client端的钩子和Server端的钩子。
Client端钩子被operation触发，比如commit，merge等，Server端钩子被网络动作触发，比如pushed commits。

那么钩子是放在哪的呢？

在.git/hooks/文件夹下。当你init一个仓库的时候，下边会有一些钩子的例子，以.sample结尾。



那么钩子什么时候被执行，Git预定义了触发时机：

#### ClientSide hooks：

1. pre-commit
当执行commit动作时先执行此hook，可以用此hook做一些检查，比如代码风格检查，或者先跑测试。

2. prepare-commit-msg
当commit时需要输入message前会触发此hook，可以用此hook来定制自己的default message信息。

3. commit-msg
当用户输入commit的message后被触发，可以用此hook校验message的信息，比如是否符合规定，有没有cr等。

4. post-commit
当commit完成后被触发，可以用此hook发送notification等。

5. pre-rebase
rebase之前会被触发，可以用此hook来拒绝所有的已经push的commits进行rebase操作。

6. post-merge
当merge成功后，会触发此hook。

7. pre-push
当push时，remote refs被更新，但是在所有的objects传输前被触发。

8. pre-auto-gc
当git gc --auto执行前被触发。在垃圾回收之前做一些验证或备份是挺不错的。


#### ServerSide hooks:

1. pre-receive
当收到push动作之前会被执行。

2. update
也是收到push动作之前被执行，但是有可能被执行多次，每个branch一次。

3. post-receive
当push动作已经完成的时候会被触发，可以用此hook来push notification等，比如发邮件，通知持续构建服务器等。

记住所有的hook都应该是可被执行的。

chmod u+x your_hook

所以你可以用shell脚本，perl，python等写钩子。


## 其实git help的文档说明已经很完善了
git log 显示commit
git log -n 1 显示最近1次提交
git log -n 1 --stat 显示最近一次提交详情【增删改了哪些文件】

git branch 显示本地所有分支
git branch -r 显示远程所有分支
git branch -a 显示本地和远程所有分支
git push origin --delete develop 删除远程分支
git branch develop 新建develop分支
git branch -d develop 删除develop分支
git branch -m develop haha 重命名分支
git checkout develop 切换到对应分支

git merge develop //合并develop分支 到当前分支
git reset .
取消add的内容
git reset –-soft：
回退到某个版本，只回退了commit的信息，不会恢复到index file一级。如果还要提交，直接commit即可
其意义在于只撤销commit，不撤销已修改的内容
git reset –-hard：
彻底回退到某个版本，本地的源码也会变为上一个版本的内容
撤销commit，回滚到上个指定版本，已提交commit的信息会被清除

回滚文件
git reset commithash filename
回滚文件不能使用--hard

## 魔方提交步骤
git add .
git commit -m 'blabla'
git pull origin develop/master
如果需要merge，随便填写merge信息
git rebase // 清楚merge信息，回到最近一次commit的那个版本
git push origin develop/master //提交到对应的线上分支

## 在develop上开发，master更新，develop需要master上的新内容
其实很简单吧，首先
git stash/git add . git commit
git checkout master
git pull
git checkout develop
git merge master
git show hash字符串 显示某次更改详细信息

## fetch 和 pull 的区别
pull = fetch + merge

## git log -p
显示详细的提交信息

## git commit -av
保留merge信息

## ssh问题
使用https的项目地址，有一个蛋疼的地方是需要一致输入username password
当项目的remote url 是ssh时候，提交会被拒绝，是因为没有把本地生成的ssh字符串，提交到github
ssh字符串的生成，使用 ```ssh-keygen``` 一路回车下去 然后 cat以pub为后缀的目标文件，把这个字符串提交到[这里](https://github.com/settings/ssh)

## 修改本地remote
```
git remote set-url origin git@github.com:LingYanSi/node-server-socket.git
```
