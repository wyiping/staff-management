const express = require("express")
const bodyParser = require('body-parser')
const db = require('../bin/db')

var router = express.Router()

router.post('/login', bodyParser.json(), (req, res) => {
    db.User.find({ name: req.body.name }).count((err, count) => {
        if (err) {
            res.json({ code: 0, msg: '系统错误,请重试' })
        } else {
            if (count > 0) {
                db.User.findOne({ name: req.body.name }, (err, data) => {
                    if (req.body.password == data.password) {
                        let user = {}
                        user.id = data.id
                        user.name = data.name
                        user.isAdmin = data.isAdmin
                        res.json({ code: 1, msg: '登录成功' ,user})
                    } else {
                        res.json({ code: 0, msg: '密码错误,请重新输入' })
                    }
                })
            } else {
                res.json({ code: 0, msg: '用户未注册,请注册' })
            }
        }
    })
})

router.post('/register', bodyParser.json(), (req, res) => {
    req.body.isAdmin = false
    if(!req.body.department){
        delete req.body.department
    }
    new db.User(req.body).save(err => {
        if (err) {
            if (err.code == 11000) {
                res.json({ code: 0, msg: '用户名已存在' })
            } else {
                res.json({ code: 0, msg: '注册失败,系统出错' })
            }
        } else {
            res.json({ code: 1, msg: '注册成功，请登录' })
        }
    })
})

module.exports = router