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

### 使用node-mysql

```js
var sql = require('node-mysql')

const config = {
    which:{
        host: '', // 主机ip
        user: '', // 用户名
        password: '', // 密码
        database: '', // 库名
        port: 3306  // 端口
    }
}

function mySql(name){
    // name用来对应不同数据库配置

    var self = this
    this.config = config[name]

    this.query = function(sql){
        return new Promise(function(resolve, reject){
            // 去查询
            self.connect.query(sql , function(error, row){
                if(error){
                    // console.log('查询错误', error)
                    reject(error)
                }else{
                    // 返回查询结果
                    resolve( row)
                }
            })

            // 因为mysql会有链接限制，因此在查询结束的时候，应该关闭链接
            // 或者使用 createPool，但这里有个蛋疼之处，每一次查询都是 new mySql()
            // 这样会导致，每次查询结束还是要手动关闭connect
            // 我想createPool的作用，在于，在启动服务器的时候就createPool
            // 如果想要查询，直接调用便是，不要每次都新建一个查询对象
            setTimeout(function(){ self.connect.distory() }, 1000)
        })

    }

}

mySql.prototype = {
    init: function(){
        var self = this

        this.connect = sql.createConnect( this.config )
        // If you using the node-mysql module, just remove the .connect and .end. Just solved the problem myself. Apparently they pushed in unnecessary code in their last iteration that is also bugged. You don't need to connect if you have already ran the createConnection call
        // 监听错误
        this.connect.on('error', function(){
            // 如果连接丢失，从新连接
            console.log('db error', err);
            if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
              self.init();                                // lost due to either server restart, or a
            } else {                                      // connnection idle timeout (the wait_timeout
              throw err;                                  // server variable configures this)
            }
        })
    }
}
```
