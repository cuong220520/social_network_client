import React, { Component } from "react"
import withStyles from "@material-ui/core/styles/withStyles"
import { Link } from "react-router-dom"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import PropTypes from "prop-types"
import MyButton from "../util/MyButton"
import DeleteScream from './DeleteScream'

// mui stuff
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Typography from "@material-ui/core/Typography"

// icons stuff
import ChatIcon from "@material-ui/icons/Chat"
import FavoriteBorder from "@material-ui/icons/FavoriteBorder"
import Favorite from "@material-ui/icons/Favorite"

// redux stuff
import { connect } from "react-redux"
import { likeScream, unlikeScream } from "../redux/actions/dataActions"

const styles = {
    card: {
        position: 'relative',
        display: "flex",
        marginBottom: 20
    },
    image: {
        minWidth: 200
    },
    content: {
        padding: 25,
        objectFit: "cover"
    }
}

class Scream extends Component {
    likedScream = () => {
        if (
            this.props.user.likes &&
            this.props.user.likes.find(
                like => like.screamId === this.props.scream.screamId
            )
        ) {
            return true
        } else {
            return false
        }
    }

    likeScream = () => {
        this.props.likeScream(this.props.scream.screamId)
    }

    unlikeScream = () => {
        this.props.unlikeScream(this.props.scream.screamId)
    }

    render() {
        dayjs.extend(relativeTime)
        const {
            classes,
            scream: {
                body,
                createAt,
                userImage,
                userHandle,
                screamId,
                likeCount,
                commentCount
            },
            user: { authenticated, credentials: { handle } }
        } = this.props

        const likeButton = !authenticated ? (
            <Link to="/login">
                <MyButton tip="like">
                    <FavoriteBorder color="primary" />
                </MyButton>
            </Link>
        ) : this.likedScream() ? (
            <MyButton tip="Undo like" onClick={this.unlikeScream}>
                <Favorite color="primary" />
            </MyButton>
        ) : (
            <MyButton tip="Like" onClick={this.likeScream}>
                <FavoriteBorder color="primary" />
            </MyButton>
        )

        const deleteButton = authenticated && userHandle === handle ? (
            <DeleteScream screamId={screamId}/>
        ) : null
        return (
            <div>
                <Card className={classes.card}>
                    <CardMedia
                        image={userImage}
                        title="Profile Image"
                        className={classes.image}
                    />
                    <CardContent className={classes.content}>
                        <Typography
                            variant="h5"
                            component={Link}
                            to={`/users/${userHandle}`}
                            color="primary"
                        >
                            {userHandle}
                        </Typography>
                        {deleteButton}
                        <Typography variant="body2" color="textSecondary">
                            {dayjs(createAt).fromNow()}
                        </Typography>
                        <Typography variant="body1">{body}</Typography>

                        {likeButton}
                        <span>{likeCount} likes</span>

                        <MyButton tip="comments">
                            <ChatIcon color="primary" />
                        </MyButton>

                        <span>{commentCount} comments</span>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

Scream.propTypes = {
    likeScream: PropTypes.func.isRequired,
    unlikeScream: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    scream: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

const mapActionsToProps = {
    likeScream,
    unlikeScream
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(Scream))
