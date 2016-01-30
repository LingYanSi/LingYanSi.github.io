'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

require('babel-polyfill');

var mama = function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var name;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return new Promise(function (resolve) {
                            setTimeout(function () {
                                return resolve('庆丰帝');
                            }, 2000);
                        });

                    case 2:
                        name = _context.sent;

                        console.log(name);

                    case 4:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function mama() {
        return ref.apply(this, arguments);
    };
}();

mama();