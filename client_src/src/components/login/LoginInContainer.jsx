import React from 'react'
import LoginIn from './LoginIn'
import Cookies from 'universal-cookie'
import toastr from 'toastr'
import { withRouter } from 'react-router-dom'
import LoadingIndicator from '../decorators/LoadingIndicator'
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
        let xhr = new XMLHttpRequest()
        xhr.open('POST', 'http://localhost:3000/api/Participants/login', true)
        xhr.setRequestHeader('Content-Type', 'application/json')

        xhr.timeout = 10000

        xhr.onload = () => {
            let userResponse = JSON.parse(xhr.response)
            if (xhr.status == 401) {
                this.props.toggleLoading()
                toastr.error('Неправильный логин или пароль', 'Ошибка входа')
            }
            if (xhr.status == 200) {
                let loopbackToken = JSON.parse(xhr.response).id
                let loopbackTokenExpireIn = (new Date(JSON.parse(xhr.response).ttl * 1000 + Date.now())).toDateString()
                xhr.open('PATCH', `http://localhost:3000/api/Participants/${userResponse.userId}`)
                xhr.setRequestHeader('Content-Type', 'application/json')
                xhr.onload = () => {
                    let userInfo = JSON.parse(xhr.response)
                    this.props.toggleLoading()
                    toastr.success(`Добро пожаловать, ${userInfo.username || 'User'}!`)
                    const cookies = new Cookies()

                    cookies.set('loopbackToken', userInfo.loopbackToken, { maxAge: (Date.parse(loopbackTokenExpireIn) - Date.now()) / 1000 })
                    this.props.history.push(`/cources/${userInfo.id}`)
                }
                xhr.send(JSON.stringify({ loopbackToken, loopbackTokenExpireIn }))
            }
        }

        xhr.ontimeout = () => {
            this.props.toggleLoading()
            toastr.error('Время запроса истекло: сервер не отвечает', 'Ошибка входа')
        }

        xhr.send(JSON.stringify({ email: this.state.mail, password: this.state.password }))
        this.props.toggleLoading()
    }

    render() {
        return <LoginIn
            onSubmitHandler={this.onSubmitHandler}
            onChangeHandler={this.onChangeHandler}
            {...this.state} />
    }
}
//TODO: show in propTypes props by withRoutes?

export default withRouter(LoadingIndicator(LoginInContainer))
