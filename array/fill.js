// 数组实例方法 fill 用于数组成员的填充

// 参数
// value (必填)：用来填充数组的值
// start (选填)：从 该位置 开始填充，默认值为0，如果为负值，则为倒数
// end (选填)：从 该位置前 停止填充，默认值为数组的长度，如果为负值，则为倒数

Array(3).fill(1); // [1, 1, 1]

Array(5).fill(undefined).fill(1, 1, 4); // [undefined, 1, 1, 1, undefined]

Array(5).fill(undefined).fill(1, -4, -3); // [undefined, 1, undefined, undefined, undefined]
