const express = require('express')
const utils =  require('utility')//加密md5
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')

const _filter ={'pwd':0,'__v':0}

Router.get('/list',function(req, res){
    User.find({},function(err, doc){
        return res.json(doc)
	})

})

Router.post('/register',function(req, res){
	const {user, pwd, type} = req.body
	User.findOne({user:user},function(err, doc){
		if(doc){// 查到用户名，重复了不可以注册
			return res.json({code:1, msg:'用户名重复'})
		}
		const userModel = new User({user, type, pwd: md5Pwd(pwd)})
        userModel.save(function(e, d){//因为要存储一个用户Id,所以不能用User.create()，create生成之后才有id
			if(e){
				return res.json({code:1,msg:'后端出错了'})
			}
            const {user, type, _id} = d
            res.cookie('userid', _id)
			return res.json({code:0,data:{user, type, _id}})
		})
	})
})

Router.post('/login',function(req, res){
    const {user, pwd} = req.body
    User.findOne({user,pwd:md5Pwd(pwd)},_filter,function(err, doc){
        if(!doc){// 用户名不存在
            return res.json({code:1, msg:'用户名或者密码错误'})
        }
        res.cookie('userid', doc._id)
        return res.json({code:0,data:doc})
    })
})

Router.get('/info',function(req, res){
    const {userid} = req.cookies
    if (!userid) {
        return res.json({code:1})
    }
    User.findOne({_id:userid},_filter,function(err, doc){
		if(err){
            return res.json({code:1, msg:'后端出错了'})
		}
		if(doc){
            return res.json({code:0, data:doc})
		}
    })
})


function md5Pwd(pwd){
	const salt = '75454_coll@@$#foolyou'
	return utils.md5(utils.md5(pwd+salt))
}


module.exports = Router