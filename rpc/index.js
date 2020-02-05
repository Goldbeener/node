// 最新的定义buffer的方法
// Buffer.from(string|array|buffer|arrayBuffer); // 根据字符串、数组、创建buffer；复制现有buffer、创建一个与已有buffer共享空间的buffer
// Buffer.alloc(size); // 系统会定义一个二进制数据流对象，并分配给size指定的字节数byte的内存

// 8bit = 1byte
// 





const buffer1 = Buffer.from('hello');
const buffer2 = Buffer.from([1,2,3]);

// 分配10字节的空间 给该流对象
const buffer3 = Buffer.alloc(10);

console.log(buffer1);
console.log(buffer2);
console.log('>>>>>', buffer3);

// buffer3.writeUInt8(2, 2);
// console.log(buffer3);

/*****
 * buffer.writeInt16BE(value, offset);
 * value 表示要写入的有符号的16位整数 2^16 范围内的整数 占用的字节数是在2个字节；
 * offset表示 写入的偏移字节数；因此偏移量是0 <= offset <= length - 2; 否则的话流内存内就没有足够的空间来存储对应的数据
 * 
 * 这里的buffer长度是以字节（8位）为基本单位的，
 * 填充的数据是以位（bit）为基本单位的；因此16位数据 = 2字节； 32位数据 = 4字节
 */
// 写入512 
buffer3.writeInt16BE(512, 5);
console.log(buffer3);

buffer3.writeInt16LE(512, 7);
console.log(buffer3);

const protobuf = require('protocol-buffers');
const fs = require('fs');
const messages = protobuf(fs.readFileSync('test.proto'))

const buf = messages.Column.encode({
    id: 12,
    price: 88
})
console.log(messages.Column.decode(buf));


