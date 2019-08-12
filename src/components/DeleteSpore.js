import React, { Component, Fragment } from 'react'
import propTypes from 'prop-types'

//Redux
import { connect } from 'react-redux'
import { deleteSpore } from '../redux/actions/dataActions'

// MUI Stuff
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

//Custom Components
import CustomButton from './util/CustomButton'

const styles = {
    deleteButton: {
        position: 'absolute',
        top: '10%',
        left: '90%'
    }
}

export class DeleteSpore extends Component {
    static propTypes = {
        sporeId: propTypes.string,
        classes: propTypes.object.isRequired
    }

    state = {
        isOpen: false
    }

    handleOpen = () => {
        this.setState({ isOpen: true })
    }
    handleClose = () => {
        this.setState({ isOpen: false })
    }

    handleDeleteSpore = () => {
        this.props.deleteSpore(this.props.sporeId);
        this.handleClose()
    }

    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <CustomButton
                    toolTipTitle='delete spore'
                    clickFunction={this.handleOpen}
                    btnClass={classes.deleteButton}
                >
                    <DeleteOutline color='secondary' />
                </CustomButton>
                <Dialog
                    open={this.state.isOpen}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth='sm'
                >
                    <DialogTitle>
                        Are you sure you want to delete this spore?
                    </DialogTitle>
                    <DialogActions>
                        <Button
                            onClick={this.handleClose}
                            color='primary'
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={this.handleDeleteSpore}
                            color='secondary'
                        >
                            Delete
                        </Button>
                    </DialogActions>

                </Dialog>
            </Fragment>
        )
    }
}




export default connect(null, { deleteSpore })(withStyles(styles)(DeleteSpore))  
