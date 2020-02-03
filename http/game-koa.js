const fs = require('fs');
const gameHandle = require('./gameHandle');
const Koa = require('koa');
const mount = require('koa-mount');

let playerWin = 0;
// 用户连续三次出同一个选项
let sameCount = 0;
let lastPlayerAction = null;

const app = new Koa();


/**
 * 针对每个路由 的中间件
 * 会一直执行到最下层的一个，没有再调用next的时候，
 * 再往上冒泡
 * 
 * return 会中断中间件的往下执行；直接返回结果
 * */


// favicon 逻辑
function favicon(ctx, next) {
    ctx.status = 200;
}
app.use(
    mount('/favicon.ico', favicon)
);


// 游戏逻辑处理
const gameKoa = new Koa();
app.use(
    mount('/game', gameKoa)
);

gameKoa.use(async (ctx, next) => {
    if(playerWin >= 3){
        ctx.status = 500;
        ctx.body = "I quit, I'll never play with you ！";
        return
    }
    await next();
    if (ctx.playerWin) {
        playerWin++;
    }
})
gameKoa.use(async (ctx, next) => {
    const { action:playerAction } = ctx.query;
        if(!playerAction) {
            ctx.status = 400
            return
        }
        console.log('samecount>>>>', sameCount)
        if (sameCount === 999) {
            ctx.status = 500;
            ctx.body = "I'll never play with you ！"
            return
        } 
        if (lastPlayerAction && playerAction === lastPlayerAction) {
            sameCount++;
            if (sameCount >= 3) {
                ctx.status = 400;
                ctx.body = "you cheat!, I'll never play with you ！"
                sameCount = 999
                return
            }
        } else {
            sameCount = 0;
        }  
        lastPlayerAction = playerAction;
        ctx.playerAction = playerAction;
        await next();
})
gameKoa.use(async (ctx, next) => {
    const playerAction = ctx.playerAction;
    const result = gameHandle(playerAction);
    ctx.status = 200;
    if(result === 0){
        ctx.body = 'tie!';
    } else if (result === 1) {
        ctx.body = 'you win!';
        ctx.playerWin = true
    } else {
        ctx.body = 'you lose!';
    }
})

// 入口页面处理
// 关于mount的匹配规则， 是模糊匹配的， 因此泛类的要放在后面
app.use(
    mount('/', function (ctx) {
        ctx.body = fs.readFileSync(__dirname + '/index.html', 'utf-8');
    })
);

app.listen(8081);