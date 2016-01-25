/*
* @Author: Administrator
* @Date:   2015-08-20 10:03:37
* @Last Modified by:   Administrator
* @Last Modified time: 2015-08-20 13:17:14
*/

'use strict';
(function(){
    console.log('----------------------map&set----------------------')

    var arr = [['name','宋小帆'],['age',22],['关系','妻子']] ;
    // map对象可接受一个数组来初始化，数组内的元素也要是数组，如上，键值对形式，键值对的类型可是任意的
    var map = new Map( arr );
    // 看看本身是什么
    console.log('Map', map, Object.getPrototypeOf(map) );

    // keys返回一个map的key的iterator
    console.log('Map.prototype.keys:', map.keys() );

    // values返回map的value的iterator
    console.log('Map.prototype.values:', map.values() );

    // entries返回map的key-value的iterator，遍历器可被for of方法遍历，可以使用遍历器的next方法以此获取值
    console.log('Map.prototype.values:', map.entries() );
    for(let arr of map.entries()){
        console.log( arr )
    }
    var iter = map.entries();
    console.log('iterator的next方法:', iter.next().value);

    // forEach方法
    var daye = 111 ;
    map.forEach(function(value,key,map){
        console.log(value,key,'第二个参数代表forEach循环的指针',this);
    },daye);

    // get方法
    console.log('Map.prototype.get:', map.get('关系') );

    // has方法
    console.log('Map.prototype.has:', map.has('关系') );

    // delete方法
    map.delete('关系');
    console.log('Map.prototype.delete:', map  );

    // set方法
    map.set('symbol','我不太清楚');
    console.log('Map.prototype.set:', map );

    // size方法
    console.log('Map.prototype.size:', map.size  );

    // clear方法，清空map对象
    map.clear('关系');
    console.log('Map.prototype.clear:', map );

    /*
     * Set对象
     * 可接受一个数组初始化
    */
    var set = new Set( [1,22222,'陈莹'] );
    console.log('Set:', set, Object.getPrototypeOf(set));
    // set对象拥有和map对象几乎一样的方法，只是给set添加新值实用的是add方法而不是set

    // set.prototype.keys 需要注意的是set.keys和set.values返回的对象是一样的，并不象数组那样
    console.log('set.prototype.keys:',set.keys() );
    console.log('set.prototype.values:',set.values() );
    console.log('set.prototype.entries:',set.entries() );
    set.forEach(function(value,key,set){
        console.log('value:',value,'--key:',key);
    });

    console.log('Set.prototype.has:', set.has('陈莹') );
    set.add('李倩')
    console.log('Set.prototype.add:', set );
    set.delete('李倩');
    console.log('Set.prototype.delete:', set );
    set.clear('李倩');
    console.log('Set.prototype.clear:', set );

})();
