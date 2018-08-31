import React from "react";
import { connect } from "react-redux";
import toastr from "toastr";
import { updateLoggedInUserById } from "../../redux/AC/users";
import { addImageToUser } from '../../modules/workingWithFiles'
import { loadCoursesForUser } from '../../redux/AC/courses'
import Profile from "./Profile";
import PropTypes from "prop-types";
import { addImageToUserByFileField } from "../../mediator/profile";
import mediator from '../../mediator/mediator'
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

    onSubmitHandler = e => {
        e.preventDefault();
        let form = document.querySelector('form[name="userEdit"]');
        //TODO: rewrite on refs
        let file = form.elements.imageFile.files[0];

        mediator.publish('CHANGE_PROFILE_INFO', this.props.userId, this.state.email, this.state.userName, this.state.firstName, this.state.lastName, file)
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
