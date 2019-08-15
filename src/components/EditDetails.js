import React, { Component, Fragment } from 'react'
import propTypes from 'prop-types'

//custom components
import CustomButton from './util/CustomButton'

//Redux
import { connect } from 'react-redux'
import { editUserDetails } from '../redux/actions/userActions'

//MUI
import withStyles from '@material-ui/core/styles/withStyles';
import theme from '../styles/theme'
//MUI Components
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

// Icons
import EditIcon from '@material-ui/icons/Edit';


const styles = {...theme};

export class EditDetails extends Component {
    static propTypes = {
        editUserDetails: propTypes.func.isRequired,
    }

    state = {
        bio: '',
        website: '',
        location: '',
        open: false
    }

    componentDidMount() {
        const { bio, website, location } = this.props.credentials;

        this.setState({
            bio: bio ? bio : '',
            website: website ? website : '',
            location: location ? location : ''
        })
    }

    mapUserDetailsToState = (credentials) => {
        const { bio, website, location } = credentials;

        this.setState({
            bio: bio ? bio : '',
            website: website ? website : '',
            location: location ? location : ''
        })
    }

    handleOpen = () => {
        this.setState({ open: true })
        this.mapUserDetailsToState(this.props.credentials);
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = () => {
        const { bio, website, location } = this.state

        const userDetails = {
            bio: bio,
            website: website,
            location: location,
        }
        this.props.editUserDetails(userDetails)
        this.handleClose();
    }

    render() {
        return (
            <Fragment>
                <CustomButton toolTipTitle={'Edit User details'} clickFunction={this.handleOpen}>
                    <EditIcon fontSize='small' color='secondary' />
                </CustomButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth='sm'
                >
                    <DialogTitle> Edit your details</DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField
                                name='bio'
                                type='text'
                                label='Biography'
                                rows='3'
                                placeholder='A short desciption of yourslef'
                                fullWidth
                                value={this.state.bio}
                                onChange={this.handleChange}
                            />
                            <TextField
                                name='website'
                                type='text'
                                label='Website'
                                rows='3'
                                placeholder='Personal\Profesional website'
                                fullWidth
                                value={this.state.website}
                                onChange={this.handleChange}
                            />
                            <TextField
                                name='location'
                                type='text'
                                label='Location'
                                rows='3'
                                placeholder='Rezidence'
                                fullWidth
                                value={this.state.location}
                                onChange={this.handleChange}
                            />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button onClick={this.handleSubmit}>
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    credentials: state.user.credentials
})



export default connect(mapStateToProps, { editUserDetails })(withStyles(styles)(EditDetails))
