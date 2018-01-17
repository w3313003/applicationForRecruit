import { REGISTER_SUCCESS, ERROR_MSG } from '../action/actionType';
import { getRedirectPath } from '../../../util';
const initState = {
	redirectTo: '',
	isAuth: false,
};

interface InspectAction {
	type: string;
	payload?: any;
}

export default (state = initState, action: InspectAction) => {
	const { type, payload } = action;
	switch (type) {
		case REGISTER_SUCCESS:
			return { ...state, redirectTo: getRedirectPath(payload), isAuth: true };
		case ERROR_MSG:
			return { ...state, isAuth: false };
		default:
			return state;
	}
};