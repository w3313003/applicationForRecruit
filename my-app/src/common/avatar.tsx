import * as React from 'react';
import { Grid, List } from 'antd-mobile';

interface PropsInspect {
	selectAvatar: Function;
}
export default class AvatarSelector extends React.Component<PropsInspect> {
	public state: {
		icon: string;
		text: string;
	};
	constructor(props: any) {
		super(props);
		this.state = {
			icon: '',
			text: ''
		};
	}
	render() {
		const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
							.split(',').map((v, i) => ({
								icon: require(`../assets/img/${v}.png`), 
								text: v
							}));
		const gridHeader = this.state.text ?  
								(
									<div>
										<span>已选择头像</span>
										<img width="20"  src={this.state.icon} alt=""/>
									</div>
								) : '请选择头像';
		return (
			<div>
				<List renderHeader={() => gridHeader}>
					<Grid 
						data={avatarList} 
						columnNum={5}
						onClick={(elm: any) => {
							this.setState(elm);
							this.props.selectAvatar(elm.text);
						}}
					/>
				</List>
				
			</div>
		);
	}
}