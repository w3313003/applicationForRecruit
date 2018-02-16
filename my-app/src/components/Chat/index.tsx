import * as React from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import axios from 'axios';
import action from '../../redux/store/action/action';
import { List, InputItem, Toast, NavBar, Icon, Grid } from 'antd-mobile';
import * as style from './chat.styl';
const css = style as any,
	socket = io('ws://127.0.0.1:6060');

const mapDispatchToState = (dispatch: any) => {
	return {
		getMsgList(targetId: string) {
			return axios.post('/users/getmsglist', {targetId}).then(res => {
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
			socket.on('receiveMsg', (data: any) => {
				dispatch(action.GET_MSG_RECEIVE(data));
			});
		},
		readMsg(targetId: string) {
			return axios.post('/users/readMsg', {targetId}).then(res => {
				dispatch(action.GET_UN_READ(res.data.data));
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
		showEmoji: boolean
	};
	public div: any;
	constructor(props: any) {
		super(props);
		this.state = {
			text: '',
			msg: [],
			showEmoji: false
		};
	}
	componentWillMount() {	
		socket.open();
		this.props.getMsgList(this.props.match.params.userid);
		this.props.receiveMsg();
		this.fixCarousel();
		this.props.readMsg(this.props.match.params.userid);
	}
	componentDidMount() {
		console.log(this, new Date().toLocaleString());
		console.log(this.refs.content, new Date().toLocaleString());
	}
	componentDidUpdate() {
		setTimeout(
			() => {
				if (!this.div) {
					return null; 
				}
				return this.div.scrollTop = 9999999;
			},
			10
		);
	}
	componentWillUnmount() {
		socket.close();
	}
 	fixCarousel = () => {
		setTimeout(
		() => {
			window.dispatchEvent(new Event('resize'));
		}, 
		0);
	}
	submit = () => {
		const from = this.props.signReducer._id,
			to = this.props.match.params.userid,
			msg = this.state.text;
		this.props.sendMsg({from, to, msg});
		this.setState({
			text: '',
		});
	}
	back = () => {
		this.props.history.goBack();
	}
	render() {
		const emoji = '🤷 😃 🐻 ❤️ 😅 😪 🤑 💩 🤷 😃 🐻 😅 😪 🤑 💩 🤷 😃 🐻 😅 😪 🤑 💩 🤷 😃 🐻 😅 😪 🤑 💩 🤑 💩 🤷 😃 🐻 😅 😪 🤑 💩 🤷 😃 🐻 😅 😪 🤑 💩'.split(' ').map((v: string) => ({
			text: v
		}));
		const users = this.props.chatReducer.users;
		if (!users || !users[this.props.match.params.userid]) {
			return <div>123</div>;
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
				<div 
					className={css.chatContent} 
					ref={(div: any) => { this.div = div; }} 
					onClick={() => {
						this.setState({
							showEmoji: false
						});
					}}
				>
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
							const avatar = this.props.signReducer.avatar && require(`../../assets/img/${this.props.signReducer.avatar}.png`);
							return (
									<div className={css.right} key={i}>
										<div className={css.wrap}>
											<p className={css.content}>
												<span>{v.content}</span>
											</p>
											<img src={avatar} alt=""/>
										</div>
										<p className={css.time}>{v.create_time}</p>
									</div>
								);
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
							extra={
								<div>
									<span
										style={{marginRight: 15}}
										onClick={() => {
											this.setState({
												showEmoji: !this.state.showEmoji
											});
											this.fixCarousel();
										}}
									>
									❤️
									</span>
									<span onClick={this.submit}>发送</span>
								</div>
							}
						/>
					</List>
					{this.state.showEmoji && <Grid 
						data={emoji}
						columnNum={8}
						carouselMaxRow={4}
						isCarousel={true}
						onClick={(v: any) => {
							const input: any = document.querySelector('input[type=text]'),
								  cousurPos: number = input.selectionStart;
							const str = `${this.state.text.slice(0, cousurPos)}${v.text}${this.state.text.slice(cousurPos)}`;
							this.setState({
								text: str
							});
						}}
					/>}
				</div>
			</div>
		);
	}
}