// 将原字符串重复 n 次，返回一个新的字符串
'a'.repeat(3); // aaa


// 重复次数的特殊例子

// 重复次数为 0，返回空字符串
'a'.repeat(0); // ''
// 0 ～ 1 之间的正小数，取整之后为 0
'a'.repeat(0.9999); // ''
// -1 ～ 0 之间的负小数，取整之后为 0
'a'.repeat(-0.9999); // ''
// NaN 等同于 0
'a'.repeat(NaN); // ''