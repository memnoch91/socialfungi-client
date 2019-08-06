import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import axios from 'axios';

//assests
import icon from '../images/fungi.png';
import loginAndSignupStyles from '../styles/loginAndSignup'

//MUI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

//MUI custom styles function
import withStyles from '@material-ui/core/styles/withStyles';

const styles = loginAndSignupStyles;
export class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            loading: false,
            errors: {
                email: "",
                password: "",
                general: ""
            }
        }
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });
        const userData = {
            email: this.state.email,
            password: this.state.password
        }

        axios
            .post('/login', userData)
            .then(res => {
                console.log(res.data);
                localStorage.setItem('FBToken', `Bearer ${res.data.token}`);
                this.setState({
                    loading: false
                });
                this.props.history.push('/');
            })
            .catch(err => {
                this.setState({
                    errors: err.response.data,
                    loading: false
                })
            })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    render() {

        const { classes } = this.props;
        const { loading } = this.state;
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
                        Login
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
                                Login
                        </Button>
                            )}
                        <br />
                        <small className={classes.smallPrint}>
                            don't habe an account? sign up <Link to="/signup">here</Link>
                        </small>
                    </form>
                </Grid>
                <Grid item sm>
                </Grid>
            </Grid>
        )
    }
}

Login.propTypes = {
    classes: propTypes.object.isRequired,
}

export default withStyles(styles)(Login);
