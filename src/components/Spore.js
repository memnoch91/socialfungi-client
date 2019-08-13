import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

//other libs
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

//custom components;
import LikeButton from './LikeButton';
import DeleteSpore from './DeleteSpore';
import SporeDialog from './SporeDialog';
import CustomButton from './util/CustomButton';

//MUI stuff
import withStyle from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
//MUI icons
import ChatIcon from '@material-ui/icons/Chat'


const styles = {
    card: {
        position: 'relative',
        display: 'flex',
        marginBottom: 20
    },
    image: {
        minWidth: 200,
        objectFit: "cover",
    },
    content: {
        padding: 25
    }
}

function Spore(props) {

    dayjs.extend(relativeTime);
    const { classes } = props;
    const {
        spore: {
            body,
            createdAt,
            userImage,
            userHandle,
            sporeId,
            likeCount,
            commentCount
        },
        user: {
            authenticated,
            credentials:
            {
                handle
            }
        }
    } = props;

    const deleteSpore = (authenticated && userHandle === handle) ? (<DeleteSpore sporeId={sporeId} />) :  null

    return (
        <Card className={classes.card}>
            <CardMedia
                className={classes.image}
                image={userImage}
                title="Profile image"
            />
            <CardContent className={classes.content}>
                <Typography
                    variant="h5"
                    color="secondary"
                    component={Link}
                    to={`/users/${userHandle}`}
                >{userHandle}</Typography>
                {deleteSpore}
                <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                <Typography variant="body1" color="textPrimary">{body}</Typography>
                <LikeButton sporeId={sporeId}></LikeButton>
                <span>{likeCount} Likes</span>
                <CustomButton toolTipTitle='comments'>
                    <ChatIcon color='primary' />
                </CustomButton>
                <span>{commentCount}</span>
                <SporeDialog
                    sporeId={sporeId}
                    userHandle={userHandle}
                />
            </CardContent>
        </Card>
    )
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps)(withStyle(styles)(Spore))
