import React from 'react'
import Logo from '../../component/logo/logo'
import {List, InputItem,Radio, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {regisger} from '../../redux/user.redux'


@connect(
	state=>state.user,
	{regisger}
)
class Register extends React.Component{


	constructor(props) {
		super(props)
		this.state = {
			user:'',
			pwd:'',
			repeatpwd:'',
			type:'genius' // 或者boss
		}
		this.register = this.register.bind(this)
	}
    register(){
		console.log(this.props)
		this.props.history.push('/register')
	}
    handleChange(key,val){
        this.setState({
            [key]:val
        })
    }
    handleRegister(){
        console.log(this.state)
    }

	render(){
        const RadioItem = Radio.RadioItem;
		return (
			<div>

				<Logo></Logo>
				<h2>注册页面</h2>
				<WingBlank>
					<List>
						<InputItem onChange={(v)=>this.handleChange('user',v)}>用户</InputItem>
						<InputItem onChange={(v)=>this.handleChange('pwd',v)}>密码</InputItem>
						<InputItem onChange={(v)=>this.handleChange('repeatpwd',v)}>确认密码</InputItem>
						<WhiteSpace/>
						<RadioItem
                            checked={this.state.type === 'genuis'}
                            onChange={(v)=>this.handleChange('type','genuis')}
                        >
                           牛人
						</RadioItem>
						<RadioItem
                            checked={this.state.type === 'boss'}
                            onChange={(v)=>this.handleChange('type','boss')}
                        >
							BOSS
						</RadioItem>
					</List>

					<WhiteSpace/>
					<Button type='primary' onClick={this.handleRegister.bind(this)}>注册</Button>
				</WingBlank>
			</div>

		)
	}
}

export default Register