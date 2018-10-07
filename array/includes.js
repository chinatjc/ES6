// 数组实例方法 includes，某个值是否是数组的成员

// 参数
// searchItem (必填)：查找的值
// startIndex (选填)：开始查找的索引值，默认值为0，如果为负值，则为倒数

[1, 2, 3].includes(2); // true
[1, 2, 3].includes(2, 2); // false
[1, 2, 3].includes(2, -2); // true



// indexOf无法处理NaN，而includes没有这方面的问题
[1, 2, NaN].indexOf(NaN); // -1
[1, 2, NaN].includes(NaN); // true
