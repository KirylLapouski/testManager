import React from "react";
import { connect } from "react-redux";
import toastr from "toastr";
import { addImageToUser, updateLoggedInUserById } from "../../redux/AC/users";
import { loadCoursesForUser } from '../../redux/AC/courses'
import Profile from "./Profile";
import PropTypes from "prop-types";
import Cookies from 'universal-cookie'
const cookies = new Cookies()
class ProfileContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: "",
            email: "",
            firstName: "",
            lastName: "",
            tabsValue: 0
        };
    }

    onChangeHandler = e => {
        let { name, value } = e.target;
        this.setState(prevState => ({
            [name]: value
        }));
    };

    upload = filefield => {
        if (!filefield.files[0]) throw new Error("Выберите изображение");
        if (!filefield.files[0].type.match("image.*"))
            throw new Error("Фотография пользователя должна быть изображением");
        if (filefield.files[0].name.length > 15)
            throw new Error(
                "Название изображения должно быть не больше 15 символов включая расширение файла"
            );

        let { userId, addUserImage } = this.props;
        let sendingForm = new FormData();
        sendingForm.append("file", filefield.files[0]);
        try {
            addUserImage(userId, sendingForm, !!cookies.get('yandexToken')).then(value => {
                toastr.success('Изображение установлено')
            })
        } catch (e) {
            // toastr.error(e.message);
            console.error(e.message)
        }
        toastr.info(
            "Можете продолжать работу, изменения будут приняты в ближайшее время",
            "Форма отправлена"
        );
    };

    // emailValidation(email) {
    //     let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    //     if (reg.test(email) == false) {
    //         toastr.error(
    //             "Неправильный формат электронной почты",
    //             "Ошибка отправки формы"
    //         );
    //         return false;
    //     }
    //     return true;
    // }
    // loginValidation(name) {
    //     let reg = /^[a-z]{4,}(?:[._-][a-z\d]+)*$/i;
    //     if (reg.test(name) == false) {
    //         toastr.error("Неправильный логин", "Ошибка отправки формы");
    //         return false;
    //     }
    //     return true;
    // }

    // nameValidation(name, field) {
    //     let reg = /^[а-яА-ЯёЁa-zA-Z]+$/;
    //     if (reg.test(name) == false) {
    //         toastr.error(
    //             `Такой формат ${field} не поддерживается`,
    //             "Ошибка отправки формы"
    //         );
    //         return false;
    //     }
    //     return true;
    // }
    checkIsImage = e => {
        this.setState({
            fileName: e.target.value
        });
        //TODO: cancel choosen file
        if (!e.target.files[0].type.match("image.*")) {
            toastr.warning("Фотография пользователя должна быть изображением");
            this.setState({
                fileName: ""
            });
        }
    };
    onSubmitHandler = e => {
        e.preventDefault();

        let form = document.querySelector('form[name="userEdit"]');
        //TODO: rewrite on refs
        let file = form.elements.imageFile.files[0];
        if (file) {
            try {
                this.upload(form.elements.imageFile);
            } catch (e) {
                toastr.error(e.message, "Ошибка отправки формы");
                return;
            }
        }

        let xhr = new XMLHttpRequest();
        xhr.open(
            "PATCH",
            `http://localhost:3000/api/Participants/${this.props.userId}`,
            true
        );
        xhr.setRequestHeader("Content-Type", "application/json");

        let user = {};
        if (this.state.email) {
            user.email = this.state.email;
            if (!this.emailValidation(this.state.email)) return;
        }
        if (this.state.userName) {
            user.username = this.state.userName;
            if (!this.loginValidation(this.state.userName)) return;
        }
        if (this.state.firstName) {
            user.firstName = this.state.firstName;
            if (!this.nameValidation(this.state.firstName, "имени")) return;
        }
        if (this.state.lastName) {
            user.lastName = this.state.lastName;
            if (!this.nameValidation(this.state.lastName, "фамилии")) return;
        }
        xhr.onload = () => {
            if (xhr.status == 200) {
                toastr.success("Пользователь успешно изменён");
                this.props.updateLoggedUser(this.props.userId);
            } else {
                toastr.error("Пользователь не был изменён", "Ошибка сервера");
            }
        };

        xhr.timeout = 3000;

        xhr.ontimeout = () => {
            toastr.error(
                "Допустимое время выполнения запроса истекло",
                "Ошибка сервера"
            );
        };
        if (Object.keys(user).length === 0) {
            if (!file)
                toastr.error(
                    "Хотя бы одно поле должно быть заполнено",
                    "Ошибка отправки формы"
                );
            return;
        }
        xhr.send(JSON.stringify(user));
    };
    //TODO: rewrite on decorators
    handleTabChange = (event, value) => {
        this.setState({
            tabsValue: value
        });
    };

    handleChangeIndex = index => {
        this.setState({ tabsValue: index });
    };
    componentDidMount() {
        this.props.loadCoursesForUser(this.props.userId)
            .then(courses => {
                this.courses = courses
            })
    }

    render() {
        return (
            <Profile
                handleChangeIndex={this.handleChangeIndex}
                onChangeHandler={this.onChangeHandler}
                handleTabChange={this.handleTabChange}
                onSubmitHandler={this.onSubmitHandler}
                courses={this.courses}
                {...this.props}
                {...this.state}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        userId: state.users.loggedIn && state.users.loggedIn.id,
        hasYandexToken:
            state.users.loggedIn && !!state.users.loggedIn.yandexToken,
        userImageSrc: state.users.loggedIn
            ? state.users.loggedIn.imageUrl
            : "https://globalblueproject.org/wp-content/uploads/2016/07/blank-profile-picture.png",
        savedEmail: state.users.loggedIn.email,
        savedUsername: state.users.loggedIn.userName,
        savedFirstName: state.users.loggedIn.firstName,
        savedSecondName: state.users.loggedIn.secondName
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addUserImage(userId, image) {
            return dispatch(addImageToUser(userId, image));
        },
        updateLoggedUser(userId) {
            dispatch(updateLoggedInUserById(userId));
        },
        loadCoursesForUser(userId) {
            return dispatch(loadCoursesForUser(userId))
        }
    };
};

Profile.propTypes = {
    userId: PropTypes.number,
    userImageSrc: PropTypes.string,
    hasYandexToken: PropTypes.bool,
    addUserImage: PropTypes.func,
    updateLoggedUser: PropTypes.func,
    loadCoursesForUser: PropTypes.func
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileContainer);
