#! /bin/bash

echo "数组"

# 数组元素以空格分开
arr=(张三 李四 王五 赵六)

echo '获取数组单个元素可用下标方式${arr[index]}'
echo ${arr[0]}

echo '获取数组所有元素${arr[@]}或者${arr[*]}'
echo ${arr[@]}

echo '数组元素个数'
echo "元素个数: --> ${#arr[@]}"
