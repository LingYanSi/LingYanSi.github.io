#! /bin/bash

# -gt > 大于
# -lt < 小于
# -ge >= 大于等于
# -le <= 小于等于
# -eq = 等于
# -ne != 不等于

# Boolean运算
# -o or || 或
# -a and && 与
# ! 非

# 字符串运算
# = 比较两个字符串是否相等
# != 比较两个字符串是否不相等
# -z 检测字符串长度是否为0
# -n 检测字符串长度是否不为0
# str 检测字符串是否为空

strr="  1"
echo -e "姓名: \c"
read name
echo "$name is input"

if [[ str $strr ]]; then
    #statements
    echo '哈哈'
fi

if [[ -z $strr ]]; then
    #statements
    echo '哈哈'
fi
