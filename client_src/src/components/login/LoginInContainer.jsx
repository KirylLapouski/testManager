import React from 'react'
import LoginIn from './LoginIn'
import Cookies from 'universal-cookie'
import toastr from 'toastr'
import { withRouter } from 'react-router-dom'
import LoadingIndicator from '../decorators/LoadingIndicator'
import PropTypes from 'prop-types'
import { loginUser } from '../../redux/AC/users'
import { connect } from 'react-redux'
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
    validate = () => {
        //email validation
        let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,5})$/
        let address = this.state.mail
        if (reg.test(address) == false) {
            toastr.error('Неправильный формат электронной почты', 'Ошибка входа')
            return false
        }
        return true
    }
    //TODO: rewrite on reducers
    onSubmitHandler = (e) => {
        e.preventDefault()

        if (!this.validate())
            return

        //TODO: need to refactor
        this.props.loginUser(this.state.mail, this.state.password)
            .then(userInfo => {
                this.props.toggleLoading()
                toastr.success(`Добро пожаловать, ${userInfo.username || 'User'}!`)
                const cookies = new Cookies()

                cookies.set('loopbackToken', userInfo.loopbackToken, { maxAge: (Date.parse(userInfo.loopbackTokenExpireIn) - Date.now()) / 1000 })
                this.props.history.push(`/cources/${userInfo.id}`)
            }, (error) => {
                if (error.response.status === 401) {
                    this.props.toggleLoading()
                    toastr.error('Неправильный логин или пароль', 'Ошибка входа')
                }
            })

        // xhr.ontimeout = () => {
        //     this.props.toggleLoading()
        //     toastr.error('Время запроса истекло: сервер не отвечает', 'Ошибка входа')
        // }

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
