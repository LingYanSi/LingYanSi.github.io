#/bin/bash!

# js文件
rm -r ./js
cp -r ./koa/static/js/ ./js/

# database文件
rm -r ./database/
cp -r ./koa/static/database/ ./database/

git add ../blog
git commit -m '博客更新'
git push origin master
