/*
* @Author: zikong
* @Date:   2015-10-10 09:58:41
* @Last Modified by:   zikong
* @Last Modified time: 2015-11-18 13:47:39
*/

'use strict';
---------------------------------------------------------------

git常用命令
[一篇文章](http://www.cnblogs.com/cspku/articles/Git_cmds.html)

// 忽略文件配置
1. 新建一个 .gitignore 文件
```
    # 这里是注释，node_modules表示文件夹
    node_modules
    # readme.md 表示文件
    readme.md
```
>但有个问题，这个配置文件只有在还没有push本地文件的时候才有效，一旦readme.md文件被track了，他就不会忽略文件
解决方案是先把cached清除掉。这么做会删除掉线上相对应的文件。

```
    git rm --cached file/path/to/be/ignored。
    git add .
    git commit -m "fixed untracked files"
```
[附录:一篇文章](http://www.jianshu.com/p/4a1f4b324823)

2. clone一个项目
```
    git clone http://项目地址
```

3. 线上新建了一个项目，需要把本地的项目与线上合并
```
    git remote add origin git@github.com:michaelliao/learngit.git  // 远程添加原生的
    git push -u origin master // 将本地的master分支与线上分支合并关联
    git push origin master // 以后就可以用这个命令提交本地的修改
```
4. 使用客户端/可视化工具
    目前时使用的是Tower，可视化工具的好处就不说了，但也有一些弊端

5. 其他命令
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

6. 遇到的问题

pull的时候Tower提示: could not read Username for 'https://github.com': Device not configured
解决方案
```
    git remote set-url git@github.com:michaelliao/learngit.git
```
[issues](https://github.com/kemayo/sublime-text-git/issues/176)


