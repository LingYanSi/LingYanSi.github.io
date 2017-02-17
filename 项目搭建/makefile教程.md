## makefile
[教程](https://segmentfault.com/a/1190000004437816)

简单用了一下，只有当前文件夹下存在makefile文件的时候，才能使用make命令(很显然)

|环境|mac/xcode,win/需要下载|
|-|-|
|其他|etc|

```makefile
ISTANBUL=./node_modules/.bin/istanbul
_MOCHA=./node_modules/.bin/_mocha
create:
    touch a.js # 新建一个文件
del:
    rm a.js #删除一个文件
test:
    $(ISTANBUL) cover $(_MOCHA) # $()对变量的引用
relay:create # create执行后relay才执行
    mv a.js b.js
```

在makefile中$是特殊符号，如果要使用可以用$$来替代$
```makefile
stopwebp:
    # bad
    # ps aux | grep webpack | grep -v "grep" | awk '{print $2}' | xargs kill -9
    # good
    ps aux | grep webpack | grep -v "grep" | awk '{print $$2}' | xargs kill -9
```
