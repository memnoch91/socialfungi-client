import React, { Component, Fragment } from 'react';
import propTypes from 'prop-types';

//custom components
import CustomButton from './util/CustomButton'

//REDUX
import { connect } from 'react-redux';
import { postSpore, clearErrors } from '../redux/actions/dataActions';

//MUI Components
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

import customStyles from '../styles/theme'




export class PostSpore extends Component {
    static propTypes = {
        postSpore: propTypes.func.isRequired
    }

    state = {
        isOpen: false,
        body: '',
        errors: {}
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.ui.errors) {
            this.setState({
                errors: nextProps.ui.errors
            })
        }
        if (!nextProps.ui.errors && !nextProps.ui.loading) {
            this.setState({ body: '', isOpen: false, errors: {} });
        }
    }

    handleOpen = () => {
        this.setState({ isOpen: true });
    }

    handleClose = () => {
        this.props.clearErrors();
        this.setState({ isOpen: false });
    }
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.postSpore({ body: this.state.body });
    }

    render() {
        const { errors } = this.state;
        const { classes } = this.props;
        const { loading } = this.props.ui;
        return (
            <Fragment>
                <CustomButton toolTipTitle='Post a spore' clickFunction={this.handleOpen}>
                    <AddIcon color='secondary' />
                </CustomButton>
                <Dialog
                    open={this.state.isOpen}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth='sm'
                >
                    <CustomButton
                        toolTipTitle='Close'
                        clickFunction={this.handleClose}
                        btnClass={classes.closeButton}
                    >
                        <CloseIcon />
                    </CustomButton>
                    <DialogTitle>
                        Post a new Spore!
                    </DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <TextField
                                name='body'
                                type='text'
                                label='Spore'
                                value={this.state.body}
                                placeholder='set the seed for a new spore to grow'
                                onChange={this.handleChange}
                                error={errors.body ? true : false}
                                helperText={errors.body}
                                className={classes.textField}
                                fullWidth
                            />
                            <Button
                                type='submit'
                                variant='contained'
                                color='primary'
                                className={classes.submitButton}
                                disabled={loading}
                            >
                                {loading ? (<CircularProgress size={30} className={classes.progressSpinner} />) : 'Submit'}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment>

        )
    }
}

const mapStateToProps = (state) => ({
    ui: state.ui
})



export default connect(mapStateToProps, { postSpore, clearErrors })(withStyles(customStyles)(PostSpore));
