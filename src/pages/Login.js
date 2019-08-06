import React, { Component } from 'react';
import propTypes from 'prop-types';

//assests
import icon from '../images/fungi.png';

//MUI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

//MUI custom styles function
import withStyles from '@material-ui/core/styles/withStyles';


const styles = {
    form: {
        textAlign: 'center'
    },
    iconImage: {
        width: 80,
        height: 80,
        margin: "20px auto"
    },
    pageTitle: {

    }
}

export class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            loadin: false,
            errors: {}
        }
    }
    handleSubmit = (event) => {
        console.log('handleSubmit');

    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    render() {

        const { classes } = this.props;
        return (
            <Grid container className={classes.form}>
                <Grid item sm></Grid>
                <Grid item sm>
                    <img className={classes.iconImage} src={icon} alt="fungi icon" />
                    <Typography variant="h3" className={classes.pageTitle}>
                        Login
                    </Typography>
                    <form noValidtie onSubmit={this.handleSubmit}>
                        <TextField
                            id="email"
                            name="email"
                            type="email"
                            label="Email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            fullWidth
                        >


                        </TextField>
                    </form>
                </Grid>
                <Grid item sm></Grid>
            </Grid>
        )
    }
}

Login.propTypes = {
    classes: propTypes.object.isRequired,
}

export default withStyles(styles)(Login);
