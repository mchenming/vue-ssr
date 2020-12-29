let Vue = require('vue')
let VueServerRenderer =require('vue-server-renderer')
const fs = require('fs')
let Koa = require('koa')
let Router = require('koa-router')
let app = new Koa()  //创建一个服务实例
let router = new Router()  //创建路由实例

let vm = new Vue({
    data(){
        return {
            name: 'chenming',
            age: '22'
        }
    },
    template:`<div><div>姓名：{{name}}</div><div>年龄：{{age}}</div></div>`
})

let template = fs.readFileSync('./temp.html','utf8')
let renderer = VueServerRenderer.createRenderer({template})  // 通过模版创建一个渲染器

app.use(router.routes())  //将路由组册到koa中
// console.log(app)    
router.get('/',async (ctx)=>{
    //
    console.log(await renderer.renderToString(vm))
    ctx.body = await renderer.renderToString(vm)  //用渲染器将一个vue到实例渲染成一个字符串
})
router.get('/abc',(ctx)=>{
    // await ctx.body = ''
    ctx.body = 'hello world'
})
app.listen(7222)
console.log(22)