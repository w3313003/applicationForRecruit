import * as Types from './actionType'
export default {
	ADD_GUN:  () => ({
		type: Types.ADD_GUN,
		message: '添加机关枪'
	}),
	DECREASE_GUN:  () => ({
		type: Types.DECREASE_GUN
	})
};