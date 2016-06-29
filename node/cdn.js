const qiniu = require('qiniu')

const config = {
    AK: 'BTMSQQPz0q9vU1KiOk2VT6fVTYTuxo5i5yaOnKM-',
    SK: 'f6wTf96KWePYbd2I-DdPsubqYxGG2SCyIgwp4w1V',
    domin: 'http://o9fl7r0ix.bkt.clouddn.com'
}

qiniu.conf.ACCESS_KEY = config.AK
qiniu.conf.SECRET_KEY = config.SK


const bucket = 'lingyansi';

//构建上传策略函数，设置回调的url以及需要回调给业务服务器的数据
function uptoken(bucket, key) {
    var putPolicy = new qiniu.rs.PutPolicy(bucket + ":" + key);
    // putPolicy.callbackUrl = `${config.domin}/callback`;
    // putPolicy.callbackBody = 'filename=$(fname)&filesize=$(fsize)';
    return putPolicy.token();
}


//构造上传函数
function uploadFile(uptoken, key, localFile, resolve, reject) {
    var extra = new qiniu.io.PutExtra();

    qiniu.io.putFile(uptoken, key, localFile, extra, function(err, ret) {
        if (!err) {
            // 上传成功， 处理返回值
            console.log(ret.hash, ret.key, ret.persistentId);
            resolve({
                localFile,
                key,
                done: true
            })
        } else {
            // 上传失败， 处理返回代码
            console.log(err);
            resolve({
                localFile,
                key,
                done: false
            })
        }
    });
}

function reslovePath(path) {
    // 去除以 /\.*\// 开头的字符串
    if (path.startsWith('./')) {

    }
}

module.exports = function(filename, alianame) {

    //上传到七牛后保存的文件名
    // 文件名不能以 ../ ./ 之类的字符开头，因为七牛会新建一个文件夹 .. / .的文件夹
    const key = alianame || '/' + filename.slice(2);

    //生成上传 Token
    const token = uptoken(bucket, key);

    //要上传文件的本地路径
    const filePath = filename

    return new Promise(function(resolve, reject) {
            uploadFile(token, key, filePath, resolve, reject);
        })
        //调用uploadFile上传

}=
