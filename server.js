var app = require('./server/bin/app')

// 登录和注册路由
app.use('/', require('./server/router/index'))
// 员工路由
app.use('/', require('./server/router/staff'))

// 监听端口
app.listen(3000, () => console.log('启动成功，端口3000.'))