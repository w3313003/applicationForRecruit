import * as React from 'react';
import { Result, List, Button, WhiteSpace, Modal } from 'antd-mobile';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logoutSubmit } from '../../redux/store/reducer/signUp';
@(connect as any)(
	(state: any) => state.signReducer,
	{ logoutSubmit }
)
export default class PersonalCenter extends React.Component<any> {
	logout = () => {
		Modal.alert('退出', '确定退出登录？', [
			{
				text: '取消', 
				onPress: () => { console.log('cancel'); }
			},
			{
				text: '退出',
				onPress: () => {
					this.props.logoutSubmit();
				}
			}
		]);
	}
	render() {
		console.log(this.props.avatar);
		return (
			<div>
				{this.props.redirectTo === '/login' && <Redirect to={this.props.redirectTo}/>} 
				{this.props.avatar ? 
					<Result
						img={<img width="60" height="60" src={require(`../../assets/img/${this.props.avatar}.png`)} alt="3"/>}
						title={this.props.userName} 
						message={this.props.type === 'boss' ? this.props.company : null}
					/> : null
				}
				<List
					renderHeader={() => '简介'}
				>
					<List.Item
						wrap={true}
					>
						{this.props.title}{this.props.title}{this.props.title}{this.props.title}{this.props.title}{this.props.title}{this.props.title}
						{this.props.requirement && this.props.requirement.split('\n').map((v: any, i: number) => (
							<List.Item.Brief key={i}>
								{v}
							</List.Item.Brief>
						))}
						{this.props.salary ? <List.Item.Brief>待遇：{this.props.salary}</List.Item.Brief> : null}
					</List.Item>
				</List>	
				<WhiteSpace/>
				<Button onClick={this.logout}>
					退出登陆
				</Button>
			</div>
		);
	}
}