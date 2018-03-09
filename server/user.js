const express = require('express')
const utils =  require('utility')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')



Router.get('/list',function(req, res){
    User.find({},function(err, doc){
        return res.json(doc)
	})

})

Router.get('/register',function(req, res){
	console.log(req.body)
	const {user, pwd, type} = req.body
	User.findOne({user:user},function(err, doc){
		if(doc){// 查到用户名，重复了不可以注册
			return res.json({code:1, msg:'用户名重复'})
		}
		User.create({user,pwd: md5Pwd(pwd), type},function(e, d){
			if(e){
				return res.json({code:1,msg:'后端出错了'})
			}
			return res.json({code:0})
		})
	})
})

Router.get('/info',function(req, res){
	return res.json({code:0})
})

function md5Pwd(pwd){
	const salt = '75454_coll@@$#foolyou'
	return utils.md5(utils.md5(pwd+salt))
}


module.exports = Router