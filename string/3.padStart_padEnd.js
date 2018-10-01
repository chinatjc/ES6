// 字符串补全功能

// padStart
// string.padStart(targetLength[, padString]);
// targetLength 目标字符串的最小长度；padString 用来向前补全的重复字符串
// 返回一个全新的字符串
'aaa'.padStart(6, 'bbb'); // bbbaaa

// targetLength 长度不够时，则尽量缩短 重复字符串，但是不会缩短 源字符串
'aaa'.padStart(4, 'bbb'); // baaa
'aaa'.padStart(2, 'bbb'); // aaa
'aaa'.padStart(7, 'bbb'); // bbbbaaa

// 若 padString 省略，则用空格(' ')来代替padString
'aaa'.padStart(4); //  aaa

// padEnd
// string.padEnd(targetLength[, padString]);
// targetLength 目标字符串的最小长度；padString 用来向后补全的重复字符串
// 返回一个全新的字符串
'aaa'.padEnd(5, 'b'); // aaabb
