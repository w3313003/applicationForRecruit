import * as React from 'react';
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import Auth from './common/auth';

// import { connect } from 'react-redux';
// import action from './redux/store/action/action';
// import { ADD_GUN, DECREASE_GUN, Async } from './redux/store/action/actionType';
import './App.css';
// import { ADD_GUN, DECREASE_GUN, Async } from './redux/store/action/actionType'
// import axios from 'axios';
// const mapStateToProps = (state: any) => {
//   return {
//     num: state.AppReducer.num
//   };
// };
// const mapDispatchToProps = (dispatch: any) => {
//   return {
//     [ADD_GUN]: () => dispatch(action.ADD_GUN()),
//     [DECREASE_GUN]: () => dispatch(action.DECREASE_GUN()),
//     [Async]: (payload: any) => {
//       axios.get('/ddd').then(res => {
//         dispatch(action.Async(res.data));
//       });
//     }
//   };
// };

// let connects: any = connect;
// @connects(mapStateToProps, mapDispatchToProps);
class App extends React.Component {
  render() {
    return (
        <Router>
          <div>
            <Auth/>
            <Route exact={true} path="/" render={() => <Redirect to="/login"/>} />
            <Route path="/login" exact={true} component={Login}/>
            <Route path="/register" component={Register}/>
          </div>
        </Router>
    );
  }
}

export default App;