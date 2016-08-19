
echo '--》复制css文件'
# js文件
rm -r ./static/css
cp -r ./koa/static/css/ ./static/css/

echo '--》复制js文件'
# js文件
rm -r ./static/js
cp -r ./koa/static/js/ ./static/js/


rm -r ./static/lib
cp -r ./koa/static/lib/ ./static/lib/

echo '--> 压缩js文件,打上md5'
gulp minify::app

echo '--> 生成map'
node util/getMap.js production

echo '-->渲染jade文件到index.html'
node util/render_index.js

node app.js
