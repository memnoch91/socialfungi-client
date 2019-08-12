import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

//Custom Components
import CustomButton from './util/CustomButton'

//REDUX
import { connect } from 'react-redux';
import { likeSpore, unlikeSpore } from '../redux/actions/dataActions'

//MUI icons;
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

export class LikeButton extends Component {
    static propTypes = {
        user: propTypes.object.isRequired,
        sporeId: propTypes.string.isRequired,
        likeSpore: propTypes.func.isRequired,
        unlikeSpore: propTypes.func.isRequired
    }

    isSporeLiked = () => {
        const { likes } = this.props.user;
        if (likes && likes.find(like => like.sporeId === this.props.sporeId)) return true;
        else return false;
    }
    likeSpore = () => {
        this.props.likeSpore(this.props.sporeId);
    }

    unlikeSpore = () => {
        this.props.unlikeSpore(this.props.sporeId);
    }

    render() {
        const { authenticated } = this.props.user;
        const likeButton = !authenticated ? (
            <Link to='/login'>
                <CustomButton toolTipTitle='like'>
                    <FavoriteBorder color="primary" />
                </CustomButton>
            </Link>
        ) :
            this.isSporeLiked() ?
                (
                    <CustomButton toolTipTitle='unlike spore' clickFunction={this.unlikeSpore}>
                        <FavoriteIcon  color="primary" />
                    </CustomButton>
                ) :
                (
                    <CustomButton toolTipTitle='Like Spore' clickFunction={this.likeSpore}>
                        <FavoriteBorder color="primary" />
                    </CustomButton>
                );

        return likeButton;
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapDispatchToProps = {
    likeSpore,
    unlikeSpore
}

export default connect(mapStateToProps, mapDispatchToProps)(LikeButton)
