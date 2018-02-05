import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';
import action from '../redux/store/action/action';
import { NavBar } from 'antd-mobile';
import { connect } from 'react-redux';
import Boss from '../components/Boss'; 
import Genius from '../components/Genius';
import Msg from '../components/message';
import NavLinkBar from './NavLinkBar';
import UserCenter from '../components/UserCenter'; 
// import io from 'socket.io-client';

import * as style from './common.styl';
const css: any = style;
// const socket = io('ws://127.0.0.1:6060');

const mapDispatchToState = (dispatch: any, getState: any) => {
	return {
		getUnReadNum() {
			return axios.get('/users/getUnRead').then(res => {
				dispatch(action.GET_UN_READ(res.data.data.length));
			});	
		}
	};
};
@(connect as any)(
	(state: any) => state.signReducer,
	mapDispatchToState 
)
export default class DashBorad extends React.Component<any> {
	constructor(props: any) {
		super(props);
	}
	componentDidMount() {
		this.props.getUnReadNum();
	}
	render() {
		const NavList = [
			{
				path: '/boss',
				text: '牛人',
				icon: 'boss',
				title: '牛人列表',
				component: Boss,
				hide: this.props.type === 'genius'
			},
			{
				path: '/genius',
				text: 'BOSS',
				icon: 'job',
				title: 'BOSS列表',
				component: Genius,
				hide: this.props.type === 'boss'
			},
			{
				path: '/msg',
				text: '消息',
				icon: 'msg',
				title: '消息列表',
				component: Msg
			},
			{
				path: '/me',
				text: '我',
				icon: 'user',
				title: '个人中心',
				component: UserCenter
			},
		];
		const { pathname } = this.props.location;
		let currentObj: any = NavList.find((v: any) => v.path === pathname);
		return (
			<div className={css.dashBorad}>
				<NavBar mode="dark">
					{currentObj.title}
				</NavBar>	
				<div className={css.routerWrap}>
					<Switch>
						{NavList.map((v: any, i: number) => (
							<Route key={i} path={v.path} component={v.component} />
						))}
					</Switch>
				</div>
				<NavLinkBar data={NavList}/>
			</div>
		);
	}
}