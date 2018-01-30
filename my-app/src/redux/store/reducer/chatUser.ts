import { CHATUSER_LIST } from '../action/actionType';
import axios from 'axios';
import action from '../action/action';
const initState = {
	userList: []
};

export function getUserList(type: string) {
	return (dispatch: any) => {
		axios.get(`/users/userInfo?type=${type}`).then(res => {
			dispatch(action.CHATUSER_LIST(res.data.data));
		});
	};
} 

export default (state: any = initState, actions: PropsInspect.ActionInspect) => {
	const { type, payload } = actions;
	switch (type) {
		case CHATUSER_LIST:
			return {...state, userList: payload};
		default: 
			return state;
	}
};