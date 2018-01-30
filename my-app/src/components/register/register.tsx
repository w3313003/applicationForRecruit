import * as React from 'react';
import { connect } from 'react-redux';
import action from '../../redux/store/action/action';
import axios from 'axios';
import { Button, WhiteSpace, List, InputItem, Radio, Toast } from 'antd-mobile';
import Logo from '../../common/logo/logo';
import * as style from './register.styl';
import { Redirect } from 'react-router-dom';
import { HOCfrom } from '../../common/formComponent';
const css: any = style;
const mapDispatchToProps = (dispatch: any) => {
	return {
		toRegister(data: {})  {
			axios.post('/users/register', data).then(res => {
				if (res.status === 200 && res.data.code === 0) {
					dispatch(action.AUTH_SUCCESS(data));
				} else if ( res.data.msg = 'Duplicate username') {
					Toast.fail('用户名已被注册');
					dispatch(action.ERROR_MSG(data));
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
@(connect as any)(
	(state: any) => state.signReducer,
	mapDispatchToProps
)
@(HOCfrom as any)
export class Register extends React.Component<any> {
	constructor (props: any) {
		super(props);
	}
	register = (): boolean | void => {
		if (this.props.userName.length < 5) {
			Toast.fail('用户名最少需要五个字符', 2);
			return false;
		}
		if (this.props.password !== this.props.cPassword) {
			Toast.fail('两次输入的密码不一致', 2);
			return false;
		}
		let data = {
			userName: this.props.userName,
			password: this.props.password,
			cPassword: this.props.cPassword,
			type: this.props.currentIdentity
		};
		this.props.toRegister(data);
		return;
	} 
	render() {
		console.log(this.props);
		return (
			<div className={css.wrap}>
				{this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> : null}
				<Logo/>	
				<WhiteSpace/>
				<List>
					<InputItem
						onChange={(v: string) => {this.props.handleChange('userName', v); }} 
						placeholder="请输入用户名"
					>用户名
					</InputItem>
					<InputItem 
						type="password" 
						placeholder="请输入密码"
						onChange={(v: string) => {this.props.handleChange('password', v); }} 
					>密码
					</InputItem>
					<InputItem 
						type="password" 
						placeholder="再次输入密码"
						onChange={(v: any) => {this.props.handleChange('cPassword', v); }}
					>确认密码
					</InputItem>
				</List>
				{this.props.state.option.map((v: any, i: number) => {
					return (
						<Radio.RadioItem 
							key={i} 
							onClick={(identity: string) => { this.props.identityToggle(v.type); }} 
							checked={this.props.state.currentIdentity === v.type}
						>
							{v.title}
						</Radio.RadioItem>
					);
				})}
				<WhiteSpace/>
				<Button onClick={this.register} type="primary">注册</Button>
			</div>
		);
	}
}