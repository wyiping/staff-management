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
          if (data.status.register == '通过') {
            if (req.body.password == data.password) {
              let user = {}
              user.id = data.id
              user.name = data.name
              user.isAdmin = data.isAdmin
              res.json({ code: 1, msg: '登录成功', user })
            } else {
              res.json({ code: 2, msg: '密码错误,请重新输入' })
            }
          } else if (data.status.register == '待审核') {
            res.json({ code: 3, msg: '您的注册信息正在审核，请稍等' })
          }else {
            res.json({ code: 4, msg: '您的注册信息审核未通过，请联系管理员' })
          }
        })
      } else {
        res.json({ code: 0, msg: '未找到该员工' })
      }
    }
  })
})

router.post('/register', bodyParser.json(), (req, res) => {
  // 未选择部门时，department不为ObjectID，注册失败
  if (!req.body.department.default) {
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
      res.json({ code: 1, msg: '注册成功，信息正在审核中' })
    }
  })
})

module.exports = router