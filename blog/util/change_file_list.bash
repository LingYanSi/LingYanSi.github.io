#/bin/bash!

# 不包括新增文件 【modify、delete】
# git diff --name-status > file_list.txt

# 所有变化文件 【add、modify、delete】
git status --porcelain > file_list.txt

# 把输出的文件转成json
node toJSON.js

rm ./file_list.txt
