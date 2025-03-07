import React from 'react'

import { Route, Redirect } from 'react-router-dom'
import {connect} from 'react-redux';

import propTypes from 'prop-types'

const AuthRoute = ({ component: Component, authenticated, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                authenticated === true ? <Redirect to="/" /> : <Component {...props} />
            }
        />
    )
}

AuthRoute.propTypes = {
    user: propTypes.object
}

const mapStateToProps = (state) =>( {
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(AuthRoute);