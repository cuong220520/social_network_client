import React, { Component, Fragment } from "react"
import { Link } from "react-router-dom"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import PropTypes from "prop-types"

// mui stuff
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import IconButton from "@material-ui/core/IconButton"
import Tooltip from "@material-ui/core/Tooltip"
import Typography from "@material-ui/core/Typography"
import Badge from "@material-ui/core/Badge"

// icons stuff
import Notification from "@material-ui/icons/Notifications"
import Favorite from "@material-ui/icons/Favorite"
import Chat from "@material-ui/icons/Chat"

// redux stuff
import { connect } from "react-redux"
import { markNotificationsRead } from "../../redux/actions/userActions"

class Notifications extends Component {
    state = {
        anchorEl: null,
    }

    handleOpen = (event) => {
        this.setState({ anchorEl: event.target })
    }

    handleClose = () => {
        this.setState({ anchorEl: null })
    }

    onMenuOpened = () => {
        let unreadNotificationIds = this.props.notifications
            .filter((notification) => !notification.read)
            .map((notification) => notification.notificationId)

        this.props.markNotificationsRead(unreadNotificationIds)
    }

    render() {
        const notifications = this.props.notifications
        const anchorEl = this.state.anchorEl

        dayjs.extend(relativeTime)

        let notificationIcon

        if (notifications && notifications.length > 0) {
            notifications.filter((notification) => notification.read === false)
                .length > 0
                ? (notificationIcon = (
                      <Badge
                          badgeContent={
                              notifications.filter(
                                  (notification) => notification.read === false
                              ).length
                          }
                          color="secondary"
                      >
                          <Notification />
                      </Badge>
                  ))
                : (notificationIcon = <Notification />)
        } else {
            notificationIcon = <Notification />
        }

        let notificationsMarkup =
            notifications && notifications.length > 0 ? (
                notifications.map((notification) => {
                    const verb =
                        notification.type === "like" ? "liked" : "commented on"
                    const time = dayjs(notification.createAt).fromNow()
                    const iconColor = notification.read
                        ? "secondary"
                        : "primary"
                    const icon =
                        notification.type === "like" ? (
                            <Favorite
                                color={iconColor}
                                style={{ marginRight: 10 }}
                            />
                        ) : (
                            <Chat
                                color={iconColor}
                                style={{ marginRight: 10 }}
                            />
                        )

                    return (
                        <MenuItem
                            key={notification.createAt}
                            onClick={this.handleClose}
                        >
                            {icon}
                            <Typography
                                component={Link}
                                color="default"
                                variant="body1"
                                to={`/user/${notification.recipient}/scream/${notification.screamId}`}
                            >
                                {notification.sender} {verb} your scream {time}
                            </Typography>
                        </MenuItem>
                    )
                })
            ) : (
                <MenuItem onClick={this.handleClose}>
                    You have no notification yet
                </MenuItem>
            )

        return (
            <Fragment>
                <Tooltip placement="top" title="Notifications">
                    <IconButton
                        aria-owns={anchorEl ? "simple-menu" : undefined}
                        aria-haspopup="true"
                        onClick={this.handleOpen}
                    >
                        {notificationIcon}
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

Notifications.propTypes = {
    markNotificationsRead: PropTypes.func.isRequired,
    notifications: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    notifications: state.user.notifications,
})

export default connect(mapStateToProps, { markNotificationsRead })(
    Notifications
)
