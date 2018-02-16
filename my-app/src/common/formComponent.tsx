import * as React from 'react';
export function HOCfrom(Comp: any) {
	return class extends React.Component {
		public state: {
			userName: string;
			passwrod: string;
			cPasswrod?: string;
			option?: object[];
			currentIdentity?: string;
			title: string;
			company: string;
			salary: string;
			requirement: string;
			avatar?: string;
		};
		constructor(props: any) {
			super(props);
			this.state = {
				userName: '',
				passwrod: '',
				cPasswrod: '',
				title: '',
				company: '',
				salary: '',
				requirement: '',
				avatar: '',
				option: [
					{
						type: 'genius',
						title: '牛人',
					},
					{
						type: 'boss',
						title: 'BOSS'
					}
				],
				currentIdentity: 'genius',
			};
		}
		handleChange = (key: string, val: string) => {
			this.setState({
				[key]: val
			});
		}
		identityToggle = (identity: any) => {
			this.setState({
				currentIdentity: identity
			});
		}	
		render() {
			return (<Comp identityToggle={this.identityToggle} handleChange={this.handleChange} state={this.state} {...this.props}/>);
		}
	};
}