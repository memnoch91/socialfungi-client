import React, { Component } from 'react';
import { Link } from 'react-router-dom';


//MUI stuff
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

export class Navbar extends Component {
    render() {
        return (
            //default position fixed
            <AppBar>
                <ToolBar className="nav-contianer">
                    <Button color="inherit" component={Link} to="/login">Login</Button>
                    <Button color="inherit" component={Link} to="/">Home</Button>
                    <Button color="inherit" component={Link} to="/signup">Signup</Button>
                </ToolBar>
            </AppBar>
        )
    }
}

export default Navbar
