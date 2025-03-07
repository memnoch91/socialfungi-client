import React, { Component, Fragment } from 'react'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

//custom components
import CustomButton from './util/CustomButton';
import LikeButton from './LikeButton';
import Comments from './Comments';
import PostComment from './PostComment';

//Redux
import { connect } from 'react-redux';
import { getSpore, clearErrors } from '../redux/actions/dataActions';

//MUI Components
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';
import CloseIcon from '@material-ui/icons/Close';

//custom styles
import customTheme from '../styles/theme';


export class SporeDialog extends Component {
    static propTypes = {
        sporeId: propTypes.string.isRequired,
        userHandle: propTypes.string.isRequired,
        getSpore: propTypes.func.isRequired,
        clearErrors: propTypes.func.isRequired,
        ui: propTypes.object.isRequired,
        spore: propTypes.object.isRequired,
        openDialog: propTypes.bool
    }

    state = {
        isOpen: false,
        oldPath: '',
        newPath: ''
    }

    componentDidMount() {
        if(this.props.openDialog) {
            this.handleOpen();
            console.log('am ajuns aici')
        }
    }

    handleOpen = () => {
        let oldPath = window.location.pathname;

        const { userHandle, sporeId } = this.props;
        const newPath = `/users/${userHandle}/spore/${sporeId}`;

        window.history.pushState(null, null, newPath);

        //edge case whne the spore path is pasted in the browsers:
        if(oldPath === newPath) { oldPath = `/users/${userHandle}`};

        this.setState({ isOpen: true, oldPath, newPath });
        this.props.getSpore(this.props.sporeId);
    }

    handleClose = () => {
        window.history.pushState(null, null, this.state.oldPath);
        this.setState({ isOpen: false })
    }

    render() {
        const { classes } = this.props;

        const { loading } = this.props.ui;
        const { body,
            createdAt,
            userImage,
            userHandle,
            sporeId,
            likeCount,
            commentCount,
        } = this.props.spore

        let { comments } = this.props.spore || [];

        const sporeDeatailsMarkup = loading ?
            (
                <div className={classes.spinnerDiv}>
                    <CircularProgress size={200} thickness={2} color='primary' />
                </div>
            )
            :
            (
                <Grid container spacing={4} >
                    <Grid item sm={5} >
                        <img src={userImage} alt='user avatar' className={classes.profileImage} />
                    </Grid>
                    <Grid item sm={7} >
                        <Typography
                            component={Link}
                            color='secondary'
                            variant='h5'
                            to={`/users/${userHandle}`}
                        >
                            @{userHandle}
                        </Typography>
                        <hr className={classes.invSeparator} />
                        <Typography variant='body2' color='textSecondary'>
                            {dayjs(createdAt).format('h:mm a, DD MMMM YYYY')}
                        </Typography>
                        <hr className={classes.invSeparator} />
                        <Typography variant='body1'>
                            {body}
                        </Typography>
                        <LikeButton sporeId={sporeId} />
                        <span>{likeCount} likes</span>
                        <CustomButton toolTipTitle='comments'>
                            <ChatIcon color='primary' />
                        </CustomButton>
                        <span>{commentCount}</span>
                    </Grid>
                    <hr className={classes.graySeparator} />
                    <PostComment sporeId={sporeId} />
                    <Comments comments={comments} />
                </Grid>

            );


        return (
            <Fragment>
                <CustomButton
                    toolTipTitle='spore details'
                    btnClass={classes.expandButton}
                    clickFunction={this.handleOpen}
                >
                    <UnfoldMore color='primary' />
                </CustomButton>
                <Dialog
                    open={this.state.isOpen}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth='sm'
                >
                    <CustomButton
                        btnClass={classes.closeButton}
                        toolTipTitle='close'
                        clickFunction={this.handleClose}
                    >
                        <CloseIcon />
                    </CustomButton>
                    <DialogContent className={classes.dialogContent}>
                        {sporeDeatailsMarkup}
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    spore: state.data.spore,
    ui: state.ui
})

const mapActionsToProps = {
    getSpore, clearErrors
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(customTheme)(SporeDialog))
