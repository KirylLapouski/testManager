import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getUserById } from '../../redux/AC/users'
import { withRouter } from 'react-router-dom'
import Cookies from 'universal-cookie'
import UserInfo from "./UserInfo";
import UserInfoExtendedContainer from './UserInfoExtendedContainer'
import { loadLessons } from '../../redux/AC/lessons'
class UserInfoContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            menu: false
        }
    }

    componentDidMount() {
        if (this.props.userId)
            this.props.getUser(this.props.userId)
    }

    handleMenuClick = event => {
        this.setState({ menu: event.currentTarget });
    };
    handleMenuClose = () => {
        this.setState({ menu: null })
    }


    goToUrl = (url) => () => {
        this.props.history.push(url)
    }
    logOut = () => {
        var cookies = new Cookies()
        cookies.remove('loopbackToken', { path: '/' })
        cookies.remove('yandexToken', { path: '/' })

        window.localStorage.setItem('redux', '')

        this.props.history.push(`/`)
    }
    render() {

        return <React.Fragment>
            {this.props.extended ? <UserInfoExtendedContainer
                handleMenuClick={this.handleMenuClick}
                handleMenuClose={this.handleMenuClose}
                goToUrl={this.goToUrl}
                logOut={this.logOut}
                imageSrc={this.props.imageSrc}
                {...this.props}
                {...this.state} />
                : <UserInfo handleMenuClick={this.handleMenuClick}
                    handleMenuClose={this.handleMenuClose}
                    goToUrl={this.goToUrl}
                    logOut={this.logOut}
                    imageSrc={this.props.imageSrc}
                    {...this.props}
                    {...this.state} />}
        </React.Fragment>
    }
}

const mapStateToProps = (state, ownProps) => {
    var imageSrc
    if (ownProps.userId) {
        imageSrc = state.users[ownProps.userId] && state.users[ownProps.userId].imageUrl
    }

    return {
        imageSrc: imageSrc || 'https://globalblueproject.org/wp-content/uploads/2016/07/blank-profile-picture.png'
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUser(userId) {
            dispatch(getUserById(userId))
        }
    }
}

UserInfoContainer.propTypes = {
    disabled: PropTypes.bool,
    style: PropTypes.object,
    userId: PropTypes.number,
    extended: PropTypes.bool,
    user: PropTypes.object,
    //redux
    imageSrc: PropTypes.string,
    getUser: PropTypes.func
}

UserInfo.defaultProps = {
    extended: false,
    disabled: false,
    style: {}
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserInfoContainer))
