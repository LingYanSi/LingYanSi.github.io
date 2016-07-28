#! /bin/sh

# include 类似于 import 当然和C中的include应该也一样

# 导入include_test文件，但这种导入不好的地方在于，我并不知道被导入文件到底定义了哪些变量
. ./include_test.sh

echo "COLOR: $COLOR"
echo "PADDING: $PADDING"
echo "FONTSIZE: $FONTSIZE"
