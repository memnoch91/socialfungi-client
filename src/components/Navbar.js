import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types'

//custo components
import CustomButton from './util/CustomButton';
import PostSpore from './PostSpore';
import NotificationIcon from './NotificationIcon';


//Redux
import { connect } from 'react-redux'

//MUI stuff
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import HomeIcon from '@material-ui/icons/Home';

export class Navbar extends Component {
    static propTypes = {
        authenticated: propTypes.bool,
    }

    render() {

        const { authenticated } = this.props

        const navType = authenticated ?
            (
                <Fragment>
                   <PostSpore />
                    <Link to='/'>
                        <CustomButton toolTipTitle='Home'>
                            <HomeIcon color='secondary' />
                        </CustomButton>
                    </Link>
                    <NotificationIcon />
                </Fragment>
            )
            :
            (
                <Fragment>
                    <Button color="inherit" component={Link} to="/login">Login</Button>
                    <Button color="inherit" component={Link} to="/">Home</Button>
                    <Button color="inherit" component={Link} to="/signup">Signup</Button>
                </Fragment>
            )

        return (
            //default position fixed
            <AppBar>
                <ToolBar className="nav-contianer">
                    {navType}
                </ToolBar>
            </AppBar>
        )
    }
}

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(Navbar);
