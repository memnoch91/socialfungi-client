import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types'

import CustomButton from './CustomButton';

//Redux
import { connect } from 'react-redux'

//MUI stuff
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

//Icons
import AddIcon from '@material-ui/icons/Add'
import HomeIcon from '@material-ui/icons/Home'
import NotificationsIcon from '@material-ui/icons/Notifications'

export class Navbar extends Component {
    static propTypes = {
        prop: propTypes,
        authenticated: propTypes.bool,
    }

    render() {

        const { authenticated } = this.props

        const navType = authenticated ?
            (
                <Fragment>
                    <CustomButton toolTipTitle='Post a spore!'>
                        <AddIcon color='secondary' />
                    </CustomButton>
                    <Link to='/'>
                        <CustomButton toolTipTitle='Home'>
                            <HomeIcon color='secondary' />
                        </CustomButton>
                    </Link>
                    <CustomButton toolTipTitle='Notifications'>
                        <NotificationsIcon color='secondary' />
                    </CustomButton>
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
