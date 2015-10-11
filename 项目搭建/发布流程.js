/*
* @Author: zikong
* @Date:   2015-10-10 10:01:18
* @Last Modified by:   zikong
* @Last Modified time: 2015-10-10 10:01:40
*/

'use strict';

1.安装git工具
2.terminal命令行终端
3.git copy http://url
4.svn checkout http://url

--------------------------------------------
http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/0013758404317281e54b6f5375640abbb11e67be4cd49e0000
github 忽略文件
需要在工作文件夹下 新建一个.gitignore的文件
-> 文件配置 https://github.com/github/gitignore
其实配置规范很简单
# 这里写注释
*.js // 具体文件
node_modules // 文件夹
这样就可以了

虽说配置简单，可遇到了在 mac shell环境下，使用vim .gitignore 编辑文件不知如何保存
其实也简单 先按下 esc 按键，然后 shift+: 输入 wq 就可以保存退出了
更多vim 快捷键
-> http://www.cnblogs.com/lee0oo0/p/3548030.html
----------------------------------------------

1.上传文件到svn
grunt commit --file dist/src/blalla.js
问题：有时候上传会被卡主
解决方案：到svn目录下更新一下svn svn up
问题： 更新过后，发现仍然不能上传，会爆出类似下面这样的错误
    Aborting commit: '/data/app/mogujie/public/xd/js/goods/src/edit.js' remains in conflict
解决方案： svn resolved <filename or directory that gives trouble>

2.上传之后到 mops上新建一个项目
http://mops.mogujie.org/deploy/add
添加信息以后，线上确认文件
注：如果上工作日没有发布成功，下一个工作日，撤销申请，再次发布

3.在125上，与需求方确认，是否符合需求，无误后再走一步

4.之后走发布群
找周瑜 上线

5.发布到测试机上后，再次和需求方测试

6.最后发布线上
上线后diff线上文件与测试机文件是否一致
例子：public/xd/js/taobao-settle/src/deposit.js
点击进去，会有提示，如果文件不一样，红色代表被删除的语句，绿色代表新增语句


测试：
本地测试，使用 lotus（莲藕）约定好数据

----------------------------
等多发布之后，再上传到git、也就是把文件合并到f2e开发分枝上
主要是因为，团队其他人也可能修改这个文件



