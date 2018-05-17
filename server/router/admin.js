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
    if (req.body.phone) {
        var phone = req.body.phone.trim()
        if (phone.length > 0) {
            filter.phone = {}
            filter.phone = { '$regex': `.*${phone}.*?` }
        }
    }
    var pageSize = 10;
    var page = 1;
    db.User.find(filter).count((err, total) => {
        var pageCount = Math.ceil(total / pageSize);
        page = page > pageCount ? pageCount : page
        page = page < 1 ? 1 : page;
        db.User.find(filter).skip((page - 1) * pageSize).limit(pageSize).exec((err, data) => {
            res.json({
                page, pageCount, pages: getPages(page, pageCount),
                users: data.map(m => {
                    m = m.toObject()
                    m.id = m._id
                    m.phone = m.phone
                    delete m._id
                    delete m.isAdmin
                    delete m.password
                    return m
                })
            })
        })
    })
})

module.exports = router