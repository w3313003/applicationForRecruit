import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './redux/store/index';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import './config.ts';
import App from './App';
const ENV = process.env.NODE_ENV !== 'production';
declare global {
	interface Window {
		[property: string]: any;
	}
}
const reduxDevTools = window.devToolsExtension ? window.devToolsExtension : (f: any) => f;
const store = createStore(
	reducer,
	ENV ? compose(applyMiddleware(thunk, logger), reduxDevTools()) : compose(applyMiddleware(thunk, logger))
);
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root') as HTMLElement
);
registerServiceWorker();