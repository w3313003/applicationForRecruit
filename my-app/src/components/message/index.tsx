import * as React from 'react';
import { connect } from 'react-redux';
import action from '../../redux/store/action/action';
import axios from 'axios';
import { List, Badge } from 'antd-mobile';
import io from 'socket.io-client';
const socket = io('ws://127.0.0.1:6060');
const mapDispatchToProps = (dispatch: any) => {
	return {
		getChatList() {
			return axios.get('/users/getMyChat').then(res => {
				if (res.data.code === 0 && res.status === 200) {
					dispatch(action.GET_CHAT_MESSAGE_LIST({chatList: res.data.data}));
				}
			});
		},
		receiveMsg() {
			socket.on('receiveMsg', (data: any) => {
				dispatch(action.GET_MSG_RECEIVE(data));
			});
		},
		getUserList() {
			axios.get(`/users/userInfo?type=genius`).then(res => {
				dispatch(action.CHATUSER_LIST(res.data.data));
			});
		}
	};
};

@(connect as any)(
	(state: any) => state,
	mapDispatchToProps
)
export default class Msg extends React.Component<any> {
	componentDidMount() {
		this.props.getUserList('genius');
		this.props.getChatList();
		this.props.receiveMsg();
	}
	public getLastItem = (arr: any[]) => {
		return arr[arr.length - 1];
	}
	render() {
		const msgGroup = {};
		this.props.chatReducer.chatList.forEach((v: any, i: number) => {
			msgGroup[v.chatId] = msgGroup[v.chatId] || [];
			msgGroup[v.chatId].push(v);
		});
		const chatList = (Object as any).values(msgGroup).sort((a: any, b: any) => {
			return  new Date(this.getLastItem(b).create_time).getTime() - new Date(this.getLastItem(a).create_time).getTime();
		});
		const userId = this.props.signReducer._id;
		return (
			<div>
				<List>
					{chatList.map((v: any, i: number) => {
						let targetId = this.getLastItem(v).from === userId ? this.getLastItem(v).to : this.getLastItem(v).from;
						const target = this.props.chatUserReducer.userList.find((d: any) => {
							return targetId === d._id;
						});
						const unReadNum = v.filter((d: any) => !d.isRead && d.to === userId).length;
						console.log(target);
						return( 
							<List.Item
								key={i}
								thumb={require(`../.././assets/img/${target.avatar}.png`)}
								extra={<Badge text={unReadNum}/>}
								arrow="horizontal"
								onClick={() => {
									this.props.history.push(`/chat/${targetId}`);
								}}
							> 
								{this.getLastItem(v).content}
								<List.Item.Brief>
									{target.userName}
								</List.Item.Brief>
							</List.Item>
						);
					})}
				</List>
			</div>
		);
	}
} 