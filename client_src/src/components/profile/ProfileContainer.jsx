import React from "react";
import { connect } from "react-redux";
import toastr from "toastr";
import { updateLoggedInUserById } from "../../redux/AC/users";
import { addImageToUser } from '../../modules/workingWithFiles'
import { loadCoursesForUser } from '../../redux/AC/courses'
import Profile from "./Profile";
import PropTypes from "prop-types";
import { addImageToUserByFileField,changeProfileInfo } from "../../mediator/profile";
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
    // TODO:
    upload = filefield => {
        let { userId } = this.props;
        addImageToUserByFileField(userId, filefield)
        toastr.info(
            "Можете продолжать работу, изменения будут приняты в ближайшее время",
            "Форма отправлена"
        );
    };

    onSubmitHandler = e => {
        e.preventDefault();
        let error;
        let form = document.querySelector('form[name="userEdit"]');
        //TODO: rewrite on refs
        let file = form.elements.imageFile.files[0];
        if (file) {
            if (error = this.upload(form.elements.imageFile)) {
                toastr.error(error, "Ошибка отправки формы");
                return
            }
        }
        changeProfileInfo(this.props.userId,this.state.email,this.state.userName,this.state.firstName,this.state.lastName,file)

        // let xhr = new XMLHttpRequest();
        // xhr.open(
        //     "PATCH",
        //     `http://localhost:3000/api/Participants/${this.props.userId}`,
        //     true
        // );
        // xhr.setRequestHeader("Content-Type", "application/json");

        // let user = {};
        // if (this.state.email) {
        //     user.email = this.state.email;
        //     if (!validateEmail(this.state.email)) {
        //         toastr.error("Неправильный формат электронной почты", "Ошибка отправки формы");
        //         return;
        //     }
        // }
        // if (this.state.userName) {
        //     user.username = this.state.userName;
        //     if (!validateLogin(this.state.userName)) {
        //         toastr.error("Неправильный логин", "Ошибка отправки формы");
        //         return;
        //     }
        // }
        // if (this.state.firstName) {
        //     user.firstName = this.state.firstName;
        //     if (!validateName(this.state.firstName)) {
        //         toastr.error(`Имя введено неправильно`, "Ошибка отправки формы");
        //         return;
        //     }
        // }
        // if (this.state.lastName) {
        //     user.lastName = this.state.lastName;
        //     if (!validateName(this.state.lastName)) {
        //         toastr.error('Фамилия введена направильно', 'Ошибка отправки формы')
        //         return
        //     }
        // }
        // xhr.onload = () => {
        //     if (xhr.status == 200) {
        //         toastr.success("Пользователь успешно изменён");
        //         this.props.updateLoggedUser(this.props.userId);
        //     } else {
        //         toastr.error("Пользователь не был изменён", "Ошибка сервера");
        //     }
        // };

        // xhr.timeout = 3000;

        // xhr.ontimeout = () => {
        //     toastr.error(
        //         "Допустимое время выполнения запроса истекло",
        //         "Ошибка сервера"
        //     );
        // };
        // if (Object.keys(user).length === 0) {
        //     if (!file)
        //         toastr.error(
        //             "Хотя бы одно поле должно быть заполнено",
        //             "Ошибка отправки формы"
        //         );
        //     return;
        // }
        // xhr.send(JSON.stringify(user));
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
