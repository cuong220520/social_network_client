import React, { Component } from 'react'
import MyButton from '../../util/MyButton'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'

// icons stuff
import FavoriteBorder from "@material-ui/icons/FavoriteBorder"
import Favorite from "@material-ui/icons/Favorite"

// redux stuff 
import { connect } from "react-redux"
import { likeScream, unlikeScream } from "../../redux/actions/dataActions"

const styles = {
    likeIconColor: {
        color: "#f50057"
    }
}

export class LikeButton extends Component {
    likedScream = () => {
        if (
            this.props.user.likes &&
            this.props.user.likes.find(
                like => like.screamId === this.props.screamId
            )
        ) {
            return true
        } else {
            return false
        }
    }

    likeScream = () => {
        this.props.likeScream(this.props.screamId)
    }

    unlikeScream = () => {
        this.props.unlikeScream(this.props.screamId)
    }

    render() {
        const { authenticated } = this.props.user
        const { classes } = this.props
        
        const likeButton = !authenticated ? (
            <Link to="/login">
                <MyButton tip="like">
                    <FavoriteBorder  className={classes.likeIconColor} />
                </MyButton>
            </Link>
        ) : this.likedScream() ? (
            <MyButton tip="Undo like" onClick={this.unlikeScream}>
                <Favorite  className={classes.likeIconColor}/>
            </MyButton>
        ) : (
            <MyButton tip="Like" onClick={this.likeScream}>
                <FavoriteBorder  className={classes.likeIconColor}/>
            </MyButton>
        )

        return likeButton
    }
}

LikeButton.propTypes = {
    user: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired,
    likeScream: PropTypes.func.isRequired,
    unlikeScream: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    user: state.user,
    classes: PropTypes.object.isRequired
})

const mapActionsToProps = {
    likeScream,
    unlikeScream
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(LikeButton))