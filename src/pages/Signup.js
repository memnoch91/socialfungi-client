import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

//assests
import icon from '../images/fungi.png';
import loginAndSignupStyles from '../styles/loginAndSignupStyleObject';

//MUI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
//MUI custom styles function
import withStyles from '@material-ui/core/styles/withStyles';

//REDUX
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions'

const styles = loginAndSignupStyles;

export class Signup extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            handle: '',
            errors: {
                email: "",
                password: "",
                confirmPassword: "",
                handle: "",
                general: ""
            }
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.ui.errors) {
            this.setState({ errors: nextProps.ui.errors })
        }
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        }
        this.props.signupUser(newUserData, this.props.history);
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    render() {

        const { classes } = this.props;
        const { ui: { loading } } = this.props;
        const { errors } = this.state;
        return (
            <Grid container className={classes.form}>
                <Grid item sm>
                </Grid>
                <Grid item sm>
                    <div className={classes.logo}>
                        <Typography className={classes.logoLeft} variant="h5">
                            Social
                        </Typography>
                        <img className={classes.iconImage} src={icon} alt="fungi icon" />
                        <Typography className={classes.logoRight} variant="h5">
                            Fungi
                        </Typography>
                    </div>
                    <Typography variant="h3" className={classes.pageTitle}>
                        Signup
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField
                            id="email"
                            name="email"
                            type="email"
                            label="Email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            helperText={errors.email}
                            error={errors.email ? true : false}
                            fullWidth
                        />
                        <TextField
                            id="password"
                            name="password"
                            type="password"
                            label="Password"
                            value={this.state.password}
                            helperText={errors.password}
                            error={errors.password ? true : false}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            label="ConfirmPassword"
                            value={this.state.confirmPassword}
                            helperText={errors.confirmPassword}
                            error={errors.confirmPassword ? true : false}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            id="handle"
                            name="handle"
                            type="text"
                            label="User name"
                            value={this.state.handle}
                            helperText={errors.handle}
                            error={errors.handle ? true : false}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}

                        {loading ?
                            (
                                <div className={classes.loadingContainer}>
                                    <CircularProgress size={30} className={classes.circularProgress} />
                                </div>
                            )
                            :
                            (<Button
                                onClick={this.handleSubmit}
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                disabled={loading}
                            >
                                Signup
                        </Button>
                            )}
                        <br />
                        <small className={classes.smallPrint}>
                            already have an account? login <Link to="/login">here</Link>
                        </small>
                    </form>
                </Grid>
                <Grid item sm>
                </Grid>
            </Grid>
        )
    }
}

Signup.propTypes = {
    signupUser: propTypes.func.isRequired,
    logoutUser: propTypes.func,
    classes: propTypes.object.isRequired,
    user: propTypes.object.isRequired,
    ui: propTypes.object.isRequired,
}


const mapStateToProps = (state) => ({
    user: state.user,
    ui: state.ui
})

const mapActionsToProps = {
    signupUser,
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(Signup));