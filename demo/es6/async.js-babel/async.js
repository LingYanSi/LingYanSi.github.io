'use strict';

var mama = function mama() {
    var name;
    return regeneratorRuntime.async(function mama$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.next = 2;
                return regeneratorRuntime.awrap(new Promise(function (resolve) {
                    settimeout(function () {
                        return resolve('庆丰帝');
                    }, 2000);
                }));

            case 2:
                name = context$1$0.sent;
                return context$1$0.abrupt('return', name);

            case 4:
            case 'end':
                return context$1$0.stop();
        }
    }, null, this);
};

mama.then(function (msg) {
    console.log(msg);
});