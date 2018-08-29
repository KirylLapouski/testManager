import React from 'react'
import { Link } from 'react-router-dom'
import 'font-awesome/css/font-awesome.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import PropTypes from 'prop-types'
import Hidden from '@material-ui/core/Hidden'
import './login-in.css'
import CircularProgress from '@material-ui/core/CircularProgress'

//TODO: rewrite on function
class LoginIn extends React.Component {
    render() {
        let { onChangeHandler, onSubmitHandler, mail, password, loading } = this.props
        return (<React.Fragment>
            <div style={loading ? { opacity: '0.25' } : {}} className="index-background">
                <div className="w-100 h-100 mask rgba-black-light d-flex justify-content-center align-items-center">
                    <div className="login-in-container">
                        <Hidden only={['sm', 'xs']}>
                            <div className="application-description mb-4 white-text text-center text-md-left">
                                <h1 className="display-4 font-weight-bold">
                                    Тестовая платформа
                                </h1>
                                <hr className="hr-light" />
                                <p>
                                    Хотите узнать что-то новое, или повысить
                                    квалификацию? Вы нашли то, что искали!
                                </p>
                                <p className="mb-4 d-none d-md-block">
                                    Представьте, что вы записались в идеальный
                                    университет, бесплатный, при этом
                                    предоставляющий тонны учебного материала в
                                    различных научных сферах
                                </p>
                                <Link
                                    to="/signUp"
                                    className="btn btn-indigo btn-lg"
                                >
                                    Зарегистрироваться
                                    <i className="fa fa-graduation-cap ml-2" />
                                </Link>
                            </div>
                        </Hidden>
                        <div className="login-in-form-container">
                            <form method="POST" name="loginIn" className="index-form" onSubmit={onSubmitHandler}>
                                <h1>Вход</h1>
                                <label htmlFor="inputEmail" className="sr-only">
                                    Электронная почта
                                </label>
                                <input onChange={onChangeHandler} type="text" value={mail} name="mail" id="inputEmail" className="form-control" placeholder="Электронная почта" required autoFocus />
                                <label htmlFor="inputPassword" className="sr-only">
                                    Пароль
                                </label>
                                <input onChange={onChangeHandler} type="password" value={password} name="password" id="inputPassword" className="form-control" placeholder="Пароль" style={{ marginTop: '10px' }} required />
                                <br />
                                <button className="btn btn-lg btn-primary btn-block" type="submit">
                                    Вход
                                </button>
                                <br />
                                <a role="button" href="http://localhost:3000/auth/yandex" className="btn red btn-block  waves-effect waves-light">
                                    <i className="fa fa-yahoo" aria-hidden="true" />{' '}
                                    yandex
                                </a>
                                <div className="modal-footer pr-0">
                                    <div className="options font-weight-light">
                                        <p>
                                            {/* TODO: change color style */}
                                            Не зарегистрированы?
                                            <Link style={{ color: 'blue' }} to="/signUp">
                                                Регистрация
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
            {loading && <div style={{ position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center', top: '0', left: '0', right: '0', bottom: '0', zIndex: '1' }}>
                <CircularProgress style={{ color: '#9C27B0' }} />
            </div>}
        </React.Fragment>

        )
    }
}

LoginIn.propTypes = {
    mail: PropTypes.string,
    password: PropTypes.string,
    loading: PropTypes.bool,
    onSubmitHandler: PropTypes.func,
    onChangeHandler: PropTypes.func,
}

export default LoginIn
