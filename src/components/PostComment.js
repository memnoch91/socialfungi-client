import React, { Component } from 'react';
import propTypes from 'prop-types';

//REDUX
import { connect } from 'react-redux';
import { postComment } from '../redux/actions/dataActions'

// MUI Stuff
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const styles = (theme) => ({
    ...theme.spreadThis,
})

export class PostComment extends Component {
    static propTypes = {
        postComment: propTypes.func.isRequired,
        ui: propTypes.object.isRequired,
        classes: propTypes.object.isRequired,
        authenticated: propTypes.bool.isRequired,
        sporeId: propTypes.string.isRequired
    }

    state = {
        body: '',
        errors: {}
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.ui.errors) {
            this.setState({ errors: nextProps.ui.errors })
        }
        if (!nextProps.ui.errors && !nextProps.ui.loading) {
            this.setState({ body: '' })
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.postComment(this.props.sporeId, { body: this.state.body });
    }

    render() {
        const { classes, authenticatd } = this.props;
        const { errors } = this.state;

        const commentSporeMarkup = authenticatd ?
            (<Grid item sm={12} style={{ textAlign: 'center' }}>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        name='body'
                        type='text'
                        label='Comment Spore'
                        error={errors.comment ? true : false}
                        helperText={errors.comment}
                        value={this.state.body}
                        onChange={this.handleChange}
                        fullWidth
                        className={classes.textField}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.button}
                    >
                        Submit
                    </Button>
                </form>
                <hr className={classes.horizontalSeparator} />
            </Grid>)
            :
            null;

        return commentSporeMarkup
    }
}

const mapStateToProps = (state) => ({
    ui: state.ui,
    authenticated: state.user.authenticated
})



export default connect(mapStateToProps, { postComment })(withStyles(styles)(PostComment))
