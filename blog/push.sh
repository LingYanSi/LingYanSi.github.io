#/bin/bash!

echo '--》复制js文件'
# js文件
rm -r ./js
cp -r ./koa/static/js/ ./js/

echo '--》复制database文件'
# database文件
rm -r ./database/
cp -r ./koa/static/database/ ./database/

echo '--》git提交文件'
git add ../blog
git commit -m '博客更新'

echo '--》开始提交代码'
git push origin master
echo '--》代码提交完成'
