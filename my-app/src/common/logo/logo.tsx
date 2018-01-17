import * as React from 'react';
import * as css from './logo.styl';
const logos = require('../../assets/job.png');

const logo: any = css; 
export default () => {
	return (
		<div>
			<img className={logo.logo} src={logos}/>
		</div>
	);
};