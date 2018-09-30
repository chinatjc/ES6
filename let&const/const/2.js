// 彻底锁死函数
const obj = {
    name: '134',
    result: {
        math: 134,
        english: 34
    }
};

const constantize = obj => {
    Object.freeze(obj);
    Object.keys(obj).map(key => {
        if (typeof obj[key] === 'object') {
            constantize(obj[key]);
        }
    });
};

constantize(obj);

// 重新给属性赋值无效！！！
obj.name = 1111;
obj.result.math = 111;
