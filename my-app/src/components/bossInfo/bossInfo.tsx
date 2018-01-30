import * as React from 'react';
import { NavBar, InputItem, TextareaItem, Button, Toast  } from 'antd-mobile'; 
import { connect } from 'react-redux';
import AvatarSelector from '../../common/avatar';
import action from '../../redux/store/action/action';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
const mapDispatchToProps = (dispatch: any) => {
	return {
		update: (data: any) => dispatch(action.AUTH_SUCCESS(data))
	};
};
interface Redux {
	update: Function;
}
type Check = PropsInspect.RouterProps & PropsInspect.AuthProps & Redux;
@(connect as any)(
	(state: any) => state.signReducer,
	mapDispatchToProps
)
export default class BossInfo extends React.Component<Check> {
	public state: {
		title: string;
		company: string;
		salary: string;
		requirement: string;
		avatar?: string;
	};
	constructor(props: Check) {
		super(props);
		this.state = {
			title: '',
			company: '',
			salary: '',
			requirement: '',
			avatar: '',
		};
	}
	onChange = (key: string, v: string) => {
		this.setState({
			...this.state,
			[key]: v
		});
	}
	selectAvatar = (picName: string): any => {
		console.log(picName);
		this.setState({
			avatar: picName
		});
	}
	update = () => {
		if (!this.state.title || !this.state.company || !this.state.salary || !this.state.requirement || !this.state.avatar) {
			Toast.fail('请完善信息后重试');
			return;
		}
		axios.post('/users/update', this.state).then(res => {
			if (res.status === 200 && res.data.code === 0) {
				this.props.update(res.data.data);
			} else {
				Toast.fail('服务器出现故障');
			}
		});
	}
	render() {
		return (
			<div>
				{this.props.redirectTo && this.props.redirectTo !== this.props.location.pathname ? <Redirect to={this.props.redirectTo} /> : null}
				<NavBar>完善BOSS信息</NavBar>
				<AvatarSelector selectAvatar={this.selectAvatar} />
				<InputItem
					onChange={(v: any) => this.onChange('title', v)}
				>
					招聘职位
				</InputItem>
				<InputItem
					onChange={(v: any) => this.onChange('company', v)}
				>
					公司名称
				</InputItem>
				<InputItem
					onChange={(v: any) => this.onChange('salary', v)}
				>
					岗位薪资
				</InputItem>
				<TextareaItem
					rows={3}
					title={'职位要求'}
					autoHeight={true}
					onChange={(v: any) => this.onChange('requirement', v)}
				/>
				<Button 
					type="primary"
					onClick={() => this.update()}
				>
				保存
				</Button>
			</div>
		);
	}
}