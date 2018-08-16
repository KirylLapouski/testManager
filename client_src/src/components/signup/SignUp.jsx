import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import toastr from "toastr";
import Flag from "@material-ui/icons/Flag";
import "./sign-up.css";
//CAN ADD REAL TIME VALIDATION
class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            passwordConfirm: "",
            userName: ""
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        let { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }
    nameValidation(name) {
        let reg = /^[a-z]{4,}(?:[._-][a-z\d]+)*$/i;
        if (reg.test(name) == false) {
            toastr.error("Неправильный логин", "Ошибка отправки формы");
            return false;
        }
        return true;
    }

    onSubmitHandler(e) {
        e.preventDefault();
        let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (
            !this.state.email ||
            !this.state.password ||
            !this.state.passwordConfirm
        ) {
            toastr.error(
                "Все обязательные поля должны быть заполнены",
                "Ошибка отправки формы"
            );
            return;
        }
        if (this.state.password !== this.state.passwordConfirm) {
            toastr.error("Пароли не совпадают", "Ошибка отправки формы");
            return;
            //WRONG PASSWORD
        }
        if (reg.test(this.state.email) == false) {
            toastr.error(
                "Неправильный формат для электронной почты",
                "Ошибка отправки формы"
            );
            return;
        }
        if (this.state.userName && !this.nameValidation(this.state.userName))
            return;

        let xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:3000/api/Participants", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(
            JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                username: this.state.userName
            })
        );

        xhr.onload = () => {
            if (xhr.status == 200) {
                toastr.success("Регистрация прошла успешно");
                toastr.success(
                    `Добро пожаловать, ${this.state.userName || "User"}!`
                );

                xhr.open(
                    "POST",
                    "http://localhost:3000/api/Participants/login",
                    true
                );
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.send(
                    JSON.stringify({
                        email: this.state.email,
                        password: this.state.password
                    })
                );

                xhr.onload = () => {
                    if (xhr.status == 200) {
                        localStorage.setItem(
                            "token",
                            JSON.parse(xhr.responseText).id
                        );
                        document.location.href = `/cources/${
                            JSON.parse(xhr.response).userId
                        }`;
                    }
                };
            } else {
                toastr.error(
                    "Ошибка во время регистрации",
                    "Ошибка отправки формы"
                );
                xhr.abort();
            }
        };
    }
    render() {
        return (
            <div className="index-background">
                <div className="w-100 h-100 mask rgba-black-light d-flex justify-content-center align-items-center">
                    <div className="container sign-up-container">
                        <form
                            className="index-form"
                            name="signUp"
                            method="POST"
                            action="/signUp"
                        >
                            <p className="h4 text-center mb-4">Регистрация</p>

                            <label
                                htmlFor="defaultFormRegisterEmailEx"
                                className="grey-text"
                            >
                                Электронная почта<Flag className="flag" />
                            </label>
                            <input
                                onChange={this.onChangeHandler}
                                type="email"
                                id="defaultFormRegisterEmailEx"
                                name="email"
                                placeholder="lapkovskyk@mail.ru"
                                className="form-control"
                            />

                            <br />

                            <label
                                htmlFor="defaultFormRegisterCheckLogin"
                                className="grey-text"
                            >
                                Логин
                            </label>
                            <input
                                onChange={this.onChangeHandler}
                                type="text"
                                id="defaultFormRegisterCheckLogin"
                                name="userName"
                                placeholder="User123"
                                className="form-control"
                            />

                            <br />

                            <label
                                htmlFor="defaultFormRegisterPasswordEx"
                                className="grey-text"
                            >
                                Пароль<Flag className="flag" />
                            </label>
                            <input
                                onChange={this.onChangeHandler}
                                type="password"
                                id="defaultFormRegisterPasswordEx"
                                name="password"
                                className="form-control"
                            />

                            <br />

                            <label
                                htmlFor="defaultFormRegisterCheckPassword"
                                className="grey-text"
                            >
                                Подвердите пароль<Flag className="flag" />
                            </label>
                            <input
                                onChange={this.onChangeHandler}
                                type="password"
                                id="defaultFormRegisterCheckPassword"
                                name="passwordConfirm"
                                className="form-control"
                            />

                            <div className="submit-form-container text-center mt-4">
                                <Link className=" btn-primary btn" to="/">
                                    Отмена
                                </Link>
                                <button
                                    className="btn-primary btn"
                                    onClick={this.onSubmitHandler}
                                    type="submit"
                                >
                                    Зарегистрироваться
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

SignUp.contextTypes = {
    router: PropTypes.object
};
export default SignUp;
