import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserList } from '../../redux/store/reducer/chatUser';
import UserCard from '../../common/usercard';
// const mapStateToProps = (state: any) => ({
// 	userList: state.chatUserReducer
// });

@(connect as any)(
	(state: any) => state.chatUserReducer,
	{ getUserList }
)
@(withRouter as any)
export default class Boss extends React.Component<PropsInspect.NoCheck> {
	public state: {
		data: any[]
	};
	constructor(props: any) {
		super(props);
		this.state = {
			data: []
		};
	}
	componentDidMount() {
		this.props.getUserList('genius');
	}
	render() {
		return (
			<div>
				<UserCard userList={this.props.userList}/>
			</div>
		);
	}
}