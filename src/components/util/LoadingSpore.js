import React from 'react';
import propTypes from 'prop-types';
import NoImg from '../../assets/no-img.png';
import loadingSporeStyles from '../../styles/loadingSpore';

import withStyles from '@material-ui/core/styles/withStyles';
// MUI
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';


const LoadingSpore = ({ classes }) => {

    const content = Array.from({ length: 5 }).map((item, index) => (
        <Card className={classes.card} key={index}>
            <CardMedia className={classes.cover} image={NoImg} />
            <CardContent className={classes.cardContent}>
                <div className={classes.handle} />
                <div className={classes.date} />
                <div className={classes.fullLine} />
                <div className={classes.fullLine} />
                <div className={classes.halfLine} />
            </CardContent>
        </Card>
    ));

    return content
}

LoadingSpore.propTypes = {
    classes: propTypes.object.isRequired
}

export default withStyles(loadingSporeStyles)(LoadingSpore)
