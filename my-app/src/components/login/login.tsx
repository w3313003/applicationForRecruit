import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { List, Button, InputItem, WingBlank, WhiteSpace } from 'antd-mobile';
import axios from 'axios';
import * as css from './login.styl';
import Logo from '../../common/logo/logo';
import { connect } from 'react-redux';
import action from '../../redux/store/action/action';
interface CssStyle {
	[property: string]: any;
}
const style: CssStyle = css;

interface ForProps {
	history: any;
	login: Function;
	redirectTo: string;
}
const mapPropsTostate = (dispatch: any) => {
	return {
		login (data: {}) {
			axios.post('/users/login', data).then(res => {
				if (res.data.code === 0) {
					dispatch(action.LOGIN_SUCCESS(res.data.data));
				}
			});
		}
	};
};

@(connect as any)(
	(state: any) => state.signReducer,
	mapPropsTostate
)
export class Login extends React.Component<ForProps, {}> {
	public state: {
		userName: string,
		password: string
	};
	constructor(props: ForProps) {
		super(props);
		this.state = {
			userName: '',
			password: ''
		};
	}
	toRegister = () => {
		this.props.history.push('/register');
	}
	handleChange = (key: string, v: string): void => {
		this.setState({
			[key]: v
		});
	}
	toLogin = () => {
		let { userName, password } = this.state,
			data = {
				userName,
				password
			};
		this.props.login(data);
	}
	render() {
		return (
			<div>
				<Logo/>
				{this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> : null}
				<WingBlank>
					<List>
						<InputItem 
							placeholder="请输入用户名"
							onChange={(v: string) => this.handleChange('userName', v)}
						>
							用户名
						</InputItem>
						<InputItem 
							placeholder="请输入密码" 
							type="password"
							onChange={(v: string) => this.handleChange('password', v)}
						>
							密码
						</InputItem>
					</List>
					<WhiteSpace/>
					<div className={style.button}>
						<Button type="primary" onClick={this.toLogin}>登陆</Button>
						<WhiteSpace/>
						<Button type="warning" onClick={this.toRegister}>注册</Button>
					</div>
					
				</WingBlank>
			</div>
		);
	}
}
