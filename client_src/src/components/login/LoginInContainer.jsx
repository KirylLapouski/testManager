import React from 'react'
import LoginIn from './LoginIn'
import toastr from 'toastr'
import { withRouter } from 'react-router-dom'
import LoadingIndicator from '../decorators/LoadingIndicator'
import PropTypes from 'prop-types'
import { loginUser } from '../../redux/AC/users'
import { connect } from 'react-redux'
import { validateEmail } from "../../utils/validation";
import { login } from "../../utils/authentication";
toastr.options.closeButton = true
class LoginInContainer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            mail: '',
            password: ''
        }
    }

    onChangeHandler = (e) => {
        let { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    //TODO: rewrite on reducers
    onSubmitHandler = (e) => {
        e.preventDefault()

        if (!validateEmail(this.state.mail)) {
            toastr.error('Неправильный формат электронной почты', 'Ошибка входа')
            return
        }
        login(this.state.mail, this.state.password)
            .then(userInfo => {
                this.props.toggleLoading()
                toastr.success(`Добро пожаловать, ${userInfo.username || 'User'}!`)
                this.props.history.push(`/cources/${userInfo.id}`)
            },
                error => {
                    this.props.toggleLoading()
                    toastr.error('Неправильный логин или пароль', 'Ошибка входа')
                })
        this.props.toggleLoading()
    }

    render() {
        return <LoginIn
            onSubmitHandler={this.onSubmitHandler}
            onChangeHandler={this.onChangeHandler}
            {...this.state}
            {...this.props} />
    }
}
//TODO: show in propTypes props by withRoutes?

LoginInContainer.propTypes = {
    loading: PropTypes.bool,
    toggleLoading: PropTypes.func,
    // redux
    loginUser: PropTypes.func
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginUser(email, password) {
            return dispatch(loginUser(email, password))
        }
    }
}
export default withRouter(LoadingIndicator(connect(null, mapDispatchToProps)(LoginInContainer)))
