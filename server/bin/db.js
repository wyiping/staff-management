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
	isAdmin: { type: Boolean, default: false },
	department: {
		default: { type: Schema.Types.ObjectId, ref: "department", default: null },
		new: { type: Schema.Types.ObjectId, ref: "department", default: null },
	},
	password: String,
	phone: { type: String, default: '' },
	detail: {
		age: { type: Number, default: 0 },
		address: { type: String, default: '' },
		email: { type: String, default: '' },
		introduce: { type: String, default: '' },
		sex: { type: String, default: '' },
	},
	status: {
		register: { type: String, default: '待审核' },
		department: { type: Boolean, default: false },
		role: { type: Boolean, default: false }
	}
});
UserSchema.plugin(AutoIncrement, { inc_field: 'workId' })
var User = mongoose.model('user', UserSchema);

// 部门
var DepartmentSchema = new Schema({
	id: Number,
	name: { type: String, unique: true }
})
DepartmentSchema.plugin(AutoIncrement, { inc_field: 'id' })
var Department = mongoose.model('department', DepartmentSchema)
// 导出模块
module.exports = { User, Department };