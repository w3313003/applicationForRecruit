import { ADD_GUN, DECREASE_GUN } from './action/actionType'
interface ReducerCheck {
	(state: Number | Object, action: { type: string, [property: string]: {} }): {};
}

const reducer: ReducerCheck = (state = 0, action) => {
	switch (action.type) {
		case ADD_GUN:
			return Number(state) + 1;
		case  DECREASE_GUN:
			if (state > 1) {
				return false;
			}
			return Number(state) - 1;
		default: 	
			return state;	
	}
};
export default reducer;