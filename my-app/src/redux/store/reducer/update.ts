import { UPDATE } from '../action/actionType';

interface ActionInspect {
	type: string;
	payload?: any;
}
const initState = {
	icon: '',
	text: ''
};

export default (state: any = initState, action: ActionInspect) => {
	const { payload, type } = action;
	switch (type) {
		case UPDATE:
			return {...state, ...payload};
		default:
			return state;
	}
};