import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getUserById } from '../../redux/AC/users'
import { withRouter } from 'react-router-dom'
import Cookies from 'universal-cookie'
import UserInfo from "./UserInfo";
import UserInfoExtended from './UserInfoExtended'
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
        return this.props.extended ? <UserInfoExtended handleMenuClick={this.handleMenuClick} handleMenuClose={this.handleMenuClose} goToUrl={this.goToUrl} logOut={this.logOut} {...this.props} {...this.state} />
            : <UserInfo handleMenuClick={this.handleMenuClick} handleMenuClose={this.handleMenuClose} goToUrl={this.goToUrl} logOut={this.logOut} {...this.props} {...this.state} />
    }
}

const mapStateToProps = (state, ownProps) => {
    var imageSrc
    if (ownProps.userId) {
        imageSrc = state.users[ownProps.userId] && state.users[ownProps.userId].imageUrl
    }
    return {
        imageSrc
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
