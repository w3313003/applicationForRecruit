import * as React from 'react';
// import { WingBlank, Card, WhiteSpace } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserList } from '../../redux/store/reducer/chatUser';
import UserCard from '../../common/usercard';
@(connect as any)(
	(state: any) => state.chatUserReducer,
	{ getUserList }
)
@(withRouter as any)
export default class Genius extends React.Component<PropsInspect.NoCheck>{
	componentDidMount() {
		this.props.getUserList('boss');
	}
	render() {
		console.log(this.props);
		return (
			<div>
				<UserCard userList={this.props.userList}/>
			</div>
		);
	}
}