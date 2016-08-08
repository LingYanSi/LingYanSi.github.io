#!/bin/bash
branch=`git rev-parse --abbrev-ref HEAD`

echo '--》复制static文件夹'
# js文件
rm -r ./static/
cp -r ./koa/static/ ./static/

echo '--> 打上md5'
gulp minify::app

echo '--> 生成map'
node util/getMap.js github

echo '--》复制database文件'
# database文件
rm -r ./database/
cp -r ./koa/static/database/ ./database/

echo '-->渲染jade文件到index.html'
node util/render_index.js

echo '--> pull: 当前分支'$branch
git fetch
git merge origin $branch

echo '--》git提交文件'
git add .

commit_msg='博客更新'
# 如果参数1不为空，就使用参数一
if [[ -n $1 ]]; then
    commit_msg=$1
fi

git commit -m $commit_msg

echo '--》开始提交代码'
git push origin master
echo '--》代码提交完成'
