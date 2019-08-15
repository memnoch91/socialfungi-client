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
        sporeIdParam: ''
    }

    componentDidMount() {
        const handle = this.props.match.params.handle;
        const sporeId = this.props.match.params.sporeId;
        if (sporeId) {
            this.setState({ sporeIdParam: sporeId })
        };

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
        const { sporeIdParam } = this.state;
        const sporesMarkup = loading ?
            (
                <p>...loading data</p>
            ) :
            spores ?

                !sporeIdParam ?
                    (
                        spores.map(spore => <Spore key={spore.sporeId} spore={spore} />)
                    )
                    :
                    (
                        spores.map(spore => {
                            if (spore.sporeId !== sporeIdParam) {
                                return <Spore key={spore.sporeId} spore={spore} />;
                            }
                            else {
                                return <Spore key={spore.sporeId} spore={spore} openDialog />;
                            }
                        })
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
