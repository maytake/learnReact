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
    handleChange(key,v){
		this.setState({
			[key]:v
		})
	}
    register(){
        this.props.history.push('/register')
    }
    handleLogin(){
    	this.props.login(this.state)
	}
    render(){

        return (
			<div>
				{this.props.redirectTo?<Redirect to={this.props.redirectTo}/>:null}
				<Logo></Logo>
				<WingBlank>
					<List>
                        {this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
						<InputItem onChange={v=>this.handleChange('user',v)}>用户</InputItem>
						<InputItem type="password" onChange={v=>this.handleChange('pwd',v)}>密码</InputItem>
					</List>
					<WhiteSpace/>
					<Button  type='primary' onClick={this.handleLogin.bind(this)}>登录</Button>
					<WhiteSpace/>
					<Button type='primary' onClick={this.register.bind(this)}>注册</Button>
				</WingBlank>
			</div>
        )
    }
}

export default Login