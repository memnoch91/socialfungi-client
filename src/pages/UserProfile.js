import React, { Component } from 'react';
import axios from 'axios';

//redux
import { connect } from 'react-redux';
import { getUserProfileDetails } from '../redux/actions/dataActions';

//custom components
import StaticProfileDisplay from '../components/StaticProfileDisplay';
import Spore from '../components/Spore'

//MUI
import Grid from '@material-ui/core/Grid';


export class UserProfile extends Component {

    state = {
        profile: {},
    }

    componentDidMount() {
        const handle = this.props.match.params.handle;

        this.props.getUserProfileDetails(handle);
        axios
            .get(`/user/${handle}`)
            .then(res => {
                this.setState({
                    profile: res.data.user,
                });
            })
            .catch(err => console.error(err))
    }


    render() {
        const { spores } = this.props.data;
        const { loading } = this.props.data;
        const sporesMarkup = loading ?
            (
                <p>...loading data</p>
            ) :
            spores ?
                (
                    spores.map(spore => <Spore key={spore.sporeId} spore={spore} />)
                )
                :
                (
                    <p>This user has not spread his spores yet</p>
                )
        return (
            <Grid container spacing={10}>
                <Grid item sm={8} xs={12}>
                    {sporesMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    {this.state.profile === null ? (
                        <p>loading...</p>
                    ) : (
                            <StaticProfileDisplay profile={this.state.profile} />
                        )}
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    data: state.data
})


export default connect(mapStateToProps, { getUserProfileDetails })(UserProfile)
