import * as React from 'react';
import { connect } from 'react-redux';
import action from '../../redux/store/action/action';
import axios from 'axios';
import { Button, WhiteSpace, List, InputItem, Radio, Toast } from 'antd-mobile';
import Logo from '../../common/logo/logo';
import * as style from './register.styl';
import { Redirect } from 'react-router-dom';
const css: any = style;
const RadioItem = Radio.RadioItem;
interface InspectProps {
	toRegister: (data: {}) => any;
	redirect: string;
}
const mapStateToProps = (state: any) => {
	return {
		isAuth: state.signReducer.isAuth,
		redirect: state.signReducer.redirectTo
	};
};
const mapDispatchToProps = (dispatch: any) => {
	return {
		toRegister: (data: {}) => {
			axios.post('/users/register', data).then(res => {
				if (res.status === 200 && res.data.code === 0) {
					dispatch(action.REGISTER_SUCCESS(data));
				} else if ( res.data.msg = 'Duplicate username') {
					Toast.fail('用户名已被注册');
				}
			});
		}
	};
};
/**
 * 注册组件
 * @export
 * @class Register
 * @extends {React.Component}
 * @connect 装饰器 连接state和props
 * @genericType <InspectProps>
 */
@(connect as any)(mapStateToProps, mapDispatchToProps)
export class Register extends React.Component<InspectProps> {
	public state: {
		option: object[];
		currentIdentity: string;
		userName: string;
		password: string;
		cPassword: string;
	};
	constructor (props: any) {
		super(props);
		this.state = {
			currentIdentity: 'genius',
			userName: '',
			password: '',
			cPassword: '',
			option: [
				{
					type: 'genius',
					title: '牛人',
				},
				{
					type: 'boss',
					title: 'BOSS'
				}
			]
		};
	}
	identityToggle = (identity: any) => {
		this.setState({
			currentIdentity: identity
		});
	}
	handleChange(key: string, val: string | number) {
		this.setState({
			[key]: val
		});
	}
	register = (): boolean | void => {
		if (this.state.userName.length < 5) {
			Toast.fail('用户名最少需要五个字符', 2);
			return false;
		}
		if (this.state.password !== this.state.cPassword) {
			Toast.fail('两次输入的密码不一致', 2);
			return false;
		}
		let data = {
			userName: this.state.userName,
			password: this.state.password,
			cPassword: this.state.cPassword,
			type: this.state.currentIdentity
		};
		this.props.toRegister(data);
		return;
	} 
	render() {
		return (
			<div className={css.wrap}>
				{this.props.redirect ? <Redirect to={this.props.redirect}/> : null}
				<Logo/>	
				<WhiteSpace/>
				<List>
					<InputItem
						onChange={(v: string) => {this.handleChange('userName', v); }} 
						placeholder="请输入用户名"
					>用户名
					</InputItem>
					<InputItem 
						type="password" 
						placeholder="请输入密码"
						onChange={(v: string) => {this.handleChange('password', v); }} 
					>密码
					</InputItem>
					<InputItem 
						type="password" 
						placeholder="再次输入密码"
						onChange={(v: any) => {this.handleChange('cPassword', v); }}
					>确认密码
					</InputItem>
				</List>
				{this.state.option.map((v: any, i) => {
					return (
						<RadioItem 
							key={i} 
							onClick={(identity: string) => { this.identityToggle(v.type); }} 
							checked={this.state.currentIdentity === v.type}
						>
							{v.title}
						</RadioItem>
					);
				})}
				<WhiteSpace/>
				<Button onClick={this.register} type="primary">注册</Button>
			</div>
		);
	}
}