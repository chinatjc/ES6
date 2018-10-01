// includes、startsWith、endsWith方法

// string.includes(searchString[, position])
// seachString 为子字符串；position 为 开始查找的位置，若没有position参数，则默认为0
// 返回值  在 被查找字符串 里能否找到 子字符串 ? true : false
'abc'.includes('a'); // 被查找字符串：abcd，true
'abc'.includes('d'); // 被查找字符串：abcd，false
'abc'.includes('a', 1); // 被查找字符串：bcd，false

// string.startsWith(searchString[, position]);
// searchString 为子字符串；position 为 被查找字符串 在 源字符串 中的开始位置，若没有position参数，则默认为0
// 返回值  子字符串 是否是 被查找字符串 的开头 ? true : false
'abcd'.startsWith('a'); // 被查找字符串：abcd，true
'abcd'.startsWith('a', 1); // 被查找字符串：bcd，false
'abcd'.startsWith('e'); // 被查找字符串：abcd，false

// string.endsWith(searchString[, length]);
// searchString 为子字符串；length 为 源字符串的前length个字符，若没有length参数，则默认为string.length
// 返回值  子字符串 是否是 被查找字符串 的结尾 ? true : false
'abcd'.endsWith('d'); // 被查找字符串：abcd，true
'abcd'.endsWith('c', 3); // 被查找字符串：abc，true
'abcd'.endsWith('e'); // 被查找字符串：abcd，false
