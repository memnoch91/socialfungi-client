import React, { Component, Fragment } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
// MUI Interface
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
// Icons
import NotificationsIcon from '@material-ui/icons/Notifications';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';

//Redux
import { connect } from 'react-redux';
import { markNotificationsAsRead } from '../redux/actions/userActions'

export class NotificationIcon extends Component {
    static propTypes = {
        notifications: propTypes.array.isRequired,
        markNotificationsAsRead: propTypes.func.isRequired
    }
    state = {
        anchorEl: null
    }
    handleOpen = (event) => {
        this.setState({ anchorEl: event.target });
    };
    handleClose = () => {
        this.setState({ anchorEl: null });
    };
    onMenuOpened = () => {
        const unReadNotificationsIds = this.props.notifications
            .filter(notification => !notification.read)
            .map(unReadNotification => unReadNotification.notificationId)
        this.props.markNotificationsAsRead(unReadNotificationsIds)
    }
    render() {
        const { notifications } = this.props;
        const { anchorEl } = this.state;

        dayjs.extend(relativeTime);

        //display components!
        let notificationsIcon;
        let notificationsMarkup;
        //display components!

        if (notifications && notifications.length > 0) {
            const unReadNotifications = notifications.filter(notification => notification.read === false);

            if (unReadNotifications.length > 0) {
                notificationsIcon = (
                    <Badge badgeContent={unReadNotifications.length} color='error'>
                        <NotificationsIcon />
                    </Badge>
                )
            }
            else {
                notificationsIcon = <NotificationsIcon />
            }
        }
        else {
            notificationsIcon = <NotificationsIcon />
        }

        if (notifications && notifications.length > 0) {
            notificationsMarkup = notifications.map(notification => {
                const verb = notification.type === 'like' ? 'liked' : 'commented on';
                const time = dayjs(notification.createdAt).fromNow();
                const iconColor = notification.read ? 'primary' : 'secondary';
                const icon = notification.type === 'like' ?
                    (
                        <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
                    )
                    :
                    (
                        <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
                    )
                return (
                    <MenuItem
                        key={notification.createdAt}
                        style={{ marginRight: 10 }}
                    >
                        {icon}
                        <Typography
                            component={Link}
                            color='secondary'
                            variant='body1'
                            to={`/users/${notification.recipient}/spore/${notification.sporeId}`}
                        >
                            {notification.sender} {verb} your spore {time}
                        </Typography>
                    </MenuItem>
                )
            })
        }
        return (
            <Fragment>
                <Tooltip placement='bottom' title='Notificaions' >
                    <IconButton
                        aria-owns={anchorEl ? 'simple-menu' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleOpen}
                    >
                        {notificationsIcon}
                    </IconButton>
                </Tooltip>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                    onEntered={this.onMenuOpened}
                >
                    {notificationsMarkup}
                </Menu>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    notifications: state.user.notifications
})

export default connect(mapStateToProps, { markNotificationsAsRead })(NotificationIcon)