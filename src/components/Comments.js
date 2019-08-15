import React, { Component, Fragment } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import theme from '../styles/theme'


// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = {
    ...theme,
    commentImage: {
        maxWidth: '100%',
        height: 100,
        objectFit: 'cover',
        borderRadius: '50%'
    },
    commentData: {
        marginLeft: 20
    }
}

class Comments extends Component {

    
    render() {
        const { comments, classes } = this.props;
        let tempComments = comments || [];
        return (
            <Grid container >
                {tempComments.map((comment, index) => {
                    const { body, createdAt, userImage, userHandle } = comment;
                    return (
                        <Fragment key={createdAt}>
                            <Grid item sm={12}>
                                <Grid container>
                                    <Grid item sm={2}>
                                        <img
                                            src={userImage}
                                            alt='comment user avatar'
                                            className={classes.commentImage}
                                        />
                                    </Grid>
                                    <Grid item sm={9}>
                                        <div className={classes.commentData}>
                                            <Typography
                                                variant='h6'
                                                component={Link}
                                                to={`/users/${userHandle}`}
                                                color='secondary'
                                            >
                                                @{userHandle}
                                            </Typography>
                                            <Typography variant='body2' color='textSecondary'>
                                                {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                                            </Typography>
                                            <hr className={classes.invSeparator} />
                                            <Typography variabnt="body1">{body}</Typography>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {index !== comments.length - 1 && (
                                <hr className={classes.graySeparator} />
                            )}
                        </Fragment>
                    )
                })}
            </Grid>
        )
    }

}

Comments.propTypes = {
    comments: propTypes.array.isRequired
}

export default withStyles(styles)(Comments)
