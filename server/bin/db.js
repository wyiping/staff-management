//导入mongoose模块
const mongoose = require('mongoose')
// 自动增长模块
const AutoIncrement = require('mongoose-sequence')(mongoose)
//设置数据库连接地址
mongoose.connect('mongodb://localhost:27017/staff_management')

//连接数据库
var db = mongoose.connection;

// 数据库连接失败的提示
db.on('error', err => console.error('数据库连接错误：', err));
// 数据库连接成功的提示
db.once('open', () => console.log('数据库连接成功'));

var Schema = mongoose.Schema;

// 用户
var UserSchema = new Schema({
	workId: Number,
	name: String,
	isAdmin: Boolean,
	department: String,
	password: String,
	detail: {
		age: Number,
		address: String,
		email: String,
		introduce: String,
		phone: String,
		sex: String
	}
});
UserSchema.plugin(AutoIncrement, {inc_field: 'workId'})
var User = mongoose.model('user', UserSchema);

// 导出模块
module.exports = { User };