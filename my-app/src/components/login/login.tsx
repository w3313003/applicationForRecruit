import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { List, Button, InputItem, WingBlank, WhiteSpace, Toast } from 'antd-mobile';
import axios from 'axios';
import * as css from './login.styl';
import Logo from '../../common/logo/logo';
import { connect } from 'react-redux';
import action from '../../redux/store/action/action';
import { HOCfrom } from '../../common/formComponent';
interface CssStyle {
	[property: string]: any;
}
const style: CssStyle = css;

const mapPropsTostate = (dispatch: any) => {
	return {
		login (data: {userName: string, password: string}) {
			let { userName, password } = data; 
			if (!userName || !password ) {
				Toast.offline('请完善登陆信息');
				return;
			}
			axios.post('/users/login', data).then(res => {
				if (res.data.code === 0) {
					dispatch(action.AUTH_SUCCESS(res.data.data));
				} else {
					Toast.offline('登录失败');
				}
			});
		}
	};
};

function decorator(Component: any) {
	return class extends React.Component {
		render() {
			return (
				<div>
					<p>decorator</p>
					<Component {...this.props}/>
				</div>
			);
		}
	};
}

class Hello extends React.Component {
	render() {
		return <div>heelo</div>;
	}
}
const Hellos = decorator(Hello);

@(connect as any)(
	(state: any) => state.signReducer,
	mapPropsTostate
)
@(HOCfrom as any)
export class Login extends React.Component<any> {
	constructor(props: any) {
		super(props);
	}
	toRegister = () => {
		this.props.history.push('/register');
	}
	toLogin = () => {
		let { userName, password } = this.props.state,
			data = {
				userName,
				password
			};
			
		this.props.login(data);
	}
	componentDidMount() {
		console.log(this.props);
	}
	render() {
		return (
			<div>
				<Hellos/>
				<Logo/>
				{this.props.redirectTo && this.props.redirectTo !== this.props.location.pathname ? <Redirect to={this.props.redirectTo}/> : null}
				<WingBlank>
					<List>
						<InputItem 
							placeholder="请输入用户名"
							onChange={(v: string) => this.props.handleChange('userName', v)}
						>
							用户名
						</InputItem>
						<InputItem 
							placeholder="请输入密码" 
							type="password"
							onChange={(v: string) => this.props.handleChange('password', v)}
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
