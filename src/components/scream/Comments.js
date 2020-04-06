import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import dayjs from "dayjs"

// mui stuff
import { withStyles } from "@material-ui/core"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"

const styles = (theme) => ({
    ...theme.separator,
    commentImage: {
        maxWidth: 100,
        height: 100,
        objectFit: 'cover',
        borderRadius: '50%',
        marginLeft: 40
    },
    commentData: {
        marginLeft: 20
    }
})

class Comments extends Component {
    render() {
        const { classes, comments } = this.props
        console.log(comments)

        return (
            <Grid container>
                {comments.map((comment, index) => {
                    const { body, createAt, userImage, userHandle } = comment

                    return (
                        <Fragment key={createAt}>
                            <Grid item sm={12}>
                                <Grid container>
                                    <Grid item sm={3}>
                                        <img
                                            src={userImage}
                                            alt="Comment"
                                            className={classes.commentImage}
                                        />
                                    </Grid>
                                    <Grid item sm={9}>
                                        <div className={classes.commentData}>
                                            <Typography
                                                variant="h5"
                                                component={Link}
                                                to={`/user/${userHandle}`}
                                                color="primary"
                                            >
                                                @{userHandle}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="textSecondary"
                                            >
                                                {dayjs(createAt).format(
                                                    "h:mm a, MMM DD YYYY"
                                                )}
                                            </Typography>
                                            <hr
                                                className={classes.invisibleSeparator}
                                            />
                                            <Typography variant="body1">
                                                {body}
                                            </Typography>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {index !== comments.length - 1 && (
                                <hr className={classes.visibleSeparator} />
                            )}
                        </Fragment>
                    )
                })}
                }
            </Grid>
        )
    }
}

Comments.propTypes = {
    comments: PropTypes.array.isRequired
}

export default withStyles(styles)(Comments)
