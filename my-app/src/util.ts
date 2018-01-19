export function getRedirectPath({type, avatar}: any) {
	//  根据用户状态，返回跳转地址
	//  user.type  //boss genius
	// user.avatar bossInfo , geniusInfo
	let url: string = type === 'boss' ? '/boss' : '/genius';
	if (!avatar) {
		url += 'Info';
	}
	return url;
}
