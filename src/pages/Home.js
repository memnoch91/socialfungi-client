import React, { Component } from 'react';

//Redux
import { connect } from 'react-redux';
import { getSpores } from '../redux/actions/dataActions'

import Grid from '@material-ui/core/Grid/Grid'

//Local Components
import Spore from '../components/Spore';
import Profile from '../components/Profile';
import LoadingSpore from '../components/util/LoadingSpore'

export class Home extends Component {
    componentDidMount() {
        this.props.getSpores()
    }

    render() {
        const { spores, loading } = this.props.data
        const sopresMarkup = !loading ? spores.map(spore => <Spore key={spore.sporeId} spore={spore} />) : (<LoadingSpore />)
            
        return (
            <Grid container spacing={10}>
                <Grid item sm={8} xs={12}>
                   {sopresMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile />
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = state => ({
    data: state.data
});



export default connect(mapStateToProps, {  getSpores } )(Home);
