import * as React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import action from '../redux/store/action/action';
import { connect } from 'react-redux'; 
interface InspectProps {
	[property: string]: any;
}

const mapDispatchToProps = (dispatch: any) => {
	return {
		loaddata(data: {}) {
			dispatch(action.LOAD_DATA(data));
		}
	};
};
//  把路由信息加入非路由组件中
@(withRouter as any)
@(connect as any)(
	null,
	mapDispatchToProps
)
export default class Auth extends React.Component<InspectProps> {
	constructor(props: InspectProps) {
		super(props);
	}
	componentDidMount() {
		const pulibcPath = ['/login', '/register'],
			  pathName = this.props.location.pathName;
		if (pulibcPath.indexOf(pathName) > -1) {
			return;
		}
		axios.get('/users/userStatus').then(res => {
			if (res.status === 200) {
				if (res.data.code === 0) {
					console.log(this.props);
					this.props.loaddata(res.data.data);
				} else {
					this.props.history.push('/login');
				}
			}
		});
	}
	render() {
		return null;
	}
}