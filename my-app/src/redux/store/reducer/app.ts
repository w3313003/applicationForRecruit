import { ADD_GUN, DECREASE_GUN, Async } from '../action/actionType';

const _initState: any = {
	num: 0
};

interface InspectAction {
	type: string;
	payload?: any;
}

export default (state = _initState, action: InspectAction) => {
	const { type, payload } = action;
	switch (type) {
		case ADD_GUN:
			return { ...state, num: state.num + Math.floor(Math.random() * (10 - 1 + 1) + 1) };
		case DECREASE_GUN:
			return Object.assign({}, state, { num: state.num - Math.floor(Math.random() * (10 - 1 + 1) + 1) });
		case Async:
			return Object.assign({}, state, { num: state.num + payload.name });
		default:
			return state;
	}
};