import * as React from 'react';
import { WingBlank, WhiteSpace, Card } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
interface PropsCheck {
	userList: object[];
}
@(withRouter as any)
export default class UserCarf extends React.Component<PropsInspect.RouterProps & PropsCheck> {
	toChat = (id: string | number) => {
		this.props.history.push(`/chat/${id}`);
	} 
  	render() {
	return (
		<WingBlank>
			<WhiteSpace />
			{this.props.userList.map((v: any, i: number) => {
				if (!v.avatar) {
					this.props.history.push(`/${v.path}Info`);
					return;
				}
				return (
					<div key={i} onClick={() => this.toChat(v._id)}>
						<Card>
							<Card.Header
								title={v.userName}
								thumb={require(`../assets/img/${v.avatar}.png`)}
								extra={<span>{v.title}</span>}
							/>
                			<Card.Body>
								{v.type === 'boss' ? <div>公司：{v.company}</div> : null}
								{v.requirement.split('\n').map((w: string, index: number) => {
									return <div key={index}>{index === 0 && <span>牛人简介:</span>}{w}</div>;
								})}
								{v.type === 'boss' ? (<div>待遇：{v.salary}</div>) : null}
                			</Card.Body>
              			</Card>
              			<WhiteSpace />
            		</div>
          		);
        	})}
      	</WingBlank>
    	);
  	}
}
