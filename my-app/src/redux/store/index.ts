import { combineReducers } from 'redux';
import AppReducer from './reducer/app';
import signReducer from './reducer/signUp';

const _globalState = {
	isLogin: false
};
interface InspectAction {
	type: string;
	payload?: any;
}

const globalReducer = (state = _globalState, action: InspectAction) => {
	const { type } = action;
	switch (type) {
		default: 
			return state;
	}
};

export default combineReducers({globalReducer, AppReducer, signReducer});
