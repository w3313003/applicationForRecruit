import axiox from 'axios';
import { Toast } from 'antd-mobile';

//   拦截请求
axiox.interceptors.request.use((config: any) => {
	Toast.loading('全力加载中', 0, () => { return; }, true);
	// let countDown: number = 0;
	// const id = setInterval(
	// 	() => {
	// 		countDown++;
	// 		if (countDown >= 5) {
	// 			Toast.hide();
	// 			Toast.fail('网络错误', 2);
	// 			setTimeout(
	// 				() => {
	// 					Toast.hide();
	// 					clearInterval(id);
	// 				},
	// 				1000
	// 			);
	// 			countDown = 0;
	// 		}
	// 	}, 
	// 	1000
	// );
	return config;
});

//  拦截响应
axiox.interceptors.response.use((config: any) => {
	Toast.hide();
	return config;
});