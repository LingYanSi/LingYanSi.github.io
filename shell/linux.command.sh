#/bin/bash!

#grep 查询字符串
grep sth filename filename

# 查询当前文件夹下所有以.sh结尾的文件
grep sth *.sh

# | 管道符号
# 有时候，我们期望grep去匹配某个命令的输出
# 一下执行类似于 grep modified `git status` ，命令输出了含有modified的行
git status | grep modified
