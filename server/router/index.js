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
                        res.cookie('user', data)
                        res.json({ code: 1, msg: '登录成功' })
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
    var detail = {}
    req.body.isAdmin = false
    detail.age = req.body.age
    detail.address = req.body.address
    detail.email = req.body.email
    detail.introduce = req.body.introduce
    detail.phone = req.body.phone
    detail.sex = req.body.sex
    req.body.detail = detail
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