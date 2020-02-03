const buffer1 = Buffer.from('hello');
const buffer2 = Buffer.from([1,2,3]);

const buffer3 = Buffer.alloc(10);

console.log(buffer1);
console.log(buffer2);
console.log(buffer3);

// buffer3.writeUInt8(2, 2);
// console.log(buffer3);

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


