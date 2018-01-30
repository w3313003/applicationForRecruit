import { GET_CHAT_MESSAGE_LIST, GET_MSG_RECEIVE, IS_READ } from '../action/actionType';
// import io from 'socket.io-client';
// const socket = io('ws://127.0.0.1:6060');

const initState = {
	chatList: [],
	unread: 0
};

export default (state = initState, action: PropsInspect.ActionInspect) => {
	const { type, payload } = action;
	switch (type) {
		case GET_CHAT_MESSAGE_LIST:
			return {...state, chatList: payload.chatList, users: payload.users, unread: payload.chatList.filter((v: any) => !v.isRead).length };
		case GET_MSG_RECEIVE:
			return {...state, chatList: [...state.chatList, payload], unread: state.unread + 1};
		case IS_READ:
			return state;
		default: 
			return state;
	}
};