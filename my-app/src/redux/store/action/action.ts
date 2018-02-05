import * as Types from './actionType';
// action generator
const action: any = {
	//  登录注册
	[Types.ERROR_MSG]: (payload: any) => ({
		type: Types.ERROR_MSG,
		payload
	}),
	[Types.AUTH_SUCCESS]: (payload: any) => ({
		type: Types.AUTH_SUCCESS,
		payload
	}),
	[Types.LOAD_DATA]: (payload: any) => ({
		type: Types.LOAD_DATA,
		payload
	}),
	//  完善信息
	[Types.UPDATE]: (payload: any) => ({
		type: Types.UPDATE,
		payload
	}),
	//  聊天用户
	[Types.CHATUSER_LIST]: (payload: any) => ({
		type: Types.CHATUSER_LIST,
		payload
	}),
	//  退出并清空redux
	[Types.LOGOUT]: () => ({
		type: Types.LOGOUT
	}),
	// 聊天相关
	[Types.GET_CHAT_MESSAGE_LIST]: (payload: any) => ({
		type: Types.GET_CHAT_MESSAGE_LIST,
		payload
	}),
	[Types.GET_MSG_RECEIVE]: (payload: any) => ({
		type: Types.GET_MSG_RECEIVE,
		payload
	}),
	[Types.GET_UN_READ]: (payload: any) => ({
		type: Types.GET_UN_READ,
		payload
	}),
	[Types.IS_READ]: () => ({
		type: Types.IS_READ
	}),
	// invalid
	[Types.ADD_GUN]:  () => ({
		type: Types.ADD_GUN,
	}),
	[Types.DECREASE_GUN]:  () => ({
		type: Types.DECREASE_GUN
	}),
	[Types.Async]: (payload: any) => ({
		type: Types.Async,
		payload 
	})
};

export default action;