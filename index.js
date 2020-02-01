/**
 * node  全局变量
 * process.argv 执行node文件传递的参数
 * process.exit() 退出node进程
 * process.kill() 杀掉node进程
*/

const argv = process.argv;
const playerAction = argv[2];
console.log('你的选择', playerAction)

const randomNumber = Math.random() * 3;
let computerAction = '';
if (randomNumber < 1) {
  computerAction = 'rock';
} else if (randomNumber > 2) {
  computerAction = 'scissors'
} else {
  computerAction = 'paper'
}

if (playerAction === computerAction) {
  console.log('平局')
} else if (
  (playerAction === 'rock') && computerAction === 'scissors' || 
  (playerAction === 'scissors' && computerAction === 'paper') ||
  (playerAction === 'paper' && computerAction === 'rock')
) {
  console.log('你赢了')
} else {
  console.log('你输了')
}

