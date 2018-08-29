import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import toastr from 'toastr'
import Flag from '@material-ui/icons/Flag'
import { validateName, validateEmail } from '../../modules/validation'
import './sign-up.css'
import { signUpAndLogin } from '../../modules/authentication'
//CAN ADD REAL TIME VALIDATION
class SignUp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            passwordConfirm: '',
            login: ''
        }
    }

    onChangeHandler = (e) => {
        let { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    onSubmitHandler = (e) => {
        e.preventDefault()
        if (
            !this.state.email ||
            !this.state.password ||
            !this.state.passwordConfirm
        ) {
            toastr.error(
                'Все обязательные поля должны быть заполнены',
                'Ошибка отправки формы'
            )
            return
        }
        if (this.state.password !== this.state.passwordConfirm) {
            toastr.error('Пароли не совпадают', 'Ошибка отправки формы')
            return
            //WRONG PASSWORD
        }
        if (!validateEmail(this.state.email)) {
            toastr.error(
                'Неправильный формат электронной почты',
                'Ошибка отправки формы'
            )
            return
        }
        if (this.state.login && !validateName(this.state.login)) {
            toastr.error('Неправильный логин', 'Ошибка отправки формы')
            return
        }

        signUpAndLogin(this.state.email, this.state.password, this.state.login)
            .then((loggedInUserInfo) => {
                toastr.success('Регистрация прошла успешно')
                toastr.success(
                    `Добро пожаловать, ${loggedInUserInfo.login || 'User'}!`
                )

                setTimeout(() => {
                    document.location.href = `/cources/${
                        loggedInUserInfo.id
                        }`
                }, 1000)

            }, err => {
                switch (err.message) {
                    case 'Ошибка добавления нового пользователя':
                        toastr.err('Ошибка добавления нового пользователя')
                        break
                    case 'Ошибка входа':
                        toastr.err('Ошибка входа')
                        break
                }
            })
    }
    render() {
        return (
            <div className="index-background">
                <div className="w-100 h-100 mask rgba-black-light d-flex justify-content-center align-items-center">
                    <div className="container sign-up-container">
                        <form className="index-form" name="signUp" method="POST" action="/signUp">
                            <p className="h4 text-center mb-4">Регистрация</p>

                            <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
                                Электронная почта<Flag className="flag" />
                            </label>
                            <input onChange={this.onChangeHandler} type="email" id="defaultFormRegisterEmailEx" name="email" placeholder="lapkovskyk@mail.ru" className="form-control" />

                            <br />

                            <label htmlFor="defaultFormRegisterCheckLogin" className="grey-text">
                                Логин
                            </label>
                            <input onChange={this.onChangeHandler} type="text" id="defaultFormRegisterCheckLogin" name="login" placeholder="User123" className="form-control" />

                            <br />

                            <label htmlFor="defaultFormRegisterPasswordEx" className="grey-text"                            >
                                Пароль<Flag className="flag" />
                            </label>
                            <input onChange={this.onChangeHandler} type="password" id="defaultFormRegisterPasswordEx" name="password" className="form-control" />

                            <br />

                            <label htmlFor="defaultFormRegisterCheckPassword" className="grey-text">
                                Подвердите пароль<Flag className="flag" />
                            </label>
                            <input onChange={this.onChangeHandler} type="password" id="defaultFormRegisterCheckPassword" name="passwordConfirm" className="form-control" />

                            <div className="submit-form-container text-center mt-4">
                                <Link className=" btn-primary btn" to="/">
                                    Отмена
                                </Link>
                                <button className="btn-primary btn" onClick={this.onSubmitHandler} type="submit">
                                    Зарегистрироваться
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

SignUp.contextTypes = {
    router: PropTypes.object
}

export default SignUp
