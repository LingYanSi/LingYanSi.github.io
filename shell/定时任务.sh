#! /bin/bash

# shell函数通过 $1 $2 来获取参数
function fuck() {
    index=0
    #statements
    while [[ true ]]; do
        #statements
        echo $index
        index=`expr $index + 1`
        bash $1
        # 等待多少秒
        sleep "$2s"
    done
}
fuck /Users/wangyong/me/LingYanSi.github.io/shell/time.sh 3
