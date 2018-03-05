var app = require('./bin/app')

// 登录和注册路由
app.use('/', require('./router/index'))

// 监听端口
app.listen(3000, () => console.log('启动成功，端口3000.'))