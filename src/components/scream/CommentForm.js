import React, { Component } from "react"
import PropTypes from "prop-types"

// mui stuff
import withStyles from "@material-ui/core/styles/withStyles"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"

// redux stuff
import { connect } from "react-redux"
import { submitComment } from "../../redux/actions/dataActions"

const styles = (theme) => ({
    ...theme.spreadThis,
})

class CommentForm extends Component {
    state = {
        body: "",
        errors: {}
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.ui.errors) {
            this.setState({ errors: nextProps.ui.errors })
        }
        if (!nextProps.ui.errors && !nextProps.ui.loading) {
            this.setState({ body: '', errors: {} })
        }
    }

    // static getDerivedStateFromProps(props) {
    //     if (props.ui.errors) {
    //         return {
    //             errors: props.ui.errors
    //         }
    //     }
        
    //     if (!props.ui.errors && !props.ui.loading) {
    //         return {
    //             state: {
    //                 body: '', 
    //                 errors: {}
    //             }
    //         }
    //     }
    // }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value }) 
    }

    handleSubmit = event => {
        event.preventDefault()
        this.props.submitComment(this.props.screamId, { body: this.state.body })
    }

    render() {
        const { classes, authenticated } = this.props
        const errors = this.state.errors

        const commentFormMarkup = authenticated ? (
            <Grid item sm={12} style={{ textAlign: "center" }}>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        name="body"
                        type="text"
                        label="Comment on scream"
                        error={errors.comment ? true : false}
                        helperText={errors.comment}
                        value={this.state.body}
                        onChange={this.handleChange}
                        className={classes.textField}
                        fullWidth
                    />

                    <Button type="submit" variant="contained" color="primary" className={classes.button}>
                        Submit
                    </Button>

                    <hr className={classes.visibleSeparator} />
                </form>
            </Grid>
        ) : null

        return commentFormMarkup
    }
}

CommentForm.propTypes = {
    submitComment: PropTypes.func.isRequired,
    ui: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired,
    authenticated: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
    ui: state.ui,
    authenticated: state.user.authenticated,
})

export default connect(mapStateToProps, { submitComment })(
    withStyles(styles)(CommentForm)
)
