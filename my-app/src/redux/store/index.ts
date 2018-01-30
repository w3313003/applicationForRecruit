import { combineReducers } from 'redux';
// import AppReducer from './reducer/app';
import signReducer from './reducer/signUp';
// import updateReducer from './reducer/update';
import chatUserReducer from './reducer/chatUser';
import chatReducer from './reducer/chat';
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

export default combineReducers({globalReducer, signReducer, chatUserReducer, chatReducer});