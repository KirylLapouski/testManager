import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import toastr from 'toastr'
import Flag from '@material-ui/icons/Flag'
//CAN ADD REAL TIME VALIDATION
class SignUp extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            passwordConfirm: '',
            userName: ''
        }

        this.onChangeHandler = this.onChangeHandler.bind(this)
        this.onSubmitHandler = this.onSubmitHandler.bind(this)
    }

    onChangeHandler(e) {
        var { name, value } = e.target
        this.setState({
            [name]: value
        })
    }
    nameValidation(name) {
        var reg = /^[a-z]{4,}(?:[._-][a-z\d]+)*$/i
        if (reg.test(name) == false) {
            toastr.error('Неправильный логин', 'Ошибка отправки формы')
            return false
        }
        return true
    }

    onSubmitHandler(e) {
        e.preventDefault()
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
        if (!this.state.email || !this.state.password || !this.state.passwordConfirm) {
            toastr.error('Все обязательные поля должны быть заполнены', 'Ошибка отправки формы')
            return
        }
        if (this.state.password !== this.state.passwordConfirm) {
            toastr.error('Пароли не совпадают', 'Ошибка отправки формы')
            return
            //WRONG PASSWORD
        }
        if (reg.test(this.state.email) == false) {
            toastr.error('Неправильный формат для электронной почты', 'Ошибка отправки формы')
            return
        }
        if (this.state.userName &&  !this.nameValidation(this.state.userName))
            return


        var xhr = new XMLHttpRequest()
        xhr.open('POST', 'http://localhost:3000/api/Participants', true)
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.send(JSON.stringify({ email: this.state.email, password: this.state.password, username:this.state.userName }))

        xhr.onload = () => {
            if (xhr.status == 200) {
                toastr.success('Регистрация прошла успешно')
                toastr.success(`Добро пожаловать, ${this.state.userName || 'User'}!`)

                xhr.open('POST', 'http://localhost:3000/api/Participants/login', true)
                xhr.setRequestHeader('Content-Type', 'application/json')
                xhr.send(JSON.stringify({ email: this.state.email, password: this.state.password }))

                xhr.onload = () => {
                    if (xhr.status == 200) {
                        localStorage.setItem('token', JSON.parse(xhr.responseText).id)
                        document.location.href = `/cources/${JSON.parse(xhr.response).userId}`
                    }
                }
            } else {
                toastr.error('Ошибка во время регистрации', 'Ошибка отправки формы')
                xhr.abort()
            }
        }


    }
    render() {
        return (
            <div style={{ backgroundImage: 'url(\'https://mdbootstrap.com/img/Photos/Others/images/78.jpg\')', height: '100vh', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>

                <div className="w-100 h-100 mask rgba-black-light d-flex justify-content-center align-items-center">

                    <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>

                        <div className="row wow fadeIn" style={{ visibility: 'visible', animationName: 'fadeIn' }}>
                            <form name="signUp" method="POST" action='/signUp' style={{ width: '370px', padding: '30px 30px', borderRadius: '5px', backgroundColor: '#fff', color: '#4f4f4f', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                <p className="h4 text-center mb-4" style={{ alignSelf: 'center' }}>Регистрация</p>


                                <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">Электронная почта<Flag style={{ color: '#ff7961', width: '14px', height: '14px' }} /></label>
                                <input onChange={this.onChangeHandler} type="email" id="defaultFormRegisterEmailEx" name="email" placeholder="lapkovskyk@mail.ru" className="form-control" />

                                <br />

                                <label htmlFor="defaultFormRegisterCheckLogin" className="grey-text">Логин</label>
                                <input onChange={this.onChangeHandler} type="text" id="defaultFormRegisterCheckLogin" name="userName" placeholder="" className="form-control" />

                                <br />

                                <label htmlFor="defaultFormRegisterPasswordEx" className="grey-text">Пароль<Flag style={{ color: '#ff7961', width: '14px', height: '14px' }} /></label>
                                <input onChange={this.onChangeHandler} type="password" id="defaultFormRegisterPasswordEx" name="password" className="form-control" />

                                <br />

                                <label htmlFor="defaultFormRegisterCheckPassword" className="grey-text">Подвердите пароль<Flag style={{ color: '#ff7961', width: '14px', height: '14px' }} /></label>
                                <input onChange={this.onChangeHandler} type="password" id="defaultFormRegisterCheckPassword" name="passwordConfirm" className="form-control" />


                                <div className="text-center mt-4" style={{ alignSelf: 'center' }}>
                                    <button className="btn-primary btn" onClick={this.onSubmitHandler} type="submit" >Зарегистрироваться</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>)
    }
}


SignUp.contextTypes = {
    router: PropTypes.object,
}
export default SignUp   