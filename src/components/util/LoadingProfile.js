import React from 'react';
import propTypes from 'prop-types';
import NoImg from '../../assets/no-img.png';
import loadingProfileStyles from '../../styles/loadingProfile';

// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';

// Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';


const LoadingProfile = ({ classes }) => {

    console.log(classes);
    

    return (
        <Paper>
            <div className={classes.profile} >
                <div className="image-wrapper" >
                    <img src={NoImg} alt="profile" className="profile-image" style={{ marginTop: 25 }}/>
                </div>
                <hr />
                <div className="profile-details">
                    <div className={classes.handle} />
                    <hr />
                    <div className={classes.fullLine} />
                    <div className={classes.fullLine} />
                    <hr />
                    <LocationOn color="primary" /> <span>Location</span>
                    <hr />
                    <LinkIcon color="primary" /> https://website.com
                     <hr />
                    <CalendarToday color="primary" /> Joined date
                </div>
            </div>
        </Paper>
    )
}

LoadingProfile.propTypes = {
    classes: propTypes.object.isRequired
}

export default withStyles(loadingProfileStyles)(LoadingProfile)