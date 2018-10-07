// Array.from 方法用于将 类数组的对象 & 可遍历(iterable)的对象 转换为真正的数组
const arrayLike = {
    0: '000',
    1: '111',
    2: '222',
    length: 3
};

Array.from(arrayLike); // ['000', '111', '222']

Array.from('hello'); // ['h', 'e','l', 'l', 'o']

// 数组去重
Array.from(new Set([1, 2, 3, 2, 3])); // [1, 2, 3]

// 拓展运算符也可以将某些数据结构转换为数组
// 拓展运算符是调用 遍历器接口(Symbol.iterator)，如果一个对象没有部署该接口，则无法转换为数组
[...new Set([1, 2, 3, 2, 3])]; // [1, 2, 3]

// Array.from 的第二个参数 mapFn 和数组实例方法 map 很相似
Array.from([1,,2,,3], value => value || 0); // [1, 0, 2, 0, 3]
