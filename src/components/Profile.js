import React, { Component, Fragment } from "react"
import Proptypes from "prop-types"
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import EditDetails from '../components/EditDetails'

// mui stuff
import withStyles from "@material-ui/core/styles/withStyles"
import Button from "@material-ui/core/Button"
import MuiLink from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import { IconButton } from "@material-ui/core"
import Tooltip from '@material-ui/core/Tooltip'

// icons
import LocationOn from '@material-ui/icons/LocationOn'
import LinkIcon from '@material-ui/icons/Link'
import CalendarToday from '@material-ui/icons/CalendarToday'
import EditIcon from '@material-ui/icons/Edit'
import KeyboardReturn from '@material-ui/icons/KeyboardReturn'

// redux stuff
import { connect } from "react-redux"
import { logoutUser, uploadImage } from '../redux/actions/userActions'

const styles = (theme) => ({ ...theme.userProfile })

class Profile extends Component {
    handleImageChange = (event) => {
        const image = event.target.files[0]

        // send to server
        const formData = new FormData()
        formData.append('image', image, image.name)
        this.props.uploadImage(formData)
    }

    handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput')
        fileInput.click()
    }

    handleLogout = () => {
        this.props.logoutUser()
    }

    render() {
        const {
            classes,
            user: {
                credentials: {
                    handle,
                    createAt,
                    imageUrl,
                    bio,
                    website,
                    location
                },
                loading,
                authenticated
            }
        } = this.props

        let profileMarkup = !loading ? (authenticated ? (
            <Paper className={ classes.paper }>
                <div className={ classes.profile }>
                    <div className="image-wrapper">
                        <img src={ imageUrl } alt="profile" className="profile-image"/>
                        <input type="file" id="imageInput" hidden="hidden" onChange={ this.handleImageChange }/>
                        <Tooltip title="Edit profile image" placement="top">
                            <IconButton onClick={ this.handleEditPicture } className="buttons">
                                <EditIcon color="primary"/>
                            </IconButton>
                        </Tooltip>
                    </div>
                    <hr/>
                    <div className="profile-details">
                        <MuiLink component={ Link } to={`/users/${handle}`} color="primary" variant="h5">
                            @{ handle }
                        </MuiLink>
                        <hr/>
                        { bio && <Typography variant="body2">{ bio }</Typography> }
                        <hr/>
                        { location && (
                            <Fragment>
                                <LocationOn color="primary"/> <span>{ location }</span>
                                <hr/>
                            </Fragment>
                        ) }
                        { website && (
                            <Fragment>
                                <LinkIcon color="primary"/>
                                <a href={ website } target="_blank" rel="noopener noreferer">
                                    { '  ' }{ website }
                                </a>
                                <hr/>
                            </Fragment>
                        ) }
                        <CalendarToday color="primary"/>{ '  ' }
                        <span>Joined { dayjs(createAt).format('MMM YYYY') }</span>
                    </div>
                    <Tooltip title="Logout" placement="top">
                        <IconButton onClick={ this.handleLogout }>
                            <KeyboardReturn color="primary"/>
                        </IconButton>
                    </Tooltip>
                    <EditDetails/>
                </div>
            </Paper>
        ) : (
            <Paper className={ classes.paper }>
                <Typography variant="body2" align="center">
                    <br/>
                    No profile found, please login again!
                </Typography>
                <div className={ classes.buttons }>
                    <Button variant="contained" color="primary" component={ Link } to="/login">
                        Login
                    </Button>
                    <Button variant="contained" color="secondary" component={ Link } to="/signup">
                        Signup
                    </Button>
                </div>
            </Paper>
        )) : (<p>loading...</p>)

        return profileMarkup
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToProps = {
    logoutUser,
    uploadImage
}

Profile.propTypes = {
    user: Proptypes.object.isRequired,
    classes: Proptypes.object.isRequired,
    logoutUser: Proptypes.func.isRequired,
    uploadImage: Proptypes.func.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile))
