const express = require('express')
const bodyParser = require('body-parser')
const app = express()

//设置静态文件目录
app.use(express.static('static'))


//  使用body-parser模块，当客户端发送post请求时，body-parser能够将
//  请求体中的参数解析为对象。
app.use(bodyParser.urlencoded({ extended: true }))

module.exports = app;