
/*
* @Author: zikong
* @Date:   2015-10-10 09:58:52
* @Last Modified by:   zikong
* @Last Modified time: 2015-12-15 15:30:27
*/

'use strict';

-------------------------------------------------------------
svn常用命令符号

1.将文件checkout到本地
    -> svn checkout path

2.添加新文件
    -> svn add file(base.js)

3.更新当前目录下所有文件到最新版本
    -> svn up/update

4.产看日志
    -> svn log path
    显示这个文件的所有修改记录，及其版本号的变化

5、将改动的文件提交到版本库
  svn commit -m "LogMessage" [-N] [--no-unlock] PATH(如果选择了保持锁，就使用--no-unlock开关)
   例如：svn commit -m "add test file for my test" test.php
   简写：svn ci

7、删除文件
  svn delete path -m "delete test fle"
  例如：svn delete svn://192.168.1.1/pro/domain/test.php -m "delete test file"
  或者直接svn delete test.php 然后再svn ci -m 'delete test file'，推荐使用这种
  简写：svn (del, remove, rm)

14、创建纳入版本控制下的新目录
  svn mkdir: 创建纳入版本控制下的新目录。
  用法: 1、mkdir PATH...

13、版本库下的文件和目录列表
    svn list path
    显示path目录下的所有属于版本库的文件和目录
    简写：svn ls

17、解决冲突
    svn resolved: 移除工作副本的目录或文件的“冲突”状态。
    用法: resolved PATH...
    注意: 本子命令不会依语法来解决冲突或是移除冲突标记；它只是移除冲突的
    相关文件，然后让 PATH 可以再次提交。

    http://svnbook.red-bean.com/en/1.7/svn.ref.svn.c.resolve.html

    svn resolve --accept mine-full foo.c

    C    foo.c // 表示冲突
    M    foo.c // 表示修改
    D    foo.c // 表示删除
    A    foo.c // 表示新增

    Select: (p) postpone, (df) diff-full, (e) edit,
        (mc) mine-conflict, (tc) theirs-conflict,
        (s) show all options: p

    第三种，使用svn revert取消变更 类似于git checkout

18、权限不够
    sudo chmod -R 755 file/path 修改文件权限

-----------------------------------------------------------------------------------
======= svn up ======
Updating '/data/app/mogujie/public/xd/js/goods/src/edit.js':
At revision 586944. 当前版本

======= svn commit ======
Sending        mogujie/public/xd/js/goods/src/edit.js
Transmitting file data .
Committed revision 586945. 提交后版本

time cost: 5.082s =======

---------------------------------------------------------------------------------------

svn 文件提交不上，被锁定
