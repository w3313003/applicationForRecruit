import * as React from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import axios from 'axios';
import action from '../../redux/store/action/action';
import { List, InputItem, Toast, NavBar, Icon } from 'antd-mobile';
import * as style from './chat.styl';
const css = style as any,
	socket = io('ws://127.0.0.1:6060');

const mapDispatchToState = (dispatch: any) => {
	return {
		getMsgList() {
			return axios.get('/users/getmsglist').then(res => {
				if (res.data.code === 0 && res.status === 200) {
					dispatch(action.GET_CHAT_MESSAGE_LIST(res.data.data));
				}
			});
		},
		sendMsg({from, to, msg}: any) {
			if (msg.length < 1) {
				Toast.fail('不得少于1字');
				return;
			}
			socket.emit('sendMsg', {from, to, msg});
		},
		receiveMsg() {
			return socket.on('receiveMsg', (data: any) => {
				dispatch(action.GET_MSG_RECEIVE(data));
			});
		}
	};
};

@(connect as any)(
	(state: any) => state,
	mapDispatchToState 
)
export default class Chat extends React.Component<PropsInspect.RouterProps & any> {
	public state: {
		text: string;
		msg: string[];
	};
	constructor(props: any) {
		super(props);
		this.state = {
			text: '',
			msg: []
		};
	}
	componentDidMount() {
		if (!this.props.chatReducer.chatList.length) {
			this.props.getMsgList();
			this.props.receiveMsg();
		}
	}
	submit = () => {
		const from = this.props.signReducer._id,
			to = this.props.match.params.userid,
			msg = this.state.text;
		this.props.sendMsg({from, to, msg});
		this.setState({
			text: ''
		});
	}
	back = () => {
		this.props.history.goBack();
	}
	render() {
		const users = this.props.chatReducer.users;
		if (!users || !users[this.props.match.params.userid]) {
			return null;
		}
		return (
			<div className={css.chatWrap}>
				<NavBar 
					mode="dark"
					icon={<Icon type="left" />}
					onLeftClick={this.back}
				>
					{users[this.props.match.params.userid].name}
				</NavBar>
				<div className={css.chatContent}>
					{this.props.chatReducer.chatList.map((v: any, i: number) => {
						if (this.props.match.params.userid === v.from) {
							const avatar = require(`../../assets/img/${users[v.from].avatar}.png`);
							return (<div className={css.left} key={i}>
										<div className={css.wrap}>
											<img src={avatar} alt=""/>
											<p className={css.content}>
												<span>{v.content}</span>
											</p>
										</div>
										<p className={css.time}>{v.create_time}</p>
									</div>);
						} else {
							const avatar = require(`../../assets/img/${this.props.signReducer.avatar}.png`);
							return <div className={css.right} key={i}>
										<div className={css.wrap}>
											<p className={css.content}>
												<span>{v.content}</span>
											</p>
											<img src={avatar} alt=""/>
										</div>
										<p className={css.time}>{v.create_time}</p>
									</div>;
						}
						
					})}
				</div>
				<div className={css.chatBox}>
					<List>
						<InputItem
							placeholder="请输入"
							value={this.state.text}
							onChange={(v: string) => {
								this.setState({
									text: v
								});
							}}
							extra={<span onClick={this.submit}>发送</span>}
						/>
					</List>
				</div>
			</div>
		);
	}
}