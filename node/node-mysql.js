/*
* 数据库查询
*/

var mysql      = require('mysql');

// 每一次都需要连接吗？
// 一种做法，建立5个链接之后，然后再直接去查询
// 如果

// 有一个策略，如果有connection断开，就自动连接，连接上后，就把资源分配出去

function getResult(){
    return new Promise(function(resolve, reject){
        // 配置相关信息
        var connection = mysql.createConnection({
          host     : '127.0.0.1',
          user     : 'root',
          // password : '',
          database : 'bitch'
        });
        // 数据库连接
        connection.connect();
        // 数据库查询
        connection.query('SELECT name from cn', function(err, rows, fields) {
          if (err){
              reject(err)
              throw err;
          }
        //   console.log('The solution is: ', rows, Object.prototype.toString.call(rows), rows[0].name );
          resolve(rows)
        });
        // 断掉连接
        connection.end();
    })
}

exports.module = getResult
