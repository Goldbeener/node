# rpc调用 vs ajax调用
## 寻址
rpc: 用目标服务器id换取目标服务器的真实ip
ajax: 用域名在dns服务器换取目标服务器的ip
## 调用
双方进行数据交换
rpc： 二进制协议进行数据通信，传递的是二进制流
ajax： http 协议数据通信，传递的是html文件或者是json数据

二进制协议通信的优点：
数据包体积更小     
交换速度更快，二进制更容易被计算机识别和处理

## json数据与二进制文件的转换
protocol-buffer

