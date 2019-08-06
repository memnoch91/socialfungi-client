import React from 'react';
import './App.css';

//mui stuff

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

//components
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Navbar from './components/Navbar'

const sfTheme = createMuiTheme({
  palette: {
    primary: {
      light: "#7f7b82",
      main: "#d8ccc0",
      dark: "#444554",
      contrastText: "#172121",
    },
    secondary: {
      light: "#f1fffa",
      main: "#96e6b3",
      dark: "#568259",
      contrastText: "#464e47",
    }
  },
  typography: {
    useNextVariants: true
  }
})

function App() {
  return (
    <MuiThemeProvider theme={sfTheme}>
      <Router>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route path="/signup" component={Signup}></Route>
            <Route path="/login" component={Login}></Route>
          </Switch>
        </div>
      </Router>

    </MuiThemeProvider>
  );
}

export default App;
