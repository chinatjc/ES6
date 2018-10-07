// 数组实例方法 find 用于找出第一个符合条件的数组成员，参数为一个回调函数

// find方法 找到符合条件的数组成员，则返回该数组成员
[1, 2, 3].find(n => n > 2); // 3

// find方法 没有找到符合条件的数组成员，则返回undefined
[1, 2, 3].find(n => n > 3); // undefined



// 数组实例方法 findIndex 用于找出第一个符合条件的数组成员的索引值，参数也是一个回调函数

// findIndex方法 找出符合条件的数组成员，则返回该数组成员的索引值
[1, 2, 3].findIndex(n => n > 2); // 2

// findIndex方法 没有找出符合条件的数组成员，则返回-1
[1, 2, 3].findIndex(n => n > 3); // -1



// 上述两个方法都可以找到NaN，解决了IndexOf方法的不足
[1, 2, NaN].indexOf(NaN); // -1
[1, 2, NaN].find(n => Number.isNaN(n)); // NaN
[1, 2, NaN].findIndex(n => Number.isNaN(n)); // 2
