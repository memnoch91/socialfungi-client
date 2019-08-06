import React from 'react';
import { Link } from 'react-router-dom';

//other libs
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

//MUI stuff
import withStyle from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';


const styles = {
    card: {
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
    const { spore: { body, createdAt, userImage, userHandle } } = props;
    //poreId, likeCount, commentCount
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
                <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                <Typography variant="body1" color="textPrimary">{body}</Typography>
            </CardContent>
        </Card>
    )
}

export default withStyle(styles)(Spore)
