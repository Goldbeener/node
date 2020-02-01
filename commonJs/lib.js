console.log('hello from lib.js')

module.exports.age = '29'
exports.foo = 'bar'
exports.add = (a, b) => a + b
exports.obj = {
  name: 'sean'
}

/**
 * module.exports = exports = {}
 * 对外暴露的是module.exports； 也就是说require查找的是module.exports上的东西;
 * 如果直接改变exports的值；或者是module.exports的值，可能会导致暴露内容失控
 */

setTimeout(() => {
  console.log(exports) // 与require引用变量指向同一个对象
}, 2000)