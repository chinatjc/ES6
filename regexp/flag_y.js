// y 修饰符，每次匹配都是从子字符串的开头开始匹配
const text = 'aaa_aa_a';
const regexp_g = /a+/g;
const regexp_y = /a+/y;

regexp_g.exec(text); // ['aaa']
regexp_y.exec(text); // ['aaa']

regexp_g.exec(text); // ['aa']
regexp_y.exec(text); // null，匹配的子字符串为'_aa_a'

// 通过正则表达式实例的 sticky 属性可以获知实例是否设置了 y 修饰符
/a+/g.sticky; // false
/a+/y.sticky; // true

// 通过正则表达式实例的 flags 属性可以获知正则表达的修饰符
/aaa/gim.flags; // gim

