'use strict';
var through = require('through2');

// through2的源码不长，有时间再看看

module.exports = function (reversions) {
	reversions = typeof reversions === 'number' ? reversions : 1;

	return through.obj(function (file, enc, cb) {
		console.log(file.history, file.isBuffer())
		// 在这里处理文件
		// console.log(file.contents.toString('utf-8'));

		Object.keys(file).forEach(item => {
			console.log(item, '=====>', file[item]);
		})
		cb(null, file);
	});
};
