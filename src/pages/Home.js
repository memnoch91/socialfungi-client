import React, { Component } from 'react';
import axios from 'axios';

import Grid from '@material-ui/core/Grid/Grid'
import Spore from '../components/Spore';

export class Home extends Component {

    state = {
        spores: null
    }

    componentDidMount() {
        axios.get('/spores')
            .then(res => {
                console.log("15 Home",res);
                this.setState({
                    spores: res.data
                })
            })
            .catch(err=> console.error(err))
    }

    render() {
        const sopresMarkup = this.state.spores ? this.state.spores.map( spore =>  <Spore key={spore.sporeId} spore={spore} />) :  (<p>loading...</p>)
            
        return (
            <Grid container spacing={10}>
                <Grid item sm={8} xs={12}>
                   {sopresMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <p>Profile</p>
                </Grid>
            </Grid>
        )
    }
}

export default Home
