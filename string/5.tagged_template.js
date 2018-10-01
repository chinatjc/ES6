// 标签模版

// 第一个参数是个数组，参数中那些没有被变量替换的的字符串部分组成的数组
// 第一个参数有个属性 raw，strings.raw可以获取字符串被 转义 之前的原始字符
// 第二个参数是也个数组，参数中那些变量组成的数组

function tag(strings, ...values) {
    // strings[2]; , 这是一个反引号`
    // strings.raw[2]; , 这是一个反引号\`
    return values
        .reduce((result, value, index) => {
            result += strings[index];
            result += value;
            return result;
        }, '')
        + strings.slice(-1)[0]
}

const name = '张三';
const me = '我是李四';

tag`hello ${name}, ${me}, 这是一个反引号\``; // hello 张三, 我是李四, 这是一个反引号`
