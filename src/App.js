import React from 'react';
import jwtDecode from 'jwt-decode'
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

/*** REDUX here***/
import { Provider } from 'react-redux';
import store from './redux/store'

//components
import AuthRoute from './components/AuthRoute'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Navbar from './components/Navbar'

//MUI &Styles
import './App.css';
import theme from './styles/theme'

//mui stuff
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'


const sfTheme = createMuiTheme(theme);

const token = localStorage.FBIdToken;


let authenticated = '';

// axios.defaults.baseURL = 'https://us-central1-socialfungi.cloudfunctions.net/api'


if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = '/login';
    authenticated = false;
  } else {
    authenticated = true;
  }
}

function App() {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={sfTheme}>
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home}></Route>
              <AuthRoute path="/signup" component={Signup} authenticated={authenticated} />
              <AuthRoute path="/login" component={Login} authenticated={authenticated} />
            </Switch>
          </div>
        </Router>

      </MuiThemeProvider>
    </Provider>
  );
}

export default App;
