import * as Types from './actionType';

// action generator
const action: any = {
	[Types.REGISTER_SUCCESS]: (payload: any) => ({
		type: Types.REGISTER_SUCCESS,
		payload
	}),
	[Types.ERROR_MSG]: (payload: any) => ({
		type: Types.ERROR_MSG,
		payload
	}),
	[Types.LOGIN_SUCCESS]: (payload: any) => ({
		type: Types.LOGIN_SUCCESS,
		payload
	}),
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