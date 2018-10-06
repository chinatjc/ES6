// Number.isFinite 用来检查一个数值是否是有限的，非数值一律返回false
Number.isFinite(23); // true
Number.isFinite( ); // false
Number.isFinite(Infinity); // false

// Number.isNaN 用来检查一个数值是否是NaN，非数值一律返回false
Number.isNaN(1); // false
Number.isNaN(NaN); // true

// Number.parseInt，Number.parseFloat 完全将全局方法中的parseInt、parseFloat移植到Number对象下
Number.parseInt('23.333'); // 23
Number.parseFloat('23.333aaa'); // 23.333
