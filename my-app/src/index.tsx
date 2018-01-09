import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import  { createStore } from 'redux';
import reducer from './redux/store/index';
import action from './redux/store/action/action';
const store = createStore(reducer);

const stateAdd: {} = () => {
    store.dispatch(action.ADD_GUN());
};
const stateDrease: {} = () => {
    store.dispatch(action.DECREASE_GUN());
}

const render = () => {
  ReactDOM.render(
    <App stateAdd={stateAdd} 
         stateDrease={stateDrease}
         store={store.getState()}/>,
    document.getElementById('root') as HTMLElement
  );
};
render();

store.subscribe(render);

registerServiceWorker();
