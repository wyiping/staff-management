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
    var filter = {
        'status.register': '通过'
    };
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
    var page = req.body.page;
    page = page || 1;
    page = parseInt(page);
    db.User.find(filter).count((err, total) => {
        var pageCount = Math.ceil(total / pageSize);
        page = page > pageCount ? pageCount : page
        page = page < 1 ? 1 : page;
        db.User.find(filter).skip((page - 1) * pageSize).limit(pageSize).populate("department.default", "name").exec((err, data) => {
            res.json({
                page, pageCount, pages: getPages(page, pageCount),
                users: data.map(m => {
                    m = m.toObject()
                    m.id = m._id
                    m.phone = m.phone
                    if (m.department.default) {
                        m.department = m.department.default.name
                    } else {
                        m.department = null
                    }
                    delete m._id
                    delete m.isAdmin
                    delete m.password
                    delete m.detail
                    return m
                })
            })
        })
    })
})

// 查询个人信息
router.post('/detail/:id', bodyParser.json(), (req, res) => {
    db.User.findById(req.params.id).populate("department.default department.new").exec((err, data) => {
        res.json({ user: data })
    })
})

// 修改个人信息
router.post('/edit/:id', bodyParser.json(), (req, res) => {
    db.User.findByIdAndUpdate(req.params.id, req.body, err => {
        if (err) {
            res.json({ code: 0, msg: '系统错误' });
        }
        else {
            res.json({ code: 1, msg: '更新成功！' });
        }
    })
})
// 查询部门修改状态
router.post('/department/status/:id', (req, res) => {
    db.User.findById(req.params.id).populate("department.default department.new").exec((err, data) => {
        if (err) {
            res.json({ code: 0, msg: '系统错误', user: null });
        }
        else {
            res.json({
                code: 1, user: {
                    id: data._id,
                    department: {
                        id: data.department.default._id,
                        name: data.department.default.name
                    },
                    new_department: data.department.new ? {
                        id: data.department.new._id,
                        name: data.department.new.name
                    } : data.department.default._id,
                    status: data.status.department ? true : false
                }
            });
        }
    })
})
// 查询部门列表
router.post('/department/list', (req, res) => {
    db.Department.find((err, data) => {
        res.json({ departments: data })
    })
})
// 申请修改部门
router.post('/department/change', bodyParser.json(), (req, res) => {
    db.User.findByIdAndUpdate(req.body.uid, {
        $set: {
            'status.department': true,
            'department.new': req.body.new,
        }
    }, (err, data) => {
        if (err) {
            res.json({ code: 0, msg: '申请失败！' });
        }
        else {
            res.json({ code: 1, msg: '申请成功！' });
        }
    }
    )
})
// 查询角色状态
router.post('/role/status/:id', (req, res) => {
    db.User.findById(req.params.id).exec((err, data) => {
        if (err) {
            res.json({ code: 0, msg: '系统错误', user: null });
        }
        else {
            res.json({
                code: 1, user: {
                    id: data._id,
                    status: data.status.role ? true : false
                }
            });
        }
    })
})
// 申请管理员
router.post('/role/change/:id', (req, res) => {
    db.User.findByIdAndUpdate(req.params.id, {
        $set: {
            'status.role': true,
        }
    }, (err, data) => {
        if (err) {
            res.json({ code: 0, msg: '申请失败！' });
        }
        else {
            res.json({ code: 1, msg: '申请成功！' });
        }
    }
    )
})
module.exports = router