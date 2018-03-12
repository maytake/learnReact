const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const userRouter = require('./user')

const app = express()
app.use(cookieParser())
app.use(bodyParser.json())//经过这个中间件处理后，就可以在所有路由处理器的req.body中访问请求参数
app.use('/user',userRouter)
app.listen(9093,function(){
    console.log('Node app start at port 9093')
})



