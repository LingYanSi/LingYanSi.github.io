#! /bin/sh

echo 'if else'
num=100
base=10
if [ $num -eq $base ];
then
    echo "$num 等于 $base"
elif [ $num -gt $base ];
then
    echo "$num 大于 $base"
else
    echo "$num 小于 $base"    #statements
fi

echo 'for循环'
index=0
for x in 陈莹 宋晓峰 张无忌;
do
    let 'index++'
    echo "${index}.${x}"
done

echo 'while语句'
# while : while true 会导致死循环
while (( ${index}<10 ))
do
    echo $index
    let 'index++'
done


echo 'util语句'
until (( $index>10 ))
do
    echo "无论如何会执行一次$index"
    let 'index++'
done

echo 'case语句'
while :
do
    echo -e "输入1-10的数字: \c"
    read index
    case $index in
        1)
            echo "一帆风水"
            ;;
        2)
            echo "双喜临门"
            ;;
        3|4|5)
            echo "三四五六"
            ;;
        *)
            echo "系统不能识别--GAME OVER--"
            break
            ;;
    esac
done

# break语句 跳出所有循环 continue结束本轮循环
