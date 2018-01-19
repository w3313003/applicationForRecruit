import { REGISTER_SUCCESS, ERROR_MSG, LOGIN_SUCCESS } from '../action/actionType';
import { getRedirectPath } from '../../../util';
const initState = {
	redirectTo: '',
	isAuth: false,
	userName: '',
	password: '',
	type: ''
};

interface InspectAction {
	type: string;
	payload?: any;
}

export default (state = initState, action: InspectAction) => {
	const { type, payload } = action;
	switch (type) {
		case REGISTER_SUCCESS:
			return { 
				...state, 
				...payload,
				redirectTo: getRedirectPath(payload),
			};
		case LOGIN_SUCCESS:
			return {
				...state,
				...payload,
				redirectTo: getRedirectPath(payload),
			};
		case ERROR_MSG:
			return { ...state, isAuth: false };
		default:
			return state;
	}
};