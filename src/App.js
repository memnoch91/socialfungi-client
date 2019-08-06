import React from 'react';
import jwtDecode from 'jwt-decode'
import './App.css';

//mui stuff
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

//components
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthRoute from './components/AuthRoute'

import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Navbar from './components/Navbar'

//MUI
import theme from './styles/theme'

const sfTheme = createMuiTheme(theme);

const token = localStorage.FBToken;


let authenticated = '';

if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = 'login';
    authenticated = false;
  } else {
    authenticated = true;
  }
}

function App() {
  return (
    <MuiThemeProvider theme={sfTheme}>
      <Router>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <AuthRoute path="/signup" component={Signup} authenticated={authenticated}/>
            <AuthRoute path="/login" component={Login} authenticated={authenticated} />
          </Switch>
        </div>
      </Router>

    </MuiThemeProvider>
  );
}

export default App;
