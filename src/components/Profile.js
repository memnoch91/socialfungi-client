import React, { Component } from 'react';
import propTypes from 'prop-types';

//MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button'
//Redux
import { connect } from 'http2';

const styles = { 

}


class Profile extends Component {
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

Profile.propTypes = { 
    user: propTypes.object.isRequired,
    class: propTypes.object.isRequired
}

const mapStateToProps =  (state) =>  ({
    user: state.user
});


const mapActionsToProps = { 

}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles) (Profile))
