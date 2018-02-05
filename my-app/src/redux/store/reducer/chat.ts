import { GET_CHAT_MESSAGE_LIST, GET_MSG_RECEIVE, IS_READ, GET_UN_READ } from '../action/actionType';
// import io from 'socket.io-client';
// const socket = io('ws://127.0.0.1:6060');

const initState = {
	chatList: [],
	unread: 0,
	users: {}
};

export default (state = initState, action: PropsInspect.ActionInspect) => {
	const { type, payload } = action;
	switch (type) {
		case GET_CHAT_MESSAGE_LIST:
			if (!payload.users) {
				return {...state, chatList: payload.chatList};
			}
			return {...state, chatList: payload.chatList, users: payload.users};
		case GET_MSG_RECEIVE:
			return {...state, chatList: [...state.chatList, payload], unread: state.unread + 1};
		case IS_READ:
			return state;
		case GET_UN_READ: 
			return {...state, unread: payload};
		default: 
			return state;
	}
};