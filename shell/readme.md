## Shell
Shell 是一个用C语言编写的程序，它是用户使用Linux的桥梁。Shell既是一种命令语言，又是一种程序设计语言。
Shell 是指一种应用程序，这个应用程序提供了一个界面，用户通过这个界面访问操作系统内核的服务。
Ken Thompson的sh是第一种Unix Shell，Windows Explorer是一个典型的图形界面Shell

### 坑
    - 保留变量：
        今天在写一个脚本的时候，定义了一个PATH变量，然后脚本就跑不通了。。。
        有一个保险的做法是，变量都使用xx_yy形式，就不会与系统变量冲突了
