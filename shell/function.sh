#! /bin/sh

# function关键字可以省略
function a(){
    echo "这是一个函数"
}

echo "--》函数开始执行"
a
echo "--> 函数执行结束"

msg="我是被return出来的"
function b(){
    # 需要注意的是如果使用return 语句，必须返回0-255间的数字
    # 如果函数没有return语句，函数返回最后一条语句的执行结果
    # 这么就引申出一个问题，如果函数体内没有语句呢？ shell规定函数体内必须要与语句

    while true
    do
        echo -e "请输入0-255间的一个数字:\c"
        read msg
        if test $msg -le 255 -a $msg -ge 0
        then
            break
        fi
    done
    return ${msg}
}
b
echo $?
