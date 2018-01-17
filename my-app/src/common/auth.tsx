import * as React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

interface InspectProps {
	[property: string]: any;
}
@(withRouter as any)
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