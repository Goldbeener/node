console.log('before require')
const lib = require('./lib') // 加载并同步执行模块内容
console.log(lib)
lib.gender = 'male' // 引用与模块内部指向同一个变量
console.log('after require')