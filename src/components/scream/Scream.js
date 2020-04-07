import React, { Component } from "react"
import withStyles from "@material-ui/core/styles/withStyles"
import { Link } from "react-router-dom"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import PropTypes from "prop-types"
import MyButton from "../../util/MyButton"
import DeleteScream from './DeleteScream'
import ScreamDialog from './ScreamDialog'
import LikeButton from "./LikeButton"

// mui stuff
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Typography from "@material-ui/core/Typography"

// icons stuff
import ChatIcon from "@material-ui/icons/Chat"

// redux stuff
import { connect } from "react-redux"

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
                            to={`/user/${userHandle}`}
                            color="primary"
                        >
                            {userHandle}
                        </Typography>
                        {deleteButton}
                        <Typography variant="body2" color="textSecondary">
                            {dayjs(createAt).fromNow()}
                        </Typography>
                        <Typography variant="body1">{body}</Typography>

                        <LikeButton screamId={screamId} />
                        <span>{likeCount} likes</span>

                        <MyButton tip="comments">
                            <ChatIcon color="primary" />
                        </MyButton>

                        <span>{commentCount} comments</span>

                        <ScreamDialog screamId={screamId} userHandle={userHandle} />
                    </CardContent>
                </Card>
            </div>
        )
    }
}

Scream.propTypes = {
    user: PropTypes.object.isRequired,
    scream: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(
    mapStateToProps
)(withStyles(styles)(Scream))