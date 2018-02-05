import * as React from 'react';
import { TabBar } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
interface PropsType extends PropsInspect.RouterProps {
	data: object[];
}
@(withRouter as any)
@(connect as any)(
	(state: any) => state.chatReducer,
	null 
)
export default class NavLinkBar extends React.Component<PropsType & any> {
	constructor(props: PropsType) {
		super(props);
	}
	render() {
		const navList = this.props.data.filter((v: any) => !v.hide);
		const pathName = this.props.location.pathname;
		return (
				<TabBar>
					{navList.map((v: any, i: number) => {
						return  (
								<TabBar.Item 
									badge={v.path === '/msg' ? this.props.unread : null}
									key={i}  
									title={v.text} 
									icon={{uri: require(`../assets/nav/${v.icon}.png`)}} 
									selectedIcon={{uri: require(`../assets/nav/${v.icon}-active.png`)}}
									selected={pathName === v.path}
									onPress={() => this.props.history.push(v.path)}
								/>
							);
						})}
				</TabBar>
		);
	}
}