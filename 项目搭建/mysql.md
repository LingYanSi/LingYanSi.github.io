## mysql使用
### 增删改查🐶
[有个教程](http://www.cnblogs.com/mr-wid/archive/2013/05/09/3068229.html)

### 安装
brew install mysql
mysql --version / mysql --help 校验是否安装成功

### 启动
mysql.server start  / mysql.server stop

### 进入服务器
#### 本地服务器
mysql -h127.0.0.1 -uroot -p123
> -h host 127.0.0.1 localhost
-u username 默认是root
-p password 默认是123

#### 远程服务器
mysql -h127.0.0.1 -P8000 -uusername -ppassword
> -h : host ip地址
-P : Port 端口地址
-u : username 用户名
-p : password 密码

### 退出mysql
quit; / ctrl+d

### 查询所有的库
show databases;

### 新建一个数据库
create database name;

### 删除一个数据库
drop database name;

### 查库中所有的表
use database;
show tables;

### 创建一个表
create table name
(
    姓名 char(8) not null,
    年龄 int unsigned not null,
    婚否 int unsigned not null
);

### 删除一个表
drop table name;

### 插入到表中
insert into tablename("周恩来",20,0);

### 从表中查询
select * from tablename;
select 姓名,年龄 from tablename where 年龄>10;
select 姓名,年龄 from tablename where 年龄>10 or name like "%宋%";
select 姓名,年龄 from tablename where 年龄>10 or name like "%宋%" and 婚否=0;
> and的优先级要比or高
>where 子句不仅仅支持 "where 列名 = 值" 这种名等于值的查询形式,
 对一般的比较运算的运算符都是支持的, 例如 =、>、<、>=、<、!= 以及一些扩展运算符 is [not] null、in、like 等等。
 还可以对查询条件使用 or 和 and 进行组合查询, 以后还会学到更加高级的条件查询方式, 这里不再多做介绍。

### 从表中删除
delete from 表名称 where 删除条件;

### 更新表中数据
update 表名称 set 列名称=新值 where 更新条件;

### 重命名表
alter table 表名 rename 新表名;

### 删除列
alter table 表名 drop 列名称;

### 修改列
alter table 表名 change 列名称 列新名称 新数据类型;

### 添加列
alter table 表名 add 列名 列数据类型 [after 插入位置];

# 数据库迁移
### 保存
mysqldump -u root -p password --databases dbname > beifen.sql

### 下载
scp root@127.0.0.1/beifen.sql /path

### 恢复
mysql -u root < pathofbeifen.sql

## 坑
- 不要给单独的某个字段设置character，应该是给表设置

## 设置编码类型
