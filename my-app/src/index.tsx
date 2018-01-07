import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { store } from './App'

const render = () => {
  console.log(store.getState());
  ReactDOM.render(
    <App />,
    document.getElementById('root') as HTMLElement
  );
};
render();

store.subscribe(render)

registerServiceWorker();
