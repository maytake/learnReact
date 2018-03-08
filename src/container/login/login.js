import React from 'react'
import Logo from '../../component/logo/logo'
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import {login} from '../../redux/user.redux'


@connect(
	state=>state.user,
	{login}
)
class Login extends React.Component{
	constructor(props) {
		super(props)
		this.state = {
			user:'',
			pwd:''
		}
        this.register = this.register.bind(this)
	}
    register(){
        console.log(this.props)
        this.props.history.push('/register')
    }

    render(){

        return (
			<div>

				<Logo></Logo>
				<h2>我是登陆页面</h2>
				<WingBlank>
					<List>
						<InputItem>用户</InputItem>
						<InputItem>密码</InputItem>
					</List>
					<Button type='primary'>登录</Button>
					<WhiteSpace/>
					<Button type='primary' onClick={this.register}>注册</Button>
				</WingBlank>
			</div>

        )
    }
}

export default Login