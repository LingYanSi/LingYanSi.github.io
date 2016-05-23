## hooks
[参考1](http://blog.csdn.net/maixiaohai/article/details/21167999)
1. 定义
  - git的挂钩即位于./git/hooks目录下的一些脚本

2. 分类
   - 服务器挂钩，用于 Git 服务器端的操作，如接收被推送的提交
   - 客户端挂钩，用于客户端的操作，如提交和合并

3. 常用挂钩
   - pre-commit（客户端）：键入提交信息时运行，主要用于检查是否有东西遗漏，测试是否正确，代码规范检查，可以用git commit --no-verify来忽略
   - post-receive（服务端）：客户端向服务器push后，服务器接收后的自动运行脚本，可以实现master和develop分支的自动更新

4. examples
  - pre-commit（客户端）:

    简单的安装就是直接cp .git/hooks/pre-commit.sample .git/hooks/pre-commit
    然后修改文件即可
    但是考虑到以后的迁移，最好使用如下命令：
    ```
    touch /path/to/repo/.git/hooks/pre-commit
    chmod a+x /path/to/repo/.git/hooks/pre-commit
    ```
    > chmod a+x is relative to the current state and just sets the x flag. So a 640 file becomes 751 (or 750?), a 644 file becomes 755.

    >chmod 755, however, sets the mask as written: rwxr-xr-x, no matter how it was before. It is equivalent to chmod u=rwx,go=rx.

    >[参考：关于chmod a+x](http://stackoverflow.com/questions/18596778/difference-between-using-chmod-ax-and-chmod-755)

    ```bash
    # test for coffeelint   
    test=`coffeelint ./ | grep Ok! | awk '{ print $1 }'`  
    if [ "test" != '✓']; then  
     coffeelint ./  
     echo "Coffeelint test failed."  
     exit 1  
    else  
     echo "Coffeelint test passed."  
    fi  
    ```
    上述为在commit之前对所有文件做coffeelint，全部通过才可以commit，否则返回1，commit失败

  - post-receive（服务端）:

    ```bash
    # 注意env -i不可或缺
    cd path/to/service/repo  
    env -i git checkout master  
    env -i git pull origin master  
    env -i git checkout develop  
    env -i git pull origin develop
    ```
