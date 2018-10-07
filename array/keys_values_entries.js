// 数组实例方法 keys ，是对数组键名的遍历，返回一个遍历器对象，可以使用 for...of 循环遍历
for(let index of ['a', 'b', 'c'].keys()) {
    console.log(index);
}
// 0
// 1
// 2



// 数组实例方法 values ，是对数组键值的遍历，返回一个遍历器对象，可以使用 for...of 循环遍历
for(let value of ['a', 'b', 'c'].values()) {
    console.log(value);
}
// a
// b
// c



// 数组实例方法 entries ，是对数组键值对的遍历，返回一个遍历器对象，可以使用 for...of 循环遍历
for(let item of ['a', 'b', 'c'].entries()) {
    console.log(item);
}
// [0, 'a']
// [1, 'b']
// [2, 'c']
