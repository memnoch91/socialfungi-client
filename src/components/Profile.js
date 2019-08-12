import React, { Component, Fragment } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'

//Custom components
import EditDetails from './EditDetails';

//MUI
import withStyles from '@material-ui/core/styles/withStyles';
import profileStyleObject from '../styles/profileStyleObject';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

//MUI Icons
import LocationOn from '@material-ui/icons/LocationOn';
import CalendarToday from '@material-ui/icons/CalendarToday';
import LinkIcon from '@material-ui/icons/Link';
import Edit from '@material-ui/icons/Edit';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn'

//Redux
import { connect } from 'react-redux';
import { logoutUser, uploadImage } from '../redux/actions/userActions';

const styles = profileStyleObject;

class Profile extends Component {
    constructor(props) {
        super(props)
        this.imageUploadRef = React.createRef();
    }

    handleImageUpload = (event) => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image', image, image.name);
        this.props.uploadImage(formData);

    }

    handleEditPicture = () => {
        this.imageUploadRef.current.click();
    }

    handleLogout = () => {
        this.props.logoutUser()
    }

    render() {
        const user = this.props.user.credentials;
        const { handle, createdAt, imageUrl, bio, website, location } = user;
        const { loading, authenticated } = this.props.user
        const { classes } = this.props;

        let authProfileComponent = () => (
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className='image-wrapper'>
                        <img src={imageUrl} alt='profile' className='profile-image' />
                        <input
                            type='file'
                            id='imageInput'
                            onChange={this.handleImageUpload}
                            hidden='hidden'
                            ref={this.imageUploadRef}
                        />
                        <Tooltip title='Edit profile picture' placement='bottom'>
                            <IconButton onClick={this.handleEditPicture} className='button'>
                                <Edit color='primary' />
                            </IconButton>
                        </Tooltip>
                    </div>
                    <hr />
                    <div className='profile-details'>
                        <MuiLink
                            component={Link}
                            to={`/users/${handle}`}
                            color='primary'
                            variant='h6'
                        >
                            @{handle}
                        </MuiLink>
                        <hr />
                        {bio &&
                            <Typography variant='body2'>
                                {bio}
                            </Typography>
                        }
                        <hr />
                        {location && (
                            <Fragment>
                                <LocationOn color='primary' /> <span>{location}</span>
                                <hr />
                            </Fragment>
                        )}
                        {website && (
                            <Fragment>
                                <LinkIcon color='primary' />
                                <a href={website} target='_blank' rel='noopener noreferrer'>
                                    {' '}{website}
                                </a>
                                <hr />
                            </Fragment>
                        )}
                        <CalendarToday color='primary' /> {' '}
                        <span>Joined {dayjs(createdAt).format('MMM YYY')}</span>
                    </div>
                    <hr />
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Tooltip title='Logout' placement='bottom' >
                            <IconButton onClick={this.handleLogout}>
                                <KeyboardReturn fontSize='small' color='secondary' />
                            </IconButton>
                        </Tooltip>
                        <EditDetails />
                    </div>
                </div>
            </Paper>
        )

        let noProfileFound = () => (
            <Paper className={classes.paper}>
                <Typography variant='body2' align='center'>
                    No profile found, please log in or sign up and try again.
                </Typography>
                <div className={classes.buttons}>
                    <Button variant='contained' color='primary' component={Link} to='/login'>
                        Login
                        </Button>
                    <Button variant='contained' color='secondary' component={Link} to='/signup'>
                        Signup
                        </Button>
                </div>
            </Paper>
        )

        let profileMarkup = !loading ? (authenticated ? (authProfileComponent()) : (noProfileFound())) : (<p>...loading</p>);

        return (
            <Fragment>
                {profileMarkup}
            </Fragment>
        )
    }
}

Profile.propTypes = {
    user: propTypes.object.isRequired,
    classes: propTypes.object.isRequired,
    logoutUser: propTypes.func,
    uploadImage: propTypes.func
}

const mapStateToProps = (state) => ({
    user: state.user
});


const mapActionsToProps = {
    logoutUser,
    uploadImage
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile))
