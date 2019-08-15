import React from 'react';
import jwtDecode from 'jwt-decode'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';

/*** REDUX here***/
import { Provider } from 'react-redux';
import store from './redux/store'
import { SET_AUTHENTICATED } from './redux/types'
import { logoutUser, getUserData } from './redux/actions/userActions'


//components
import AuthRoute from './components/util/AuthRoute'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import UserProfile from './pages/UserProfile'
import Navbar from './components/Navbar'

//MUI &Styles
import './App.css';
import theme from './styles/theme'

//mui stuff
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

const sfTheme = createMuiTheme(theme);

const token = localStorage['FBIdToken'];

if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser())
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData())
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
              <AuthRoute path="/signup" component={Signup} />
              <AuthRoute path="/login" component={Login} />
              <Route exact path="/users/:handle" component={UserProfile}></Route>
              <Route
                exact
                path='/users/:handle/spore/:sporeId'
                component={UserProfile}
              />
            </Switch>
          </div>
        </Router>

      </MuiThemeProvider>
    </Provider>
  );
}

export default App;
