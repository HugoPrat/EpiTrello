import React from "react";
import { BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import AppBar from "./store/Components"

import Home from './Routes/Home';
import Login from './Routes/Login';
import SignUp from './Routes/Sign-up'
import Board from './Routes/Board'
import Labo from './Routes/Labo'

const WrapperAppBar = withRouter(AppBar);

class App extends React.Component {

  render()  {
    return  (
      <Router>
        <div className="App">
          <WrapperAppBar/>
          <div className="auth-wrapper">
              <Switch>
                <Route exact path='/' component={Login} />
                <Route path="/sign-in" component={Login} />
                <Route path="/sign-up" component={SignUp} />
                <Route path="/home" component={Home} />
                <Route path="/board" component={Board} />
                <Route path="/e" component={Labo} />
                <Route component={Login}/>
              </Switch>
          </div>
        </div></Router>
    );
  }
} 
export default App;