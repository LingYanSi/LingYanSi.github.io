#! /bin/bash
# "#!" 是一个约定的标记，它告诉系统这个脚本需要什么解释器来执行

name="如花似玉"
readonly name #变量只可读 不可再修改 亦不可被删除
name="美若天仙" #修改变量
unset name #删除变量
echo "${name}如花似玉" #输出变量
pwd

# if语句
if cd shell
then
    pwd
fi

cd ./../

pwd

# for语句
for sth in aa bb cc dd;
do
    echo "我不知道-》${sth}是什么"
done

# ``内写code 返回执行结果
for sth in `ls ./`;
do
    echo "文件名: ${sth}"
done

#数组
echo '数组'
arr=(张三 李四 王五 赵六)
echo $arr
echo ${arr[1]}
for item in ${arr[@]};
do
    echo "数组元素：$item"
done
