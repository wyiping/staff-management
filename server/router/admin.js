const express = require("express")
const bodyParser = require('body-parser')
const db = require('../bin/db')
var router = express.Router()

// 获取页码
function getPages(page, pageCount) {
    var pages = [page];
    var left = page - 1;
    var right = page + 1;
    // 左右两边各加1个页码,直到页码够10个或左边到1 右边到总页数
    while (pages.length < 10 && (left >= 1 || right <= pageCount)) {
        if (left > 0) pages.unshift(left--);
        if (right <= pageCount) pages.push(right++);
    }
    return pages;
}

// 获取会员列表
router.post('/list', bodyParser.json(), (req, res) => {
    var filter = {};
    if (req.body.name) {
        var name = req.body.name.trim()
        if (name.length > 0) {
            filter.name = { '$regex': `.*${name}.*?` }
        }
    }
    if (req.body.workId) {
        var workId = req.body.workId.trim()
        if (workId.length > 0) {
            filter.workId = workId
        }
    }
    if (req.body.department) {
        var department = req.body.department.trim()
        if (department.length > 0) {
            filter.department = department
        }
    }
    if (req.body.phone) {
        var phone = req.body.phone.trim()
        if (phone.length > 0) {
            filter.phone = { '$regex': `.*${phone}.*?` }
        }
    }
    var pageSize = 10;
    var page = 1;
    db.User.find(filter).count((err, total) => {
        var pageCount = Math.ceil(total / pageSize);
        page = page > pageCount ? pageCount : page
        page = page < 1 ? 1 : page;
        db.User.find(filter).skip((page - 1) * pageSize).limit(pageSize).populate("department","name").exec((err, data) => {
            res.json({
                page, pageCount, pages: getPages(page, pageCount),
                users: data.map(m => {
                    m = m.toObject()
                    m.id = m._id
                    m.phone = m.phone
                    m.department = m.department.name
                    delete m._id
                    delete m.isAdmin
                    delete m.password
                    return m
                })
            })
        })
    })
})

// 查询部门
router.post('/department/list', bodyParser.json(), (req, res) => {
    var pageSize = 10;
    var page = 1;
    db.Department.find().count((err, total) => {
        var pageCount = Math.ceil(total / pageSize);
        page = page > pageCount ? pageCount : page
        page = page < 1 ? 1 : page;
        db.Department.find().skip((page - 1) * pageSize).limit(pageSize).exec((err, data) => {
            res.json({
                page, pageCount, pages: getPages(page, pageCount),
                departments:data
            })
        })
    })
})

// 添加部门
router.post('/department/add', bodyParser.json(), (req, res) => {
    new db.Department(req.body).save(err => {
        if (err) {
            if (err.code == 11000) {
                res.json({ code: 0, msg: '添加失败，该部门已存在！' })
            } else {
                res.json({ code: 0, msg: '添加失败,系统出错！' })
            }
        } else {
            res.json({ code: 1, msg: '添加成功！' })
        }
    })
})

// 删除部门
module.exports = router