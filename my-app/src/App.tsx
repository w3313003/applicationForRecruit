import * as React from 'react';
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import Auth from './common/auth';
import BossInfo from '../src/components/bossInfo/bossInfo';
import GeniusInfo from '../src/components/geniusInfo';
import DashBorad from './common/dashBorad';
import Chat from './components/Chat';
import './App.css';
class App extends React.Component {
  render() {
    return (
        <Router>
          <div>
            <Auth/>
            <Switch>
              <Route exact={true} path="/" render={() => <Redirect to="/login"/>} />
              <Route path="/login" exact={true} component={Login}/>
              <Route path="/register" component={Register}/>
              <Route path="/bossInfo" component={BossInfo}/>
              <Route path="/geniusInfo" component={GeniusInfo}/>
              <Route path="/chat/:userid" component={Chat}/>
              {/* 没有路径匹配到渲染的 */}
              <Route component={DashBorad}/>
            </Switch>
          </div>
        </Router>
    );
  }
}

export default App;