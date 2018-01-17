import * as React from 'react';
import { List, Button, InputItem, WingBlank, WhiteSpace } from 'antd-mobile';
import * as css from './login.styl';
import Logo from '../../common/logo/logo';
interface CssStyle {
	[property: string]: any;
}
const style: CssStyle = css;

interface ForProps {
	history: any;
}

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
		console.log(this.state);
	}
	render() {
		return (
			<div>
				<Logo/>
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
