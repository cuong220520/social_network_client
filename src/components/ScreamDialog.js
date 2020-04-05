import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import MyButton from "../util/MyButton"
import dayjs from "dayjs"
import { Link } from "react-router-dom"

// mui stuff
import withStyles from "@material-ui/core/styles/withStyles"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import CircularProgress from "@material-ui/core/CircularProgress"
import { TextField } from "@material-ui/core"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"

// icons stuff
import CloseIcon from "@material-ui/icons/Close"
import UnfoldMore from "@material-ui/icons/UnfoldMore"

// redux stuff
import { connect } from "react-redux"
import { getScream } from "../redux/actions/dataActions"

const styles = theme => ({
    ...theme.spreadThis,
    invisibleSeparator: {
        border: 'none',
        margin: 4
    },
    profileImage: {
        maxWidth: 200,
        height: 200,
        borderRadius: '50%',
        objectFit: 'cover'
    },
    content: {
        padding: 20
    },
    closeButton: {
        position: 'absolute',
        left: '90%'
    },
    expandButton: {
        position: 'absolute',
        left: '90%',
        bottom: '15%'
    },
    spinnerDiv: {
        textAlign: 'center',
        margin: '50px auto 50px'
    }
})

class ScreamDiaLog extends Component {
    state = {
        open: false
    }

    handleOpen = () => {
        this.setState({ open: true })
        this.props.getScream(this.props.screamId)
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    render() {
        const {
            classes,
            scream: {
                screamId,
                body,
                createAt,
                likeCount,
                commentCount,
                userImage,
                userHandle
            },
            ui: { loading }
        } = this.props

        const dialogMarkup = loading ? (
            <div className={classes.spinnerDiv}>
                <CircularProgress size={200} thickness={2} />
            </div>
        ) : (
            <Grid container spacing={10}>
                <Grid item sm={5}>
                    <img src={userImage} alt="Profile" className={classes.profileImage} />
                </Grid>

                <Grid item sm={7}>
                    <Typography component={Link} color="primary" variant="h5" to={`/user/${userHandle}`}>
                        @{userHandle}
                    </Typography>
                    <hr className={classes.invisibleSeparator} />
                    <Typography variant="body2" color="textSecondary">
                        {dayjs(createAt).format('h:mm a, MMM DD YYYY')}
                    </Typography>
                    <hr className={classes.invisibleSeparator} />
                    <Typography variant="body1">
                        {body}
                    </Typography>
                </Grid>
            </Grid>
        )

        return (
            <Fragment>
                <MyButton
                    onClick={this.handleOpen}
                    tip="Expand scream"
                    btnClassName={classes.expandButton}
                >
                    <UnfoldMore color="primary" />
                </MyButton>

                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm"
                >
                    <MyButton
                        tip="Close"
                        onClick={this.handleClose}
                        btnClassName={classes.closeButton}
                    >
                        <CloseIcon />
                    </MyButton>

                    <DialogContent className={classes.content}>
                        {dialogMarkup}
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

ScreamDiaLog.propTypes = {
    getScream: PropTypes.func.isRequired,
    screamId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    scream: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    scream: state.data.scream,
    ui: state.ui
})

export default connect(mapStateToProps, { getScream })(
    withStyles(styles)(ScreamDiaLog)
)
