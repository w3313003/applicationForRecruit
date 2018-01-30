import { ERROR_MSG, LOAD_DATA, UPDATE, AUTH_SUCCESS, LOGOUT } from '../action/actionType';
import { getRedirectPath } from '../../../util';
import axios from 'axios';
import actions from '../action/action';

const initState = {
	redirectTo: '',
	isAuth: false,
	userName: '',
	type: ''
};
export const logoutSubmit = () => {
	return (dispatch: any) => {
		axios.delete('/users').then(res => {
			if (res.data.code === 0) {
				dispatch(actions.LOGOUT());
			}
		});
	};
};

export default (state = initState, action: PropsInspect.ActionInspect) => {
	const { type, payload } = action;
	switch (type) {
		case AUTH_SUCCESS:
			return {
				...state,
				...payload,
				redirectTo: getRedirectPath(payload)
			};
		case LOAD_DATA:
			return {
				...state,
				...payload
			};
		case ERROR_MSG:
			return { ...state, isAuth: false };
		case UPDATE:
			return {...state};
		case LOGOUT: 
			return {...initState, redirectTo: '/login'};
		default:
			return state;
	}
};