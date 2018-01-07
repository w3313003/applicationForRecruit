import * as React from 'react';
import { Button } from 'antd-mobile';
import './App.css';
import  { createStore } from 'redux'
import reducer from './redux/store/index'
import action from './redux/store/action/action'
export const store = createStore(reducer);



class App extends React.Component {
  constructor(props: {}) {
    super(props);
  }
  private stateAdd = () => {
    store.dispatch(action.ADD_GUN());
  }
  render() {
    return (
      <div className="App">
        <h1>现在有机枪{ store.getState() }把</h1>
        <Button onClick={ this.stateAdd } type="primary" size='small'>添加武器</Button>
      </div>
    );
  }
}

export default App;
