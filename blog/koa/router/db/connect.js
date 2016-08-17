
var mysql = require('mysql');
var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : '127.0.0.1',
  user            : 'root',
  database        : 'blog'
});

// 插入数据
let db = {
    insert(MSQL = `INSERT INTO article SET ?`, data = {}){
        return new Promise(res => {
            pool.query(MSQL, data, function(err, result) {
              if (err) throw err;
              console.log('插入is: ', result );
              res(result)
            })
        })
    },
    select(MSQL = 'SELECT * FROM article'){
        // 查询数据
        return new Promise(res => {
            pool.query(MSQL, function(err, rows, fields) {
              if (err) throw err;
            //   console.log('查询 is: ', rows );
              res( rows )
            })
        })
    },
    update(MSQL = 'SELECT * FROM article', arr=[]){
        // 查询数据
        return new Promise(res => {
            pool.query(MSQL, arr, function(err, result) {
              if (err) throw err;
            //   console.log('查询 is: ', rows );
              res( result )
            })
        })
    },
    delete(MSQL = 'SELECT * FROM article', id){
        // 查询数据
        return new Promise(res => {
            pool.query(MSQL, function(err, result) {
              if (err) throw err;
            //   console.log('查询 is: ', rows );
              res( result )
            })
        })
    }
}

// db.select().then(rows => {
//     console.log('查询结果：', rows[0] ,JSON.stringify(rows ));
// })

module.exports = db

// 删除数据

// 更新数据
